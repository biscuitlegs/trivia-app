import he from 'he'
import * as Type from './type'
import * as Answer from './answer'

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
                const correctAnswerObject =
                    Answer.CorrectAnswer(safeCorrectAnswer)
                const incorrectAnswerObjects = safeIncorrectAnswers.map(
                    (incorrectAnswer) => Answer.IncorrectAnswer(incorrectAnswer)
                )

                switch (result.type) {
                    case 'multiple': {
                        const fetchedQuestion = Type.MultipleChoiceQuestion(
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
                        const fetchedQuestion = Type.BooleanQuestion(
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

export { QuestionFetcher, OpenTriviaDatabase }
