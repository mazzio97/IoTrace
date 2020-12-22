import * as jDBSCAN from 'jdbscan'

import * as Iota from '@iota/core'
// import Mam from '@iota/mam'
import { trytesToAscii } from '@iota/converter'
import { SecurityToolBox } from '../iota/security'
import { Security } from '../simulation/constants'

const provider = 'https://nodes.devnet.iota.org'
const mode = 'public'
const iota = Iota.composeAPI({ provider: provider })
// Mam.init(provider)

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

	updateInfected() {
		iota.findTransactionObjects({ tags: ['GEOPOSIOTRACE'] })
			.then(async txs => Promise.all([...new Set(txs.map(tx => tx.address))]
				.map(async root => {
					const result = await Mam.fetchSingle(root, mode)
					const json = JSON.parse(trytesToAscii(result.payload))
					return {
						x: parseFloat(this.securityToolbox.decryptMessage(json.x, json.publicKey)),
						y: parseFloat(this.securityToolbox.decryptMessage(json.y, json.publicKey)),
						timestamp: Date.parse(this.securityToolbox.decryptMessage(json.date, json.publicKey)) / 1000
					}
				}))
			)
			.then(positions => {
				console.log(positions)
				const scan = this.dbscanner.data(positions)
				var pointAssignmentResult = scan()
				console.log(pointAssignmentResult)
			})
	}
}

// new GeoSolver(100, 20).updateInfected()
export default {}
