const taskReducer=(state={},action)=>{
    switch (action.type) {
        case 'GET_TASK':
            const task={...action.task}
            return task
    
        default:
            break;
    }
    return state
}
export default taskReducer;