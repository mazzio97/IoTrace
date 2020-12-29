import { asciiToTrytes, trytesToAscii } from '@iota/converter'
import * as Mam from '@iota/mam'

class MamWriter {
	constructor(provider, seed) {
		this.mamState = Mam.init(provider, seed)
    	this.startRoot = this.getNextRoot()
	}

	getNextRoot() {
		return Mam.getRoot(this.mamState)
	}

	getSeed() {
		return this.mamState.seed
	}

	getReader(provider) {
		return new MamReader(provider, this.getSeed())
	}

	async publish(packet, verbose=false) {
		// Create MAM message as a string of trytes
		const trytes = asciiToTrytes(JSON.stringify(packet))
		const message = Mam.create(this.mamState, trytes)
		
		// Save your new mamState
		this.mamState = message.state
		
		// Attach the message to the Tangle
		await Mam.attach(message.payload, message.address, 3, 9)
		
		// Prints mam root and published packet
		if (verbose) {
			console.log('Published @ ' + message.root + ':', packet)
		}
		
		return message.root
	}
}

class MamReader {
	constructor(provider, seed) {
		this.startRoot = Mam.getRoot(Mam.init(provider, seed))
		this.currentRoot = this.startRoot
	}

	async read(limit=undefined, verbose=false) {
		// Output synchronously once fetch is completed
		const result = await Mam.fetch(this.currentRoot, 'public', undefined, undefined, limit)
		this.currentRoot = result.nextRoot
		return result.messages.map(message => {
			const json = JSON.parse(trytesToAscii(message))
			if (verbose) {
				console.log('Fetched and parsed', json, '\n')
			}
			return json
		})
	}
}

export { MamWriter, MamReader }
