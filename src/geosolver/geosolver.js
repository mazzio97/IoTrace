import * as jDBSCAN from 'jdbscan'
import { SecurityToolBox } from '../iota/security'
import { Security, Message, MamSettings, Time } from '../simulation/constants'
import { MamReader, MamWriter } from '../iota/mam_gate'

const infectedId = "infected"
const geosolverPrivateKey = '7KxRgYSISJ7sRUx3pc5hZZ7ptEQ+YPddp6rhC8Y1uUS6FrI7gmApDxI9mqDXFF5jdRJdObU6sXcXxXM5+G3VMQ=='
export default class GeoSolver {
	constructor(distance, timeInterval, people=1) {
		this.dbscanner = jDBSCAN().eps(distance).minPts(people).distance((point1, point2) => {
            if (Math.abs(point2.date - point1.date) <= timeInterval && point1.id !== point2.id) {
                return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
            } else {
                return Number.POSITIVE_INFINITY
			}
		})
		this.securityToolbox = new SecurityToolBox(geosolverPrivateKey)
		this.mam = new MamWriter(MamSettings.provider, Security.geosolverSeed)
		this.agentsChannels = undefined
		this.diagnosticiansChannels = undefined
		this.agentsCache = new Array()
	}

	computePossibleInfections(data) {
		console.log(data)
		const scan = this.dbscanner.data(data)
		var pointAssignment = scan()
		const clusteredData = data.map((d, i) => {
			d.cluster = pointAssignment[i]
			return d
		})
		const dataByCluster = clusteredData.reduce((acc, value) => {
			if (!acc[value.cluster]) {
				acc[value.cluster] = new Set()
			}
			acc[value.cluster].add(value.id)
			return acc
		}, [])
		
		// Remove outliers
		dataByCluster.shift()

		return [...new Set(dataByCluster.filter(set => set.has(infectedId))
			.flatMap(set => {
				set.delete(infectedId)
				return [...set]
			}))]
	}
}

const geosolver = new GeoSolver(50, 5000)

onmessage = async event => {
	const data = event.data
	console.log('From Main to Geosolver:', data)
	if (data.message == Message.initAgentsChannels) {
		geosolver.agentsChannels = data.agentsSeeds.map(s => new MamReader(MamSettings.provider, s))
		geosolver.diagnosticiansChannels = data.diagnosticiansSeeds.map(s => new MamReader(MamSettings.provider, s))
	} else if (data.message == Message.calculatePossibleInfections) {
		const currentDate = Date.parse(data.currentDate) / 1000
		await updateAgentData(currentDate)
		const infectedCache = await getInfectedData(currentDate)
		if (infectedCache.length > 0) {
			const possibleInfections = geosolver.computePossibleInfections(geosolver.agentsCache.concat(infectedCache))
			
			await geosolver.mam.publish({
				possible: possibleInfections
			}, true)
			
			postMessage({message: Message.triggerAgents})
		}
	} else {
		throw new Error('Illegal message from Main to Geosolver')
	}
}

async function updateAgentData(currentDate) {
	// retrieve new data from agents' channels
	const newData = await Promise.all(geosolver.agentsChannels.map(async mam => {
		let payloads = await mam.read()
		payloads = payloads.flatMap(p =>
			JSON.parse(geosolver.securityToolbox.decryptMessage(p.history, p.agentPublicKey)).map(transaction => {
				transaction.id = p.id
				transaction.date = Date.parse(transaction.date) / 1000
				return transaction
			})
		)
		return payloads
	}))
	// concat the new data in the cache then discard data prior to 14 days ago
	geosolver.agentsCache = geosolver.agentsCache.concat(newData.flat()).filter(transaction => 
		currentDate - transaction.date <= Time.discardTime
	)
}

async function getInfectedData(currentDate) {
	// retrieve new data from diagnosticians' channels
	const newData = await Promise.all(geosolver.diagnosticiansChannels.map(async mam => {
		let payloads = await mam.read()
		payloads = payloads.flatMap(p =>
			p.bundle.flatMap(history => 
				JSON.parse(geosolver.securityToolbox.decryptMessage(history, p.agentPublicKey)).map(transaction => {
					transaction.id = infectedId
					transaction.date = Date.parse(transaction.date) / 1000
					return transaction
				})
			)
		)
		return payloads
	}))
	// discard data prior to 14 days ago
	return newData.flat().filter(transaction => currentDate - transaction.date <= Time.discardTime)
}