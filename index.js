// Require the IOTA library
const Mam = require('@iota/mam');
const { asciiToTrytes, trytesToAscii } = require('@iota/converter');

const mode = 'public';
const provider = 'https://nodes.devnet.iota.org';

const providerName = 'devnet';
const mamExplorerLink = 'https://utils.iota.org/mam';

let mamState = Mam.init(provider);

const publish = async packet => {
    // Create MAM message as a string of trytes
    const trytes = asciiToTrytes(JSON.stringify(packet));
    const message = Mam.create(mamState, trytes);

    // Save your new mamState
    mamState = message.state;
    // Attach the message to the Tangle
    await Mam.attach(message.payload, message.address, 3, 9);

    console.log('Published', packet, '\n');
    return message.root;
}

const publishAll = async () => {
	const root = await publish({
	  message: 'Message from Tizio',
	  timestamp: (new Date()).toLocaleString()
	});

	await publish({
	  message: 'Message from Caio',
	  timestamp: (new Date()).toLocaleString()
	});

	await publish({
	  message: 'Message from Sempronio',
	  timestamp: (new Date()).toLocaleString()
	});

	return root;
}

// Callback used to pass data out of the fetch
const logData = data => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n');

publishAll()
  .then(async root => {

    // Output asynchronously using "logData" callback function
    await Mam.fetch(root, mode, null, logData);

    // Output synchronously once fetch is completed
    const result = await Mam.fetch(root, mode);
	result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'));
	
	console.log(`Verify with MAM Explorer:\n${mamExplorerLink}/${root}/${mode}/${providerName}\n`);
});