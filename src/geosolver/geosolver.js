import * as jDBSCAN from 'jdbscan'
import { SecurityToolBox } from '../iota/security'
import { Security, Message, MamSettings } from '../simulation/constants'
import { MamReader } from '../iota/mam_gate'

const infectedId = "infected"

export default class GeoSolver {
	constructor(distance, timeInterval, people=1) {
		this.dbscanner = jDBSCAN().eps(distance).minPts(people).distance((point1, point2) => {
            if (Math.abs(point2.date - point1.date) <= timeInterval && point1.id !== point2.id) {
                return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
            } else {
                return Number.POSITIVE_INFINITY
			}
		})
		this.securityToolbox = new SecurityToolBox(Security.geosolverPrivatekey)
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

		return new Set(dataByCluster.filter(set => set.has(infectedId))
			.flatMap(set => {
				set.delete(infectedId)
				return [...set]
			}))
	}
}

const geosolver = new GeoSolver(50, 5000)

onmessage = async event => {
	const data = event.data
	console.log('From Main to Geosolver:', data)
	if (data.message == Message.initAgentsChannels) {
		geosolver.agentsChannels = data.agentsSeeds.map(s => new MamReader(MamSettings.provider, s))
		geosolver.diagnosticiansChannels = data.diagnosticiansSeeds.map(s => new MamReader(MamSettings.provider, s))
	}
	if (data.message == Message.calculatePossibleInfections) {
		await updateAgentData()
		const infectedCache = await getInfectedData()
		if (infectedCache.length > 0) {
			const possibleInfections = geosolver.computePossibleInfections(geosolver.agentsCache.concat(infectedCache))
			console.log(possibleInfections)
		}

		postMessage({message: Message.triggerAgents})
	}
}

async function updateAgentData() {
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
	geosolver.agentsCache = geosolver.agentsCache.concat(newData.flat())
}

async function getInfectedData() {
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
	return newData.flat()
}