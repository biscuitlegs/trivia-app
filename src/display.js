import 'bootstrap/dist/css/bootstrap.min.css'
import * as Helper from './helper'

const createHTMLAnswers = (answers) => {
    const answerList = document.createElement('ul')
    answerList.classList.add('list-unstyled')
    const correctAnswer = answers.find((answer) => answer.isCorrect)
    answers.forEach((answer) => {
        const answerChoice = document.createElement('li')
        answerChoice.classList.add('m-2')
        const answerButton = document.createElement('button')
        answerButton.classList.add('w-100', 'py-4')
        answerButton.textContent = answer.text
        answerChoice.appendChild(answerButton)
        answerList.appendChild(answerChoice)

        answerButton.addEventListener('click', () => {
            const message = document.createElement('p')
            message.classList.add('mt-5')
            if (answer.isCorrect) {
                answerButton.classList.add('btn-success')
                message.classList.add('bg-success', 'text-light', 'p-3')
                message.textContent = `Well done! ${answer.text} was correct!`
            } else {
                answerButton.classList.add('btn-danger')
                message.classList.add('bg-danger', 'text-light', 'p-3')
                message.textContent = `Sorry, that's wrong! ${correctAnswer.text} was correct!`
            }

            answerList.appendChild(message)
        })
    })

    return answerList
}

const initializeHTMLAnswerButtons = (answerButtons) => {
    answerButtons.forEach((button) => {
        button.classList.add('btn', 'btn-primary')
        button.addEventListener('click', () => {
            answerButtons.forEach((btn) => btn.setAttribute('disabled', 'true'))
        })
    })
}

const createCategoryDisplay = (text) => {
    const categoryDisplay = document.createElement('h4')
    categoryDisplay.classList.add('text-center', 'text-light')
    categoryDisplay.textContent = text

    return categoryDisplay
}

const createDifficultyDisplay = (text) => {
    const difficultyDisplay = document.createElement('h4')
    difficultyDisplay.classList.add('text-center', 'text-light')
    difficultyDisplay.textContent = Helper.capitalize(text)

    return difficultyDisplay
}

const createQuestionDisplay = (text) => {
    const questionDisplay = document.createElement('h2')
    questionDisplay.classList.add(
        'text-center',
        'text-light',
        'border-top',
        'py-3'
    )
    questionDisplay.textContent = text

    return questionDisplay
}

const QuestionDisplayer = (promise) => {
    const displayQuestions = () => {
        promise.then((objects) => {
            objects.forEach((object) => {
                const container = document.createElement('div')
                container.classList.add('border', 'm-4', 'p-3')
                const { category, difficulty, question } = object
                const categoryDisplay = createCategoryDisplay(category)
                container.appendChild(categoryDisplay)
                const difficultyDisplay = createDifficultyDisplay(difficulty)
                container.appendChild(difficultyDisplay)
                const questionDisplay = createQuestionDisplay(question)
                container.appendChild(questionDisplay)
                const shuffledAnswers = Helper.shuffleArray(object.answers)
                const answersDisplay = createHTMLAnswers(shuffledAnswers)
                const answerButtons = answersDisplay.querySelectorAll('button')
                initializeHTMLAnswerButtons(answerButtons)
                container.appendChild(answersDisplay)
                document.body.appendChild(container)
            })
        })
    }

    return { displayQuestions }
}

export default QuestionDisplayer
