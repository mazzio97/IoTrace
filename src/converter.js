const TRYTE_ALPHABET = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'

//Conversion from TRYTES to ASCII
export const trytesToAscii = (trytes) => {
    let ascii = ''
    if (typeof(trytes) !== 'string' || !new RegExp(`^[9A-Z]{1,}$`).test(trytes)) {
        console.log('Trytes not valid. Try again...') 
    }

    if (trytes.length % 2) {
        console.log('Trytes digits number is ODD')
    }

    console.log('Trytes conversion...')
    for (let i = 0; i < trytes.length; i += 2) {
        ascii += String.fromCharCode(TRYTE_ALPHABET.indexOf(trytes[i]) + TRYTE_ALPHABET.indexOf(trytes[i + 1]) * 27)
    }
    return ascii
}

//Conversion from ASCII to TRYTES
export const asciiToTrytes = (input) => {
    // If input is not an ascii string, throw error
    if (!/^[\x00-\x7F]*$/.test(input)) {
        console.log('ASCII string not valid. Try again...')
        return
    }
    let trytes = ''

    for (let i = 0; i < input.length; i++) {
        const dec = input[i].charCodeAt(0)

        trytes += TRYTE_ALPHABET[dec % 27]
        trytes += TRYTE_ALPHABET[(dec - (dec % 27)) / 27]
    }
    return trytes
}

export default {}