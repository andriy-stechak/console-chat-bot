import { createInterface } from 'node:readline/promises'
import { EventEmitter } from 'node:events'

export const createQuestionsSandbox = (logger: ConsoleChatBot.Logger): ConsoleChatBot.UserQuestionsSandbox => {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    process.on('exit', () => {
        readline.close()
    })

    const userPromptingEvents = new EventEmitter()

    return {
        startAsking: async function startAsking(intro: string): Promise<void> {
            await this.ask(intro, true)
        },
        onQuestion: function on(handler: ConsoleChatBot.QuestionHandler) {
            userPromptingEvents.on('question', handler)
        },
        provideAnswer: function provideAnswer(answer: string): void {
            userPromptingEvents.emit('answer', answer)
        },
        ask: async function ask (introStr?: string, isIntro = false): Promise<void> {
            const question = isIntro ? `${introStr}\nYour question: ` : 'Your question: '
            const userInput = await readline.question(question)
            if (userInput === 'exit') {
                process.exit(0)
            }
            if (!userInput) {
                await this.ask('Please provide at least something:( or type `exit` to finish conversation', true)
                return
            }
            userPromptingEvents.emit('question', userInput)
            userPromptingEvents.on('answer', async (answer: string) => {
                logger.info(`Answer: ${answer && answer.length > 0 ? answer : 'Sorry! We are developing ability to react on your questions('}`)
                await this.ask()
            })
        }
    }
}