import {
    ADD,
    UPDATE,
    DELETE
} from '../action-creators/project'

export default function project(state = {}, action) {
    switch (action.type) {
        case ADD:
            {
                const {
                    project
                } = action.payload
                let max = 0
                for (var i = 0; i < Object.values(state).length; i++) {
                    const id = Object.values(state)[i].id
                    max = Math.max(max, id)
                }
                project.id = max + 1
                return { ...state,
                    [project.id]: { ...project
                    }
                }
            }

        case UPDATE:
            {
                const {
                    project
                } = action.payload
                if (state[project.id] !== undefined) {
                    let result = { ...state
                    }
                    result[project.id] = { ...project
                    }
                    return result
                } else {
                    throw new Error('Project not found (id=' + id + ')')
                }
            }

        case DELETE:
            {
                const {
                    id
                } = action.payload
                let result = {}
                for (var i = 0; i < Object.values(state).length; i++) {
                    const project = Object.values(state)[i]
                    if (project.id !== id) {
                        result[project.id] = project
                    }
                }
                return result
            }

        default:
            return state
    }
}