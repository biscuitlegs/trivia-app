const hasCategory = (category) => ({ category })
const hasType = (type) => ({ type })
const hasDifficulty = (difficulty) => ({ difficulty })
const hasQuestion = (question) => ({ question })
const hasCorrectAnswer = (correctAnswer) => ({ correctAnswer })
const hasIncorrectAnswer = (incorrectAnswer) => ({ incorrectAnswer })
const hasIncorrectAnswers = (incorrectAnswers) => ({ incorrectAnswers })
const canCreateHTMLAnswers = (answers) => {
    const createHTMLAnswers = () => {
        const answerList = document.createElement('ul')
        answers.forEach((answer) => {
            const answerChoice = document.createElement('li')
            answerChoice.textContent = answer.text
            answerList.appendChild(answerChoice)
        })

        return answerList
    }

    return { createHTMLAnswers }
}

const MultipleChoiceQuestion = (
    category,
    type,
    difficulty,
    question,
    correctAnswer,
    incorrectAnswers
) => ({
    ...hasCategory(category),
    ...hasType(type),
    ...hasDifficulty(difficulty),
    ...hasQuestion(question),
    ...hasCorrectAnswer(correctAnswer),
    ...hasIncorrectAnswers(incorrectAnswers),
    ...canCreateHTMLAnswers([correctAnswer, ...incorrectAnswers]),
})

const BooleanQuestion = (
    category,
    type,
    difficulty,
    question,
    correctAnswer,
    incorrectAnswer
) => ({
    ...hasCategory(category),
    ...hasType(type),
    ...hasDifficulty(difficulty),
    ...hasQuestion(question),
    ...hasCorrectAnswer(correctAnswer),
    ...hasIncorrectAnswer(incorrectAnswer),
    ...canCreateHTMLAnswers([correctAnswer, incorrectAnswer]),
})

export { MultipleChoiceQuestion, BooleanQuestion }
