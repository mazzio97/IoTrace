import { generateSeed } from './iota/generate.js'
import { MamWriter } from './iota/mam_gate.js'
import { Message, Security } from '../src/simulation/constants.js'
import { SecurityToolBox } from './iota/security.js'
import { Seed, MamSettings } from './simulation/constants'

let agentsChannels = []
let diagnostChannels = []

window.onload = () => {
    var canvas = document.getElementById('scene')
    var toggle = document.getElementById('toggle')
    var solver = document.getElementById('solver')

    // Stretch the canvas to the window size
    canvas.width = window.innerWidth, - 30
    canvas.height = window.innerHeight - 30

    var webgl = new Worker('./webgl_worker.bundle.js')
    var geosolver = new Worker('./geosolver.bundle.js')
    var offscreen = canvas.transferControlToOffscreen()

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

    solver.addEventListener('click', _ => {
        geosolver.postMessage({
            message: Message.calculatePossibleInfections
        })
    })

    // GUI worker
    webgl.onmessage = event => {
        const data = event.data
        console.log('From WebGL to Main:', data)
        if (data.message == Message.initMamChannels) { 
            initializeMamChannels(data.agentsNumber, data.diagnostNumber)
            geosolver.postMessage({
                message: "initAgentsChannels",
                seeds: agentsChannels.map(c => c.mam.getSeed())
            })
        } else if (data.message == Message.agentWriteOnMam) { 
            agentWriteOnMam(data.agentIndex, data.agent) 
        } else if (data.message == Message.diagnosticianWriteOnMam) { 
            diagnosticianWriteOnMam(data.agentIndex, data.agent) 
        } else {
            throw new Error('Illegal message from the Web Worker')
        }
    }

    // Geosolver worker
    geosolver.onmessage = event => {
        console.log('From Geosolver to Main:', event.data)
        if (event.data.message == Message.triggerAgents) {
            console.log("Notifications")
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
            security: new SecurityToolBox()
        })
    }
    for (const i of Array(diagnostNumber).keys()) {
        diagnostChannels.push({
            mam: new MamWriter(
                MamSettings.provider, generateSeed(Seed.agentId + "-sim" + Seed.simId + '-' + Seed.diagnostId + i)
            ),
            security: new SecurityToolBox()
        })
    }
}

function agentWriteOnMam(agentIndex, agent) {
    // Agent writing on Mam
    agentsChannels[agentIndex].mam.publish({
        bundle: agentsChannels[agentIndex].security.encryptMessage(
            JSON.stringify({
                id: agent.id,
                history: agent.history
            }),
            Security.geosolverPublicKey
        ),
        agentPublicKey: agentsChannels[agentIndex].security.keys.publicKey
    })
}

function diagnosticianWriteOnMam(agentIndex, agent) {
    // Diagnosticians writing on Mam
    var dateCypher = diagnostChannels[0].security.encryptMessage(
        JSON.stringify(agent.medicalStatus.quarantinedDate), 
        diagnostChannels[0].security.keys.publicKey
    )
    diagnostChannels[0].mam.publish({
        message: agentsChannels[agentIndex].security.encryptMessage(
            agent.name, 
            agentsChannels[agentIndex].security.keys.publicKey
        ),
        date: dateCypher,
        signature: diagnostChannels[0].security.signMessage(dateCypher),
        agentPublicKey: agentsChannels[agentIndex].security.keys.publicKey,
        diagnosticianPublicKey: diagnostChannels[0].security.keys.publicKey
    })
}
