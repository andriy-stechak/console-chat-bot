import { ChatOpenAI } from '@langchain/openai'

export default (logger: ConsoleChatBot.Logger, env: ConsoleChatBot.EnvService): ConsoleChatBot.LargeLanguageModel => {
    const OPENAI_KEY = env.getVar('OPENAI_KEY')

    return {
        generate: async (prompt: string): Promise<string | undefined> => {
            const model = new ChatOpenAI({
                apiKey: OPENAI_KEY,
                // modelName: 'gpt-3.5',
                temperature: 1,
                topP: 1,
                frequencyPenalty: 0,
                presencePenalty: 0,
            })


            try {
                const response = await model.invoke(prompt)

                return response.content.toString()
            } catch (error) {
                logger.error('Unable to generate response:', error)
            }
        },
    }
}
