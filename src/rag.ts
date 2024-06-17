export const createRagSandbox = (stepExecutor: ConsoleChatBot.RagStepExecutor): ConsoleChatBot.RagSandbox => {
    let _next: ConsoleChatBot.RagSandbox
    return {
        next: function next(nextStep: ConsoleChatBot.RagSandbox): ConsoleChatBot.RagSandbox {
            _next = nextStep

            return this
        },
        execute: async function execute(input: unknown): Promise<unknown> {
            const result = await stepExecutor(input)

            if (_next) {
                return await _next.execute(result)
            }

            return result
        }
    }
}