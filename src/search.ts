import { customsearch } from '@googleapis/customsearch'

export default (env: ConsoleChatBot.EnvService): ConsoleChatBot.SearchEngine => {

    const GOOGLE_API_KEY = env.getVar('GOOGLE_API_KEY')
    const GOOGLE_SEARCH_ENGINE_ID = env.getVar('GOOGLE_SEARCH_ENGINE_ID')
    const searchEngine = customsearch({ version: 'v1', auth: GOOGLE_API_KEY })

    return {
        search: async (question: string): Promise<string[]> => {

            const { data: { items } } = await searchEngine.cse.list({
                q: `${question}`,
                cx: GOOGLE_SEARCH_ENGINE_ID,
            })

            return (items || []).map(({ snippet, title }) => `${title}${snippet}`)
        }
    }
}
