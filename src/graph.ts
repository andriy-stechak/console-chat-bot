import neo4j, { Driver, Session, SessionMode } from 'neo4j-driver'

const getDriver = (): Driver => neo4j.driver('neo4j://localhost')
const getSession = (driver: Driver, accessMode: SessionMode): Session => {
    return driver.session({
        defaultAccessMode: accessMode,
    })
}

export default (): ConsoleChatBot.GraphData => ({
    index: async (question: string, docs: string[]): Promise<void> => {
        const driver = getDriver()
        const session = getSession(driver, neo4j.session.WRITE)

        await session.executeWrite(async txc => {
            await Promise.all(docs.map((doc: string) => txc.run(
                `MERGE (sd:SearchData {question : $question, doc: $doc}) RETURN sd.doc AS doc`,
                { question, doc }
            )))
        })

        await session.close()
        await driver.close()
    },
    retrieve: async (question: string): Promise<string[]> => {
        const driver = getDriver()
        const session = getSession(driver, neo4j.session.READ)

        const { records } = await session.executeRead(async tx => {
            return await tx.run(`
              MATCH (sd:SearchData) WHERE sd.question STARTS WITH $filter
              RETURN sd.doc AS doc
              `, { filter: question }
            )
        })
        await session.close()
        await driver.close()

        return records.map(record => record.get<string>('doc'))
    },
})
