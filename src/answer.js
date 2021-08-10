const isCorrect = () => ({ isCorrect: true })
const isIncorrect = () => ({ isCorrect: false })
const hasText = (text) => ({ text })

const Answer = (text, correct) => {
    if (correct) {
        return {
            ...hasText(text),
            ...isCorrect(),
        }
    }
    return {
        ...hasText(text),
        ...isIncorrect(),
    }
}

export default Answer
