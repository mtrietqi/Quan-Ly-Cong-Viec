
const isAddNewTaskReducer = (state = true, action) => {
    switch (action.type) {
        case 'ADD_TO_EDIT':
            let isAddToEdit= false
            return isAddToEdit;
        case 'EDIT_TO_ADD':
            isAddToEdit= true
            return isAddToEdit;
        default:
            break;
    }
    return state;
}
export default isAddNewTaskReducer;