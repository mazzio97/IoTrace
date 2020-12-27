import * as seedrandom from 'seedrandom'

const generateSeed = key => {
    const rng = seedrandom(key)
    const iotaSeedLength = 81
    const seedCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9'
    let result = ''

    for (let i = 0; i < iotaSeedLength; i++) {
      const x = Math.round(rng() * seedCharset.length) % seedCharset.length
      result += seedCharset[x]
    }

    return result
}

export { generateSeed }