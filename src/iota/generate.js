export const generateSeed = () => {
    // The length of the seed and int array.
    var length = 81
    // The allowed characters in the seed.
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9"
    // An empty array to store the random values.
    var randomValues = new Uint32Array(length)
    // An empty array to store the seed characters.
    var result = new Array(length)

    // Generate random values and store them to array.
    window.crypto.getRandomValues(randomValues)

    // A cursor is introduced to remove modulus bias.
    var cursor = 0
    // Loop through each of the 81 random values.
    for (var i = 0; i < randomValues.length; i++) {
        // Add them to the cursor.
        cursor += randomValues[i]
        // Assign a new character to the seed based on cursor mod 81.
        result[i] = chars[cursor % chars.length]
    }

    // Merge the array into a single string and return it.
    return result.join('')
}
