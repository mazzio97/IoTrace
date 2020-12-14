const jDBSCAN = require('jdbscan')

const Iota = require('@iota/core')
const Mam = require('@iota/mam')
const { trytesToAscii } = require('@iota/converter')

const provider = 'https://nodes.devnet.iota.org'
const mode = 'public'
const iota = Iota.composeAPI({ provider: provider })
Mam.init(provider)

class GeoSolver {
	constructor(distance, timeInterval, people=1) {
		this.dbscanner = jDBSCAN().eps(distance).minPts(people).distance((point1, point2) => {
            if (Math.abs(point2.timestamp - point1.timestamp) <= timeInterval) {
                return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
            } else {
                return Number.POSITIVE_INFINITY
			}
        })
	}

	updateInfected() {
		iota.findTransactionObjects({ tags: ['GEOPOSIOTRACE'] })
			.then(async txs => Promise.all([...new Set(txs.map(tx => tx.address))]
				.map(async root => {
					const result = await Mam.fetchSingle(root, mode)
					const json = JSON.parse(trytesToAscii(result.payload))
					return {
						x: parseFloat(json.x),
						y: parseFloat(json.y),
						timestamp: Date.parse(json.date) / 1000
					}
				}))
			)
			.then(positions => {
				console.log(positions)
				const scan = this.dbscanner.data(positions)
				var point_assignment_result = scan()
				console.log(point_assignment_result)
			})
	}
}

new GeoSolver(100, 20).updateInfected()
