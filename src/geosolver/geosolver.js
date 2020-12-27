import * as jDBSCAN from 'jdbscan'
import { trytesToAscii } from '@iota/converter'
import { SecurityToolBox } from '../iota/security'
import { Security, Message, MamSettings } from '../simulation/constants'
import * as Mam from '@iota/mam'

let agentsChannels = []

export class GeoSolver {
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
}

onmessage = async event => {
	if (event.data.message == "initAgentsChannels") {
		agentsChannels = event.data.channels
	}
	if (event.data.message == Message.calculatePossibleInfections) {
		agentsChannels.forEach(async mam => {
			const result = await mam.read()
			// TODO: Fix result being undefined
            result.messages.forEach(message => {
                console.log(JSON.parse(trytesToAscii(message)))
            })
		})
		postMessage({message: Message.triggerAgents})
	}
}

export default {}
