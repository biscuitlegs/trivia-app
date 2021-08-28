const hasCategory = (category) => ({ category })
const hasType = (type) => ({ type })
const hasDifficulty = (difficulty) => ({ difficulty })
const hasQuestion = (question) => ({ question })
const hasCorrectAnswer = (correctAnswer) => ({ correctAnswer })
const hasIncorrectAnswer = (incorrectAnswer) => ({ incorrectAnswer })
const hasIncorrectAnswers = (incorrectAnswers) => ({ incorrectAnswers })
const hasAnswers = (answers) => ({ answers })

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
    ...hasAnswers([correctAnswer, ...incorrectAnswers]),
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
    ...hasAnswers([correctAnswer, incorrectAnswer]),
})

export { MultipleChoiceQuestion, BooleanQuestion }
