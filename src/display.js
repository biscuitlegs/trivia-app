import shuffleArray from './helper'

const createHTMLAnswers = (answers) => {
    const answerList = document.createElement('ul')
    const correctAnswer = answers.find((answer) => answer.isCorrect)
    answers.forEach((answer) => {
        const answerChoice = document.createElement('li')
        const answerButton = document.createElement('button')
        answerButton.textContent = answer.text
        answerChoice.appendChild(answerButton)
        answerList.appendChild(answerChoice)

        answerButton.addEventListener('click', () => {
            const message = document.createElement('p')
            if (answer.isCorrect) {
                answerButton.style.backgroundColor = 'green'
                message.textContent = `Well done! ${answer.text} was correct!`
            } else {
                answerButton.style.backgroundColor = 'red'
                message.textContent = `Sorry, that's wrong! ${correctAnswer.text} was correct!`
            }

            answerList.appendChild(message)
        })
    })

    return answerList
}

const initializeHTMLAnswerButtons = (answerButtons) => {
    answerButtons.forEach((button) => {
        button.addEventListener('click', () => {
            answerButtons.forEach((btn) => btn.setAttribute('disabled', 'true'))
        })
    })
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

export default QuestionDisplayer
