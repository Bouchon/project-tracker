import { combineReducers } from 'redux'
import login from './login'
import project from './project'
import task from './task'

const root = combineReducers({ login, project, task })
export default root