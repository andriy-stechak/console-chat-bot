namespace ConsoleChatBot {
    type Logger = Console

    // User questions
    type QuestionHandler = (question: string) => Promise<void>

    interface UserQuestionsSandbox {
        provideAnswer(answer: string): void
        onQuestion(handler: QuestionHandler): void
        ask(introStr?: string, isIntro?: boolean): Promise<void>
        startAsking(intro: string): Promise<void>
    }

    // Retrieving
    type RetrievingResult = {
        documents: string[]
        forQuestion: string
    }

    // RAG
    type RagStepExecutor = (input: unknown) => Promise<unknown>

    interface RagSandbox {
        next(nextStep: RagSandbox): RagSandbox
        execute: RagStepExecutor
    }

    // Generating
    type PromptPlaceholder = {
        question: string,
        context: string,
    }

    // Search
    interface SearchEngine {
        search: (question: string) => Promise<string[]>
    }

    // Graph
    interface GraphData {
        retrieve: (question: string) => Promise<string[]>
        index: (question: string, docs: string[]) => Promise<void>
    }

    // LLM
    interface LargeLanguageModel {
        generate: (prompt: string) => Promise<string | undefined>
    }

    interface EnvService {
        getVar: (name: string) => string | never
    }
}
