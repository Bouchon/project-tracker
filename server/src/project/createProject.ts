import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'

interface User {
    id: string
    name: string
}

interface Meta {
    id: string
    name: string
}

interface Project {
    id: string
    name: string
    description: string
    author: User
    metas: [Meta]
}

interface EventData {
    name: string
    description: string
    authorId: string
    metaIds: [string]
}

export default async (event: FunctionEvent<EventData>) => {
    console.log(event)

    try {
        const graphcool = fromEvent(event)
        const api = graphcool.api('simple/v1')
        const { name, description, authorId, metaIds } = event.data

        // get author by id
        const author: User = await getUserById(api, authorId).then(r => r.User)

        // no author found
        if (!author) {
            return { error: 'User not found!' }
        }

        // get metas
        const metas: [Meta] = await getMetasByIds(api, metaIds).then(r => r.Metas)

        // create new project
        const project = await createGraphcoolProject(api, name, description, author, metas)
    } catch (e) {
        console.log(e)
        return { error: 'An unexpected error occured during project creation' }
    }
}

async function getUserById(api: GraphQLClient, id: string): Promise<{ User }> {
    const query = `
        query getUserById($id: ID!) {
            User(id: $id) {
                id
                name
            }
        }
    `
  
    const variables = { id }
  
    return api.request<{ User }>(query, variables)
}

async function getMetasByIds(api: GraphQLClient, metaIds: [string]) : Promise<{ [Meta] }> {
    const query = `
        query getMetasByIds($ids: [ID!]!) {
            Meta
        }
    `
}

async function createGraphcoolProject(api: GraphQLClient, name: string, description: string, author: User, metas: [Meta]): Promise<string> {
    const mutation = `
      mutation createGraphcoolProject($name: String!, $description: String!, $author: User!, $metas: [Meta!]!) {
        createProject(
            name: $name,
            description: $description,
            author: $author,
            metas: $metas
        ) {
          id
        }
      }
    `
  
    const variables = { name, description, author, metas }
  
    return api.request<{ createProject: Project }>(mutation, variables)
        .then(r => r.createProject.id)
  }