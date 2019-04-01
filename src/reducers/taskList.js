const initialTask = localStorage && localStorage.tasks ? JSON.parse(localStorage.getItem('tasks')) : []
const initialState = {
    tasks: initialTask,
    filteredArr: initialTask,
}

const taskListReducer = (state = initialState, action) => {
    // ...
    switch (action.type) {
        case 'ADD_TASK':
            // B1: task = action.task
            // B2: lay data tu LS: state
            // B3: 
            //cach 1
            // const newState = state.concat(action.task)
            // cach 2
            const taskList = [...state.tasks, action.task]
            // B4: day len localStorage
            // localStorage.setItem('tasks', JSON.stringify(newState))
            localStorage.setItem('tasks', JSON.stringify(taskList))
            // B5: return state
            return { ...state, tasks: taskList, filteredArr: taskList };
        case 'DELETE_TASK':
            const taskListDelete = state.tasks.filter(task => task.id !== action.task.id)
            localStorage.setItem('tasks', JSON.stringify(taskListDelete))
            return { ...state, tasks: taskListDelete, filteredArr: taskListDelete };
        case 'MOVE_CARD':
            const taskListMove= [...state.tasks]
            const dragCard = taskListMove[action.dragIndex]
            taskListMove.splice(action.dragIndex, 1); // removing what you are dragging.
            taskListMove.splice(action.hoverIndex, 0, dragCard);
            return {...state,tasks: taskListMove ,filteredArr: taskListMove}
            
        case 'EDIT_TASK':
            const taskListEdit = [...state.tasks]
            const taskListFilter = [...state.filteredArr]
            const index = taskListFilter.findIndex(elm => elm.id === action.task.id);
            taskListEdit[index] = action.task
            taskListFilter[index] = action.task
            localStorage.setItem('tasks', JSON.stringify(taskListEdit));
            console.log(taskListEdit)
            return { ...state, tasks: taskListEdit, filteredArr: taskListFilter };

        case 'FILTER_TASK':
            const stateTemp = [...state.tasks]
            switch (action.filterType) {
                case 'FILTER_STATUS':
                    const filterStatus = stateTemp.filter(element => {
                        return element.status === action.filterValue
                    })
                    return { ...state, filteredArr: filterStatus }

                case 'FILTER_LABEL':
                    const filterLabel = stateTemp.filter(element => {
                        return element.labelArr.includes(action.filterValue)
                    })
                    return { ...state, filteredArr: filterLabel }

                default:
                    return state;
            }
        default:
            return state;
    }
}

export default taskListReducer;