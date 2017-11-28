import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'

interface User {
    id: string
    name: string
    email: string
}

interface Project {
    id: string
    author: User
    name: string
}

interface EventData {
    authorEmail: string
    name: string
}

export default async (event: FunctionEvent<EventData>) => {
    console.log(event)

    try {
        const graphcool = fromEvent(event)
        const api = graphcool.api('simple/v1')
        const { authorEmail, name } = event.data

        // get author by email
        const author: User = await getUserByEmail(api, authorEmail).then(r => r.User)

        // no author found
        if (!author) {
            return { error: 'User not found!' }
        }

        // create new project
        const project = await createGraphcoolProject(api, author, name)
    } catch (e) {
        console.log(e)
        return { error: 'An unexpected error occured during project creation' }
    }
}

async function getUserByEmail(api: GraphQLClient, email: string): Promise<{ User }> {
    const query = `
        query getUserByEmail($email: String!) {
            User(email: $email) {
                id
                name
                email
            }
        }
    `
  
    const variables = {
      email,
    }
  
    return api.request<{ User }>(query, variables)
}

async function createGraphcoolProject(api: GraphQLClient, author: User, name: string): Promise<string> {
    const mutation = `
      mutation createGraphcoolProject($author: User!, $name: String!) {
        createProject(
          author: $author,
          name: $name
        ) {
          id
        }
      }
    `
  
    const variables = {
      author,
      name
    }
  
    return api.request<{ createProject: Project }>(mutation, variables)
        .then(r => r.createProject.id)
  }