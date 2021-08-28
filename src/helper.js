const shuffleArray = (array) => {
    const shuffledArray = []
    while (array.length > 0) {
        const randomIndex = Math.floor(Math.random() * array.length)
        shuffledArray.push(array[randomIndex])
        array.splice(randomIndex, 1)
    }

    return shuffledArray
}

export default shuffleArray
