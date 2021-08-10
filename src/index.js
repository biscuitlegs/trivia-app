import he from 'he'
import { MultipleChoiceQuestion, BooleanQuestion } from './question-types'
import Answer from './answer'

const QuestionDisplayer = (promise) => {
    const displayQuestions = () => {
        promise.then((objects) => {
            objects.forEach((object) => {
                const { category, difficulty, question } = object
                const categoryDisplay = document.createElement('h2')
                categoryDisplay.textContent = category
                document.body.appendChild(categoryDisplay)
                const difficultyDisplay = document.createElement('h3')
                difficultyDisplay.textContent = difficulty
                document.body.appendChild(difficultyDisplay)
                const questionDisplay = document.createElement('h4')
                questionDisplay.textContent = question
                document.body.appendChild(questionDisplay)
                const answersDisplay = object.createHTMLAnswers()
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
