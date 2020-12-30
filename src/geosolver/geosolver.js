import * as jDBSCAN from 'jdbscan'
import { SecurityToolBox } from '../iota/security'
import { Security, Message, MamSettings, Time } from '../simulation/constants'
import { MamReader } from '../iota/mam_gate'

export default class GeoSolver {
	constructor(distance, timeInterval, people=1) {
		this.dbscanner = jDBSCAN().eps(distance).minPts(people).distance((point1, point2) => {
            if (Math.abs(point2.timestamp - point1.timestamp) <= timeInterval) {
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
		console.log("I'm going to calculate infections using the following data:")
		console.log(data)
		const scan = this.dbscanner.data(data)
		var pointAssignmentResult = scan()
		console.log(pointAssignmentResult)
	}
}

const geosolver = new GeoSolver(100, 20)

onmessage = async event => {
	const data = event.data
	console.log('From Main to Geosolver:', data)
	if (data.message == Message.initAgentChannels) {
		geosolver.agentsChannels = data.agentsSeeds.map(s => new MamReader(MamSettings.provider, s))
		geosolver.diagnosticiansChannels = data.diagnosticiansSeeds.map(s => new MamReader(MamSettings.provider, s))
	} else if (data.message == Message.calculatePossibleInfections) {
		const currentDate = Date.parse(data.currentDate) / 1000
		await updateAgentData(currentDate)
		const infectedCache = await getInfectedData(currentDate)
		if (infectedCache.length > 0) {
			geosolver.computePossibleInfections(geosolver.agentsCache.concat(infectedCache))
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
					transaction.id = "infected"
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