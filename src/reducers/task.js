import {
    ADD,
    UPDATE,
    DELETE
} from '../action-creators/task'

export default function task(state = {}, action) {
    switch (action.type) {
        case ADD:
            {
                const {
                    task
                } = action.payload
                task.name = task.name === undefined ? '' : task.name
                task.description = task.description === undefined ? '' : task.description

                let max = 0
                for (var i = 0; i < Object.values(state).length; i++) {
                    const id = Object.values(state)[i].id
                    max = Math.max(max, id)
                }
                const newId = max + 1
                return { ...state,
                    [newId]: { ...task,
                        id: newId
                    }
                }
            }

        case UPDATE:
            {
                const {
                    task
                } = action.payload
                if (state[task.id] !== undefined) {
                    let result = { ...state
                    }
                    result[task.id] = task
                    return result
                } else {
                    throw new Error('Task not found (id=' + id + ')')
                }
            }

        case DELETE:
            {
                let result = {}
                for (var i = 0; i < Object.values(state).length; i++) {
                    const task = Object.values(state)[i]
                    if (task.id !== action.payload.id) {
                        result[task.id] = task
                    }
                }
                return result
            }

        default:
            return state
    }
}