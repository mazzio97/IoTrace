import { generateSeed } from './iota/generate.js'
import { MamReader, MamWriter } from './iota/mam_gate.js'
import { Time, Message, Security } from '../src/simulation/constants.js'
import { SecurityToolBox } from './iota/security.js'
import { Seed, MamSettings } from './simulation/constants'

let agentsChannels = []
let diagnostChannels = []

window.onload = () => {
    var canvas = document.getElementById('scene')
    var toggle = document.getElementById('toggle')
    
    // Stretch the canvas to the window size
    canvas.width = window.innerWidth, - 30
    canvas.height = window.innerHeight - 30

    var webgl = new Worker('./webgl_worker.bundle.js')
    var geosolver = new Worker('./geosolver.bundle.js')
    var offscreen = canvas.transferControlToOffscreen()

    function runSolver() {
        // if the simulation is still playing (i.e., the toogle has the text 'Pause')
        if (toggle.innerText == 'Pause') {
            // activates the routines for the solver
            webgl.postMessage({
                message: Message.getSimulationDateForSolver
            })
            // sets the timeout to let the solver run again
            setTimeout(runSolver, Time.solverUpdateTime)
        }
    }

    // Start WebGL worker
    webgl.postMessage({
        message: Message.startWebGLWorker,
        canvas: offscreen,
        width: window.innerWidth,
        height: window.innerHeight,
        offsetLeft: canvas.offsetLeft,
        offsetTop: canvas.offsetTop
    }, [offscreen])

    // Play/Pause event listener
    toggle.addEventListener('click', _ => {
        if (toggle.innerText == 'Pause') {
            toggle.innerText = 'Play'
            webgl.postMessage({message: Message.pauseResume})
        } else {
            toggle.innerText = 'Pause'
            webgl.postMessage({message: Message.pauseResume})
            runSolver() // as soon as the simulation is played, the solver is run
        }
    })

    // Add event listener to select agents
    canvas.addEventListener('click', event => {
        webgl.postMessage({
            message: Message.click, 
            clientX: event.clientX, 
            clientY: event.clientY
        })
    }, false)

    // GUI worker
    webgl.onmessage = event => {
        const data = event.data
        console.log('From WebGL to Main:', data)
        if (data.message == Message.initMamChannels) { 
            initializeMamChannels(data.agentsNumber, data.diagnostNumber)
            geosolver.postMessage({
                message: Message.initAgentsChannels,
                agentsSeeds: agentsChannels.map(c => c.mam.getSeed()),
                diagnosticiansSeeds: diagnostChannels.map(c => c.mam.getSeed())
            })
        } else if (data.message == Message.agentWriteOnMam) {
            agentWriteOnMam(data.agentIndex, data.agent) 
        } else if (data.message == Message.diagnosticianWriteOnMam) { 
            diagnosticianWriteOnMam(data.agent, data.agentIndex, data.diagnosticianIndex) 
        } else if (data.message == Message.returnSimulationDateForSolver) {
            geosolver.postMessage({
                message: Message.calculatePossibleInfections,
                currentDate: data.currentDate
            })
        } else {
            throw new Error('Illegal message from Web Worker to Main')
        }
    }

    // Geosolver worker
    geosolver.onmessage = event => {
        console.log('From Geosolver to Main:', event.data)
        if (event.data.message == Message.triggerAgents) {
            agentsChannels.forEach(async (a, i) => {
                let previousRoot = a.notifications.currentRoot
                const payloads = await a.notifications.read()
                const possible = payloads.filter(p => {
                    // verify geosolver's transactions
                    if (SecurityToolBox.verifyMessage(p.cyphertext, p.signature, p.publicKey)) {
                        return true
                    } else {
                        console.error('CHECKSUM ERROR:', previousRoot)
                        return false
                    }
                }).flatMap(p => {
                    // decrypt geosolver's transaction (using the shared toolbox)
                    const possibleInfections = JSON.parse(a.notificationsToolbox.decryptMessage(p.cyphertext, p.publicKey))
                    return possibleInfections
                })

                webgl.postMessage({
                    message: Message.checkNotifications,
                    index: i,
                    possible: [...new Set(possible)]
                })
            })
        } else {
            throw new Error('Illegal message from Geosolver to Main')
        }
    }
}

function initializeMamChannels(agentsNumber, diagnostNumber) {
    // Agents' mam channels initialization
    for (const i of Array(agentsNumber).keys()) {
        agentsChannels.push({
            mam: new MamWriter(
                MamSettings.provider, generateSeed(Seed.appId + "-sim" + Seed.simId + '-' + Seed.agentId + i)
            ),
            security: new SecurityToolBox(),
            notifications: new MamReader(MamSettings.provider, Security.geosolverSeed),
            notificationsToolbox: new SecurityToolBox(Security.notificationKey) // shared toolbox to allow one-to-many encrpytion
        })
    }
    for (const i of Array(diagnostNumber).keys()) {
        diagnostChannels.push({
            mam: new MamWriter(
                MamSettings.provider, generateSeed(Seed.appId + "-sim" + Seed.simId + '-' + Seed.diagnostId + i)
            ),
            security: new SecurityToolBox()
        })
    }
    console.log('AGENTS\' ROOTS:', agentsChannels.map(c => c.mam.startRoot))
    console.log('DIAGNOSTICIANS\' ROOTS:', diagnostChannels.map(c => c.mam.startRoot))
}

async function agentWriteOnMam(agentIndex, agent) {
    // The messages posted by the agents are their histories
    const cyphertext = agentsChannels[agentIndex].security.encryptMessage(
        JSON.stringify(agent.history),
        Security.geosolverPublicKey
    )
    await agentsChannels[agentIndex].mam.publish({
        id: agent.id,
        cyphertext: cyphertext,
        publicKey: agentsChannels[agentIndex].security.keys.publicKey,
        signature: agentsChannels[agentIndex].security.signMessage(cyphertext)
    })
}

async function diagnosticianWriteOnMam(agent, agentIndex, diagnosticianIndex) {
    // Agent publishes cached history
    await agentWriteOnMam(agentIndex, agent)
    // Diagnostician reads agents' transactions from their mam channel
    const mam = new MamReader(MamSettings.provider, agentsChannels[agentIndex].mam.getSeed())
    const payloads = await mam.read()
    // The messages posted by the diagnosticians are the array of agent's histories without the id, plus the agent's key
    const cyphertext = diagnostChannels[diagnosticianIndex].security.encryptMessage(
        JSON.stringify({
            cyphertexts: payloads.filter(p => {
                // verify agent's transactions but do not decrypt them (this will be done by the geosolver)
                if (SecurityToolBox.verifyMessage(p.cyphertext, p.signature, p.publicKey)) {
                    return true
                } else {
                    console.error('CHECKSUM ERROR:', mam.startRoot)
                    return false
                }
            }).map(p => p.cyphertext),
            publicKey: agentsChannels[agentIndex].security.keys.publicKey
        }),
        Security.geosolverPublicKey
    )
    diagnostChannels[diagnosticianIndex].mam.publish({
        cyphertext: cyphertext,
        publicKey: diagnostChannels[diagnosticianIndex].security.keys.publicKey,
        signature: diagnostChannels[diagnosticianIndex].security.signMessage(cyphertext)
    })
}
