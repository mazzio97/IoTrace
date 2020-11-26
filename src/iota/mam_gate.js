import { asciiToTrytes, trytesToAscii } from '@iota/converter'

export default class MamGate {

	constructor(mode, provider, seed) {
		this.mamState = Mam.init(provider, seed)
		this.mode = mode
		this.root = undefined
	}

	async publish(packet, verbose=true) {
		const date = new Date()

		// Create MAM message as a string of trytes
		const trytes = asciiToTrytes(JSON.stringify(packet))
		const message = await Mam.create(this.mamState, trytes)
		
		// Save your new mamState
		this.mamState = message.state
		
		// Attach the message to the Tangle
		await Mam.attach(message.payload, message.address, 3, 9)
		
		// Store root of first message
		if (this.root == undefined) {
			this.root = message.root
		}
		
		// Prints mam root and published packet
		if (verbose) {
			console.log('Published @ ' + this.root + ':', packet)
		}
		
		return this.root
	}

	async read() {
		// Output synchronously once fetch is completed
		const result = await Mam.fetch(this.root, this.mode)
		result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'))
	}
}

export { MamGate }
