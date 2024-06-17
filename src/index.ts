import { createQuestionsSandbox } from './userQuestions'
import { createRagSandbox } from './rag'
import embedding from './embedding'
import retrieving from './retrieving'
import generating from './generating'
import { graph } from './graph'
import { google } from './search'
import { llm } from './llm'

const logger = console
const embedRelatedDataSet = embedding(graph, google)
const retrieveRelatedData = retrieving(graph)
const generateAnswer = generating(llm)

const greeting = `Hi! I am here to help.
Please, start asking:) or type 'exit' to finish conversation!`

const main = async (): Promise<void> => {
    const userPrompt = createQuestionsSandbox(logger)
    const rag = createRagSandbox(embedRelatedDataSet)
        .next(createRagSandbox(retrieveRelatedData)
            .next(createRagSandbox(generateAnswer)))
    userPrompt.onQuestion(async (userQuestion: string): Promise<void> => {
        logger.info('Please wait...')
        const answer = <string>(await rag.execute(userQuestion))
        userPrompt.provideAnswer(answer)
    })
    userPrompt.startAsking(greeting)
}

main().catch((error: Error) => {
    logger.error(error)
    process.exit(1)
})