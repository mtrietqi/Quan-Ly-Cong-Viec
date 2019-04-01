// redux thunk: function co the xu ly logic + return object

// redux binh thuong: function tra ve 1 object
export const addTask = (task) => {
    return {
        type: 'ADD_TASK',
        task,
        // payload: task
    }
}
export const editTask= (task) =>{
    return{
        type: 'EDIT_TASK',
        task,
    }
}

export const convertAddToEdit=()=>{
    return{
        type: 'ADD_TO_EDIT'
    }
}

export const convertEditToAdd=()=>{
    return{
        type: 'EDIT_TO_ADD'
    }
}

export const getTask=(task)=>{
    return{
        type:'GET_TASK',
        task
    }
}
export const filterTask=(filterType, filterValue)=>{
    return{
        type:'FILTER_TASK',
        filterType,
        filterValue,
    }
}

export const deleteTask = (task) => {
    return {
        type: 'DELETE_TASK',
        task,
        // payload: task
    }
}

export const moveCard = (dragIndex, hoverIndex) => {
    return {
        type: 'MOVE_CARD',
        dragIndex,
        hoverIndex,
        // payload: task
    }
}
