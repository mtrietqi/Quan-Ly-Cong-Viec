import {combineReducers} from 'redux';
import taskListReducer from './taskList';
import isAddNewTaskReducer from './isAddNewTask';
import taskReducer from './task'
const rootReducer = combineReducers({
    taskListReducer,
    isAddNewTaskReducer,
    taskReducer
})

export default rootReducer;