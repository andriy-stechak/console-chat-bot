export default (): ConsoleChatBot.EnvService => ({
    getVar(name: string): string | never {
        if (!process.env[name]) {
            throw new Error(`Env variable ${name} is not specified`)
        }

        return String(process.env[name])
    },
})
