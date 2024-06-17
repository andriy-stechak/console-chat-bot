export default (graph: ConsoleChatBot.GraphData): ConsoleChatBot.RagStepExecutor => {
    return async (question: unknown): Promise<unknown> => {
        const docs = await graph.retrieve(`${question}`)

        return {
            documents: docs,
            forQuestion: question
        }
    }
}