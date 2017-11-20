export const ADD = '@@TASK_ADD'
export const UPDATE = '@@TASK_UPDATE'
export const DELETE = '@@TASK_DELETE'

export function addTask (task) {
    return {
        type: ADD,
        payload: { task }
    }
}

export function updateTask (task) {
    return {
        type: UPDATE,
        payload: { task }
    }
}

export function deleteTask (id) {
    return {
        type: DELETE,
        payload: { id }
    }
}