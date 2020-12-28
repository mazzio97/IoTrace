import * as jDBSCAN from 'jdbscan'
import { trytesToAscii } from '@iota/converter'
import { SecurityToolBox } from '../iota/security'
import { Security, Message, MamSettings } from '../simulation/constants'
import { MamGate } from '../iota/mam_gate'

let agentsChannels = []

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
		// return {
		// 	x: parseFloat(this.securityToolbox.decryptMessage(json.x, json.publicKey)),
		// 	y: parseFloat(this.securityToolbox.decryptMessage(json.y, json.publicKey)),
		// 	timestamp: Date.parse(this.securityToolbox.decryptMessage(json.date, json.publicKey)) / 1000
		// }
		// .then(positions => {
		// 	console.log(positions)
		// 	const scan = this.dbscanner.data(positions)
		// 	var pointAssignmentResult = scan()
		// 	console.log(pointAssignmentResult)
		// })
	}
}

const geosolver = new GeoSolver(100, 20)

onmessage = async event => {
	if (event.data.message == "initAgentsChannels") {
		agentsChannels = event.data.seeds.map(s => new MamGate(MamSettings.provider, MamSettings.mode, s))
		console.log(agentsChannels)
	}
	if (event.data.message == Message.calculatePossibleInfections) {
		const data = await Promise.all(agentsChannels.map(async mam => {
			await mam.read()
			return mam.localStorage
		}))
		geosolver.computePossibleInfections(data.flat())
		
		postMessage({message: Message.triggerAgents})
	}
}
