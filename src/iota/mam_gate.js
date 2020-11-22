import { asciiToTrytes, trytesToAscii } from './converter.js'

const providerName = 'devnet'
const mamExplorerLink = 'https://utils.iota.org/mam'

export default class MamGate {

	constructor(mode, provider, seed) {
		this.mamState = Mam.init(provider, seed)
		this.mode = mode
		this.transactionCounter = 0
		this.root = undefined
	}

	async publish(packet) {
		// Create MAM message as a string of trytes
		const trytes = asciiToTrytes(JSON.stringify(packet))
		const message = Mam.create(this.mamState, trytes)
	
		// Save your new mamState
		this.mamState = message.state
		// Attach the message to the Tangle
		await Mam.attach(message.payload, message.address, 3, 9)

		if (this.transactionCounter == 0) { // Ugly stuff
			this.root = message.root
			this.transactionCounter++
		}
	
		console.log('Published', packet, '\n')
		return message.root
	}

	async read() {
		// Output synchronously once fetch is completed
		const result = await Mam.fetch(this.root, this.mode)
		result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'))
		
		console.log(`Verify with MAM Explorer:\n${mamExplorerLink}/${this.root}/${this.mode}/${providerName}\n`)
	}
}

export { MamGate }
