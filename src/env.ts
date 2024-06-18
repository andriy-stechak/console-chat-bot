import { readFileSync } from 'node:fs'
import path from 'node:path'

export default (logger: ConsoleChatBot.Logger): ConsoleChatBot.EnvService => ({
    loadFromDotEnv: (): void => {
        const filePrefix = '.env'
        const nodeEnv = process.env.NODE_ENV || ''
        const filePath = path.resolve(`./${[filePrefix, nodeEnv.toLowerCase()].filter(Boolean).join('.')}`)

        try {
            const fileContent = (readFileSync(filePath)).toString() || ''
            for (const pair of fileContent.split('\n')) {
                logger.info(pair)
                const [name, value] = pair.split('=')
                if (name && value) {
                    process.env[name] = value
                }
            }

        } catch (error) {
            logger.warn('Unable to load environment variables from .env. Reason: ', error)
        }
    },
    getVar(name: string): string | never {
        if (!process.env[name]) {
            throw new Error(`Env variable ${name} is not specified`)
        }

        return String(process.env[name])
    },
})
