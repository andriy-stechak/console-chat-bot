const generatePrompt = ({ context, question }: ConsoleChatBot.PromptPlaceholder): string => {
    return `Answer the question based only on the following context: ${context} Question: ${question}`
}

export default (llm: ConsoleChatBot.LargeLanguageModel): ConsoleChatBot.RagStepExecutor => {
    return async (retrieved: unknown): Promise<unknown> => {
        const { forQuestion, documents } = <ConsoleChatBot.RetrievingResult>retrieved
        const prompt = generatePrompt({ question: forQuestion, context: documents.join('\n\n') })
        return llm.generate(prompt)
    }
}
