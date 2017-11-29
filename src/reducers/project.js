import { ADD, UPDATE, DELETE } from '../action-creators/project'

export default function project(state = {}, action) {
    const { payload } = action
    switch (action.type) {
        case ADD:
            const addResult = { ...state, [payload.id]: { ...payload } }  
            return addResult
        
        case UPDATE:
            const updateResult = { ...state }
            result[payload.id] = { ...payload } 
            return updateResult

        case DELETE:
            const deleteResult = {}
            for (var i=0; i<Object.keys(state).length; i++) {
                const project = Object.values(state)[i]
                if (project.id !== id) {
                    deleteResult[project.id] = project
                }
            }
            return deleteResult

        default: return state
    }
}