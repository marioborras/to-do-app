"use strict"

//read existing notes from localStorage
const getSavedTodos = () =>{
    //check for existing saved data
    const todosJSON = localStorage.getItem("todos")
    try {
            //todosJSON !== null rewritten with falsy
        return todosJSON  ?  JSON.parse(todosJSON) : []
    } catch (error) {
        return []
    }
    
}

const toggleTodos = () =>{
     
}
//save the todos to local storage
const saveTodos = (todos) =>{
    localStorage.setItem("todos", JSON.stringify(todos))
}

const removeTodo = (id) =>{
    const todoIndex = todos.findIndex(todo =>  todo.id === id)
    if (todoIndex > -1) {
        todos.splice(todoIndex,1)
    }
}
//toggle the completed value for a given to do
const toggleTodo = (id)  =>{
    const todo = todos.find(todo => todo.id == id)
    //if todo !== undefined) rewritten in falsy
    if (todo){
        todo.completed = !todo.completed
    }
}

// const completedTodo = function (id){
//     const completedIndex = todos.findIndex(function(todo){
//         return todo.id === id
//     })
//     if (completedIndex  > -1){
//         console.log("true")
//         todo.completed = true
//     }
// }
//generate the DOM Structure for a todo

const generateToDoDOM = (todo) => {
    const todoEl = document.createElement("div")
    const checkBox = document.createElement("input")
    checkBox.checked = todo.completed
    const todoText = document.createElement("span")
    const removeButton = document.createElement("button")
    //setup todo checkbox
    checkBox.setAttribute("type","checkbox")
    checkBox.addEventListener("change", () =>{
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
    })
    todoEl.appendChild(checkBox)

    //setup remove button
    removeButton.textContent= 'x'
    removeButton.addEventListener("click", () =>{
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
    })
    //setup the to do text
    todo.text.length > 0 ? todoText.textContent = todo.text : todoText.textContent = "unnamed note"

    todoEl.appendChild(todoText)
    todoEl.appendChild(removeButton)

    
    return todoEl
}

//summary message
const generateSummaryDOM =  (incompleteTodos) => {
    const heading = document.createElement("H1")
    if (incompleteTodos.length > 1 || incompleteTodos.length === 0 ){
        heading.textContent = `You have ${incompleteTodos.length} todos left`

    }else {
        heading.textContent = `You have ${incompleteTodos.length} thing todo`
    }
    return heading
}
//Render application todos


const renderTodos = (todos, filters) =>{
    const todoEl = document.querySelector("#todos")

    const filteredTodos = todos.filter((todo) => {
        return filters.hideCompleted ? !todo.completed && todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) : todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    
    })
    const incompleteTodos = filteredTodos.filter(todo =>  !todo.completed)

    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(incompleteTodos))

    if (filteredTodos.length > 0){
        filteredTodos.forEach(todo => { 
            todoEl.appendChild(generateToDoDOM(todo))     
        })
    }else {
        const message = document.createElement("P")
        message.classList.add("empty-message")
        message.textContent = "No to-dos to show"
        todoEl.appendChild(message)
    }
} 

