import * as jDBSCAN from 'jdbscan'
import { trytesToAscii } from '@iota/converter'
import { SecurityToolBox } from '../iota/security'
import { Security, Message, MamSettings } from '../simulation/constants'
import { MamReader } from '../iota/mam_gate'
import { Time } from '../simulation/constants.js'

let agentsChannels = []
let agentsCache = new Array()
let infectedCache = new Array()

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
		agentsChannels = data.seeds.map(s => new MamReader(MamSettings.provider, s))
	}
	if (data.message == Message.calculatePossibleInfections) {
		const newData = await Promise.all(agentsChannels.map(async mam => {
			let payloads = await mam.read()
			payloads = payloads.flatMap(p => {
				const decrypted = JSON.parse(geosolver.securityToolbox.decryptMessage(p.history, p.agentPublicKey))
				return decrypted.history.map(transaction => {
					transaction.id = decrypted.id
					transaction.date = Date.parse(transaction.date) / 1000
					return transaction
				})
			})
			return payloads
		}))
		agentsCache = agentsCache.concat(newData.flat())
		// cache = cache.filter()
		// TODO: filter out old data from cache

		console.log(Time.currentDate)

		if (infectedCache.length > 0) {
			geosolver.computePossibleInfections(agentsCache.concat(infectedCache))
		}

		postMessage({message: Message.triggerAgents})
	}
}
