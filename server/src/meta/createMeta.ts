import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'

interface Meta {
    id: string
    name: string
}
interface EventData {
    name: string
}

export default async (event: FunctionEvent<EventData>) => {
    console.log(event)

    try {
        const graphcool = fromEvent(event)
        const api = graphcool.api('simple/v1')
        const { name } = event.data
        const meta = await createGraphcoolMeta(api, name)
    } catch (e) {
        return { error: 'An unexpected error occured during project creation' }
    }
}

async function createGraphcoolMeta(api: GraphQLClient, name: string) {
    const mutation = `
        mutation createGraphcoolMeta($name: String!){
            createMeta(name: $name) { id } 
        }
    `

    const variables = { name }
    return api.request<{ createMeta: Meta }>(mutation, variables)
        .then(r => r.createMeta.id)
}