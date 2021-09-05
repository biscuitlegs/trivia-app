import 'bootstrap/dist/css/bootstrap.min.css'
import * as Helper from './helper'

const createNav = () => {
    const nav = document.createElement('nav')
    const navLink = document.createElement('a')
    const navIcon = document.createElement('i')
    navIcon.classList.add('bi', 'bi-github', 'text-light', 'fs-3')
    navLink.appendChild(navIcon)
    navLink.classList.add('ms-4')
    navLink.setAttribute('href', 'https://github.com/biscuitlegs/trivia-app')
    nav.appendChild(navLink)

    return nav
}

const createFooter = () => {
    const footer = document.createElement('footer')
    const footerSpan = document.createElement('span')
    const footerLink = document.createElement('a')
    footerSpan.textContent = 'Powered by the '
    footerLink.textContent = 'Open Trivia Database'
    footerLink.setAttribute('href', 'https://opentdb.com')
    footer.appendChild(footerSpan)
    footer.appendChild(footerLink)
    footer.classList.add('text-light', 'text-center', 'mb-3')

    return footer
}

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

        return promise
    }

    return { displayQuestions }
}

export { QuestionDisplayer, createFooter, createNav }
