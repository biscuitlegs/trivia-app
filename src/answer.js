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

const initializeHTMLAnswerButtons = (answerButtons) => {
    answerButtons.forEach((button) => {
        button.addEventListener('click', () => {
            answerButtons.forEach((btn) => btn.setAttribute('disabled', 'true'))
        })
    })
}

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

export { Answer, createHTMLAnswers, initializeHTMLAnswerButtons }
