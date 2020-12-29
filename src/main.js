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
    webgl.postMessage({message: Message.startWebGLWorker,
        canvas: offscreen,
        width: window.innerWidth,
        height: window.innerHeight,
        offsetLeft: canvas.offsetLeft,
        offsetTop: canvas.offsetTop}, [offscreen])    

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
        webgl.postMessage({message: Message.click, 
            clientX: event.clientX, 
            clientY: event.clientY})
    }, false)

    solver.addEventListener('click', _ => {
        geosolver.postMessage({
            message: Message.calculatePossibleInfections
        })
    })

    // GUI worker
    webgl.onmessage = function(event) {
        if (event.data.message == Message.initMamChannels) { 
            initializeMamChannels(event)
            geosolver.postMessage({
                message: "initAgentsChannels",
                seeds: agentsChannels.map(c => c.mam.getSeed())
            })
        } else if (event.data.message == Message.agentWriteOnMam) { 
            agentWriteOnMam(event) 
        } else if (event.data.message == Message.diagnosticianWriteOnMam) { 
            diagnosticianWriteOnMam(event) 
        } else {
            throw new Error('Illegal message for the Web Worker')
        }
    }

    // Geosolver worker
    geosolver.onmessage = event => {
        if (event.data.message == Message.triggerAgents) {
            console.log("Notifications")
        }
    }
}

function initializeMamChannels(event) {
    // Agents' mam channels initialization
    for (const i of Array(event.data.agentsNumber).keys()) {
        agentsChannels.push({
            mam: new MamWriter(
                MamSettings.provider, generateSeed(Seed.appId + "-sim" + Seed.simId + '-' + Seed.agentId + i)
            ),
            security: new SecurityToolBox()
        })
    }
    for (const i of Array(event.data.diagnostNumber).keys()) {
        diagnostChannels.push({
            mam: new MamWriter(
                MamSettings.provider, generateSeed(Seed.agentId + "-sim" + Seed.simId + '-' + Seed.diagnostId + i)
            ),
            security: new SecurityToolBox()
        })
    }
}

function agentWriteOnMam(event) {
    // Agent writing on Mam
    agentsChannels[event.data.agentIndex].mam.publish({
        message: agentsChannels[event.data.agentIndex].security.encryptMessage(event.data.agent.name, 
            agentsChannels[event.data.agentIndex].security.keys.publicKey),                
        history: agentsChannels[event.data.agentIndex].security.encryptMessage(JSON.stringify(event.data.agent.history),
            Security.geosolverPublicKey),
        agentPublicKey: agentsChannels[event.data.agentIndex].security.keys.publicKey
    })
}

function diagnosticianWriteOnMam(event) {
    // Diagnosticians writing on Mam
    var dateCypher = diagnostChannels[0].security.encryptMessage(
        JSON.stringify(event.data.agent.medicalStatus.quarantinedDate), 
        diagnostChannels[0].security.keys.publicKey
    )
    diagnostChannels[0].mam.publish({
        message: agentsChannels[event.data.agentIndex].security.encryptMessage(
            event.data.agent.name, 
            agentsChannels[event.data.agentIndex].security.keys.publicKey
        ),
        date: dateCypher,
        signature: diagnostChannels[0].security.signMessage(dateCypher),
        agentPublicKey: agentsChannels[event.data.agentIndex].security.keys.publicKey,
        diagnosticianPublicKey: diagnostChannels[0].security.keys.publicKey
    })
}
