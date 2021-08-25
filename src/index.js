import he from 'he'
import { MultipleChoiceQuestion, BooleanQuestion } from './question-types'
import {
    Answer,
    createHTMLAnswers,
    initializeHTMLAnswerButtons,
} from './answer'

const shuffleArray = (array) => {
    const shuffledArray = []
    while (array.length > 0) {
        const randomIndex = Math.floor(Math.random() * array.length)
        shuffledArray.push(array[randomIndex])
        array.splice(randomIndex, 1)
    }

    return shuffledArray
}

const createCategoryDisplay = (text) => {
    const categoryDisplay = document.createElement('h2')
    categoryDisplay.textContent = text

    return categoryDisplay
}

const createDifficultyDisplay = (text) => {
    const difficultyDisplay = document.createElement('h2')
    difficultyDisplay.textContent = text

    return difficultyDisplay
}

const createQuestionDisplay = (text) => {
    const questionDisplay = document.createElement('h2')
    questionDisplay.textContent = text

    return questionDisplay
}

const QuestionDisplayer = (promise) => {
    const displayQuestions = () => {
        promise.then((objects) => {
            objects.forEach((object) => {
                const { category, difficulty, question } = object
                const categoryDisplay = createCategoryDisplay(category)
                document.body.appendChild(categoryDisplay)
                const difficultyDisplay = createDifficultyDisplay(difficulty)
                document.body.appendChild(difficultyDisplay)
                const questionDisplay = createQuestionDisplay(question)
                document.body.appendChild(questionDisplay)
                const shuffledAnswers = shuffleArray(object.answers)
                const answersDisplay = createHTMLAnswers(shuffledAnswers)
                const answerButtons = answersDisplay.querySelectorAll('button')
                initializeHTMLAnswerButtons(answerButtons)
                document.body.appendChild(answersDisplay)
            })
        })
    }

    return { displayQuestions }
}

const QuestionFetcher = (fetcher) => {
    const fetchRandomQuestions = (number = 10) =>
        fetcher.fetchRandomQuestions(number)

    const createQuestionObjects = (promise) =>
        fetcher.createQuestionObjects(promise)

    return { fetchRandomQuestions, createQuestionObjects }
}

const OpenTriviaDatabase = () => {
    const fetchRandomQuestions = (number = 10) =>
        fetch(`https://opentdb.com/api.php?amount=${number}`, {
            type: 'cors',
        }).then((response) => response.json())

    const createQuestionObjects = (promise) =>
        promise.then((json) => {
            const fetchedQuestions = []
            const { results } = json

            results.forEach((result) => {
                const {
                    category,
                    type,
                    difficulty,
                    question,
                    correct_answer: correctAnswer,
                    incorrect_answers: incorrectAnswers,
                } = result
                const safeQuestion = he.decode(question)
                const safeCorrectAnswer = he.decode(correctAnswer)
                const safeIncorrectAnswers = incorrectAnswers.map(
                    (incorrectAnswer) => he.decode(incorrectAnswer)
                )
                const correctAnswerObject = Answer(safeCorrectAnswer, true)
                const incorrectAnswerObjects = safeIncorrectAnswers.map(
                    (incorrectAnswer) => Answer(incorrectAnswer, false)
                )

                switch (result.type) {
                    case 'multiple': {
                        const fetchedQuestion = MultipleChoiceQuestion(
                            category,
                            type,
                            difficulty,
                            safeQuestion,
                            correctAnswerObject,
                            incorrectAnswerObjects
                        )
                        fetchedQuestions.push(fetchedQuestion)
                        break
                    }
                    case 'boolean': {
                        const fetchedQuestion = BooleanQuestion(
                            category,
                            type,
                            difficulty,
                            safeQuestion,
                            correctAnswerObject,
                            incorrectAnswerObjects[0]
                        )
                        fetchedQuestions.push(fetchedQuestion)
                        break
                    }
                    default: {
                        return 'Unknown question type.'
                    }
                }

                return result
            })

            return fetchedQuestions
        })

    return { fetchRandomQuestions, createQuestionObjects }
}

const myOTD = OpenTriviaDatabase()
const myFetcher = QuestionFetcher(myOTD)
const randomQuestions = myFetcher.fetchRandomQuestions()
const questionObjects = myFetcher.createQuestionObjects(randomQuestions)
const myDisplayer = QuestionDisplayer(questionObjects)
myDisplayer.displayQuestions()