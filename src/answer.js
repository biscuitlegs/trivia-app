const isCorrect = () => ({ isCorrect: true })
const isIncorrect = () => ({ isCorrect: false })
const hasText = (text) => ({ text })

const CorrectAnswer = (text) => ({
    ...hasText(text),
    ...isCorrect(),
})

const IncorrectAnswer = (text) => ({
    ...hasText(text),
    ...isIncorrect(),
})

export { CorrectAnswer, IncorrectAnswer }
