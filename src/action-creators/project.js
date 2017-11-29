export const ADD = '@@PROJECT_ADD'
export const UPDATE = '@@PROJECT_UPDATE'
export const DELETE = '@@PROJECT_DELETE'

export function addProject (project) {
    return {
        type: ADD,
        payload: project
    }
}

export function updateProject (project) {
    return {
        type: UPDATE,
        payload: project
    }
}

export function deleteProject (id) {
    return {
        type: DELETE,
        payload: { id }
    }
}