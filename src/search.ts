import { customsearch } from '@googleapis/customsearch'

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const GOOGLE_SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID
const searchEngine = customsearch({ version: 'v1', auth: GOOGLE_API_KEY })

export const google: ConsoleChatBot.SearchEngine = {
    search: async (question: string): Promise<string[]> => {

        const { data: { items } } = await searchEngine.cse.list({
            q: `${question}`,
            cx: GOOGLE_SEARCH_ENGINE_ID,          
        })

        return (items || []).map(({ snippet, title }) => `${title}${snippet}`)
    }
}

