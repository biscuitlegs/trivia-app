import * as Fetcher from './fetcher'
import QuestionDisplayer from './display'

const myOTD = Fetcher.OpenTriviaDatabase()
const myFetcher = Fetcher.QuestionFetcher(myOTD)
const randomQuestions = myFetcher.fetchRandomQuestions()
const questionObjects = myFetcher.createQuestionObjects(randomQuestions)
const myDisplayer = QuestionDisplayer(questionObjects)
myDisplayer.displayQuestions()
