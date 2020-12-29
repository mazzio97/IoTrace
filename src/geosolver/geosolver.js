import * as jDBSCAN from 'jdbscan'
import { trytesToAscii } from '@iota/converter'
import { SecurityToolBox } from '../iota/security'
import { Security, Message, MamSettings } from '../simulation/constants'
import { MamReader } from '../iota/mam_gate'
import { Time } from '../simulation/constants.js'

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
	if (data.message == "initAgentsChannels") {
		geosolver.agentsChannels = data.agentsSeeds.map(s => new MamReader(MamSettings.provider, s))
		geosolver.diagnosticiansChannels = data.diagnosticiansSeeds.map(s => new MamReader(MamSettings.provider, s))
	}
	if (data.message == Message.calculatePossibleInfections) {
		await updateAgentData()
		const infectedCache = await getInfectedData()
		if (infectedCache.length > 0) {
			geosolver.computePossibleInfections(geosolver.agentsCache.concat(infectedCache))
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
					transaction.id = "infected"
					transaction.date = Date.parse(transaction.date) / 1000
					return transaction
				})
			)
		)
		return payloads
	}))
	return newData.flat()
}