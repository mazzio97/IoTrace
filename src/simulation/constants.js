import { generateSeed } from "../iota/generate"

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
	agentRadius: 7,
	infectionRadius: 30,
	selectedStrokeWidth: 3,
	offset: 60,
	numAgentsEachHouse: 4,
	historyDim: 10
}

const Probabilities = {
	reachNewTarget: 1e-3,
	passInfection: 1e-2,
	randomScreening: 0.2
}

const Time = {
	clock: timestep,
	clockScale: 1 * 60 * timestep, // every second in the simulation corresponds to one minute
	solverUpdateTime: 30 * 1000, // solver updates every thirty (real) seconds
	writingTime: 5 * 60 * 1000, // agents write every five (simulated) minutes
	discardTime: 6 * 60 * 60, // discard data prior to six (simulated) hours, expressed in seconds
	initialDate: new Date(2020, 2), // initial date of the simulation
	agentVelocity: 0.5
}

const Seed = {
	appId: 'iotrace',
	agentId: 'agent',
	diagnostId: 'diagnost',
	geosolverId: 'geosolver',
	simId: '0039'
}


const Security = {
	passwordLength: 1024,
	passwordCharset: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
	geosolverPublicKey: 'uhayO4JgKQ8SPZqg1xReY3USXTm1OrF3F8VzOfht1TE=',
	geosolverSeed: generateSeed(Seed.appId + "-sim" + Seed.simId + "-" + Seed.geosolverId),
	notificationKey: 'Blov0GwUZDfFctT0TPG4PUr48TWv6AZsP2m3HWpIY34CmNrV1yrwYHS4hDfZTH5jYbGg45vnYxjMAZFO3WNkgA=='
}

const Message = {
	click: 'click',
	pauseResume: 'pauseResume',
	startWebGLWorker: 'startWebGLWorker',
	initMamChannels: 'initMamChannels',
	initAgentsChannels: 'initAgentsChannels',
	agentWriteOnMam: 'agentWriteOnMam',
	diagnosticianWriteOnMam: 'diagnosticianWriteOnMam',
	getSimulationDateForSolver: 'getSimulationDateForSolver',
	returnSimulationDateForSolver: 'returnSimulationDateForSolver',
	calculatePossibleInfections: 'calculatePossibleInfections',
	triggerAgents: 'triggerAgents',
	checkNotifications: "checkNotifications"
}

const MamSettings = {
	provider: 'https://nodes.devnet.iota.org'
}

const GeoSolverParams = {
	distance: 2 * Dim.infectionRadius,
	timeInterval: 2 * Time.writingTime / 1000
}

export { Colors, Dim, Probabilities, Time, Security, Message, Seed, MamSettings, GeoSolverParams }
