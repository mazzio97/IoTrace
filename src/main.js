import { generateSeed } from './iota/generate.js'
import { MamGate } from './iota/mam_gate.js'
import { Message } from '../src/simulation/constants.js'

let agentsMamChannels = []
const geotag = "GEOPOSIOTRACE"

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ } 
}

function writeMessage(agentIndex, agent) {
    agentsMamChannels[agentIndex].publish({
        message: agent.name,
        x: JSON.stringify(agent.x),
        y: JSON.stringify(agent.y),
        date: agent.lastWriting,
        publicKey: agent.secutityToolbox.keys.publicKey
    })
}

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
    
    worker.onmessage = function(event) {
        console.log(event.data)

        if (event.data.message == Message.initMamChannels) {
            for (const i of Array(event.data.agentsNumber).keys()) {
                agentsMamChannels[i] = new MamGate('public', 
                    'https://nodes.devnet.iota.org', 
                    generateSeed(), 
                    geotag)
            }
        } else if (event.data.message == Message.writeOnMam) {
            writeMessage(event.data.agentIndex, event.data.agent)
        }
    }
}
