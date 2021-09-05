const shuffleArray = (array) => {
    const shuffledArray = []
    while (array.length > 0) {
        const randomIndex = Math.floor(Math.random() * array.length)
        shuffledArray.push(array[randomIndex])
        array.splice(randomIndex, 1)
    }

    return shuffledArray
}

const capitalize = (string) => {
    const firstLetter = string.charAt(0)
    const stringArray = string.split('')
    stringArray[0] = firstLetter.toUpperCase()

    return stringArray.join('')
}

export { shuffleArray, capitalize }
