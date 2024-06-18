export default (
    graph: ConsoleChatBot.GraphData,
    searchEngine: ConsoleChatBot.SearchEngine
): ConsoleChatBot.RagStepExecutor => {
    return async (question: unknown): Promise<unknown> => {
        let docs: string[] = await graph.retrieve(`${question}`)

        if (docs.length === 0) {
            docs = await searchEngine.search(`${question}`)
            await graph.index(`${question}`, docs)
        }

        return question
    }
}
