import { asciiToTrytes } from '@iota/converter'
// import * as M from '../../dist/lib/mam.web.min.js'

onmessage = async function(event) {
    console.log(event.data['packet'])
    const trytes = asciiToTrytes(JSON.stringify(event.data['packet']))
    console.log(trytes)
    const message = await Mam.create(event.data['mamState'], trytes)
}

export default {}