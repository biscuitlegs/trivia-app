import * as Fetcher from './fetcher'
import * as Display from './display'

const nav = Display.createNav()
document.body.appendChild(nav)
const myOTD = Fetcher.OpenTriviaDatabase()
const myFetcher = Fetcher.QuestionFetcher(myOTD)
const randomQuestions = myFetcher.fetchRandomQuestions()
const questionObjects = myFetcher.createQuestionObjects(randomQuestions)
const myDisplayer = Display.QuestionDisplayer(questionObjects)
myDisplayer.displayQuestions().then(() => {
    const footer = Display.createFooter()
    document.body.appendChild(footer)
})
