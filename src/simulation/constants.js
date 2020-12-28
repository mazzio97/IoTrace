const placeAlphaChannel = 0.7
const agentAlphaChannel = 0.7
const infectionAreaAlphaChannel = 0.2
const timestep = 1000.0 / 30.0 // 30fps

const Colors = {
	normal: "rgba(0, 0, 0, " + agentAlphaChannel + ")",
	infected: "rgba(255, 0, 0, " + agentAlphaChannel + ")",
	notified: "rgba(255, 255, 0, " + agentAlphaChannel + ")",
	quarantined: "rgba(100, 0, 135, " + agentAlphaChannel + ")",

	infectionArea: "rgba(255, 0, 0, " + infectionAreaAlphaChannel + ")",
	selectedStroke: "rgba(255, 0, 255, " + agentAlphaChannel + ")",
	text: "rgba(0, 0, 0, " + agentAlphaChannel + ")",

	placeLine: "rgba(0, 0, 0, 1)",
	placeText: "rgba(0, 0, 0, " + placeAlphaChannel + ")"
}

const Dim = {
	epsilon: 1, // Minimum distance used to stop agents which have reached their destinations
	agentRadius: 5,
	infectionRadius: 30,
	selectedStrokeWidth: 3,
	offset: 60,
	numAgentsEachHouse: 1
}

const Probabilities = {
	reachNewTarget: 1e-3,
	passInfection: 1e-2
}

const Time = {
	clock: timestep,
	clockScale: 1 * 60 * timestep, // every second in the simulation corresponds to ten minutes
	writingTime: 10 * 60 * 1000, // agents write every ten (simulated) minutes
	initialDate: new Date(2020, 2), // initial date of the simulation
	agentVelocity: 0.5
}

const Security = {
	passwordLength: 1024,
	passwordCharset: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
	geosolverPrivatekey: '7KxRgYSISJ7sRUx3pc5hZZ7ptEQ+YPddp6rhC8Y1uUS6FrI7gmApDxI9mqDXFF5jdRJdObU6sXcXxXM5+G3VMQ==',
	geosolverPublicKey: 'uhayO4JgKQ8SPZqg1xReY3USXTm1OrF3F8VzOfht1TE='
}

const Message = {
	click: 'click',
	pauseResume: 'pauseResume',
	startWebGLWorker: 'startWebGLWorker',
	initMamChannels: 'initMamChannels',
	agentWriteOnMam: 'agentWriteOnMam',
	diagnosticianWriteOnMam: 'diagnosticianWriteOnMam',
	calculatePossibleInfections: 'calculatePossibleInfections',
	triggerAgents: 'triggerAgents'
}

const Seed = {
	appId: 'iotrace',
	agentId: 'agent',
	diagnostId: 'diagnost',
	simId: '0000'
}

const MamSettings = {
	mode: 'public',
	provider: 'https://nodes.devnet.iota.org'
}

export {Colors, Dim, Probabilities, Time, Security, Message, Seed, MamSettings}
