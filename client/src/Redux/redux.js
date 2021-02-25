const initialState = {
    todo : "",
    todoArray : []
}


let id = 0;

export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const CHANGE_TODO = 'CHANGE_TODO'
export const ON_CHANGE = 'ON_CHANGE'


//action
export const addTodo = () => {
    return {
    type : ADD_TODO,
}
}

export const deleteTodo = (id) => {
    return{
        type : DELETE_TODO,
        id
    }
}

export const changeTodo = (id, data) => {
    return{
        type : CHANGE_TODO,
        id,
        data
    }    
}

export const onChange = todo => {
    return {
        type : ON_CHANGE,
        data : todo
    }
}

//reducer
export const todoList = (state = initialState, action) => {
switch(action.type) {
    case ADD_TODO :
        
        return {
            ...state,
            todoArray : state.todoArray.concat({todo : state.todo, id : id++})
        }
    case DELETE_TODO :    
        return {
            ...state,
            todoArray : state.todoArray.filter(item => item.id !== action.id)
        }
    case CHANGE_TODO : 
    return {
        ...state,
        todoArray : state.todoArray.map(item => item.id === action.id ? {todo : action.data, id : action.id} : item)
    }
    case ON_CHANGE :
        return {
            ...state,
            todo : action.data
        }
    default :
    return state;
}
}