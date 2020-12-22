import { generateSeed } from './iota/generate.js'
import { MamGate } from './iota/mam_gate.js'
import { Message, Security } from '../src/simulation/constants.js'
import { SecurityToolBox } from './iota/security.js'

let agentsMamChannels = []
let agentsSecurityTools = []
const geotag = "IOTRACEHISTORY"

let diagnosticianMamChannel = new MamGate('public', 
    'https://nodes.devnet.iota.org', 
    generateSeed())
let diagnosticianSecurtiyTools = new SecurityToolBox()

window.onload = () => {
    var canvas = document.getElementById('scene')
    var toggle = document.getElementById('toggle')

    // Stretch the canvas to the window size
    canvas.width = window.innerWidth, - 30
    canvas.height = window.innerHeight - 30

    var worker = new Worker('./webgl_worker.bundle.js')
    var offscreen = canvas.transferControlToOffscreen()

    // Start WebGL worker
    worker.postMessage({message: Message.startWebGLWorker,
        canvas: offscreen,
        width: window.innerWidth,
        height: window.innerHeight,
        offsetLeft: canvas.offsetLeft,
        offsetTop: canvas.offsetTop}, [offscreen])    

    // Play/Pause event listener
    toggle.addEventListener('click', _ => {
        if (toggle.innerText == 'Play') {
            toggle.innerText = 'Pause'
            worker.postMessage({message: Message.pauseResume})
        } else {
            toggle.innerText = 'Play'
            worker.postMessage({message: Message.pauseResume})
        }
    })

    // Add event listener to select agents
    canvas.addEventListener("click", event => { 
        worker.postMessage({message: Message.click, 
            clientX: event.clientX, 
            clientY: event.clientY})
    }, false)
    
    // Main thread message handlers
    worker.onmessage = function(event) {
        console.log(event.data)

        if (event.data.message == Message.initMamChannels) {
            // Agents' mam channels initialization
            for (const i of Array(event.data.agentsNumber).keys()) {
                agentsMamChannels[i] = new MamGate('public', 
                    'https://nodes.devnet.iota.org', 
                    generateSeed(), 
                    geotag)
                agentsSecurityTools[i] = new SecurityToolBox()
            }
        } else if (event.data.message == Message.agentWriteOnMam) {
            // Agent writing on Mam
            agentsMamChannels[event.data.agentIndex].publish({
                message: agentsSecurityTools[event.data.agentIndex].encryptMessage(event.data.agent.name, 
                    agentsSecurityTools[event.data.agentIndex].keys.publicKey),                
                history: agentsSecurityTools[event.data.agentIndex].encryptMessage(JSON.stringify(event.data.agent.history),
                    Security.geosolverPublicKey),
                agentPublicKey: agentsSecurityTools[event.data.agentIndex].keys.publicKey
            })
        } else if (event.data.message == Message.diagnosticianWriteOnMam) {
            // Diagnostician writing on Mam

            var dateCypher = diagnosticianSecurtiyTools.encryptMessage(JSON.stringify(event.data.agent.medicalStatus.quarantinedDate), 
                diagnosticianSecurtiyTools.keys.publicKey)

            diagnosticianMamChannel.publish({
                message: agentsSecurityTools[event.data.agentIndex].encryptMessage(event.data.agent.name, 
                    agentsSecurityTools[event.data.agentIndex].keys.publicKey),
                date: dateCypher,
                signature: diagnosticianSecurtiyTools.signMessage(dateCypher),
                agentPublicKey: agentsSecurityTools[event.data.agentIndex].keys.publicKey,
                diagnosticianPublicKey: diagnosticianSecurtiyTools.keys.publicKey
            })
        }
    }
}
