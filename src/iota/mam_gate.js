import { asciiToTrytes, trytesToAscii } from '@iota/converter'
import * as Mam from '@iota/mam'

class MamGate {

	constructor(provider, mode, seed, tag) {
		this.provider = provider
		this.seed = seed
		this.mamState = Mam.init(provider, seed)
		this.mode = mode
		this.root = Mam.getRoot(this.mamState)
		this.tag = tag
	}

	async publish(packet, verbose=true) {
		// Create MAM message as a string of trytes
		const trytes = asciiToTrytes(JSON.stringify(packet))
		const message = await Mam.create(this.mamState, trytes)
		
		// Save your new mamState
		this.mamState = message.state
		
		// Attach the message to the Tangle
		await Mam.attach(message.payload, message.address, 3, 9, this.tag)
		
		const address = message.root

		// Prints mam root and published packet
		if (verbose) {
			console.log('Published @ ' + address + ':', packet)
		}
		
		// this.read()

		return address
	}

	async read() {
		// Output synchronously once fetch is completed
		const result = await Mam.fetch(this.root, this.mode)
		result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'))
	}
}

export { MamGate }
