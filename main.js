"use strict"
const todos = getSavedTodos()
const filters  = {
    searchText:"",
    hideCompleted: false
}
// check for existing data


  


renderTodos(todos,filters)

document.querySelector("#search-text").addEventListener("input", (e) =>{
    filters.searchText = e.target.value
    renderTodos(todos,filters)
})
document.querySelector("#to-do-form").addEventListener("submit", (e) =>{
    const text = e.target.elements.text.value.trim()
    e.preventDefault()

    if (text.length > 0) {
        todos.push({
            id: uuidv4(),
            //es6 version - if property is same name as key
            text,
             completed: false
         })
    }
    e.target.elements.text.value = ""
    saveTodos(todos)
    renderTodos(todos,filters)
})

document.querySelector("#hide-completed").addEventListener("change", (e) =>{
    filters.hideCompleted = e.target.checked
    renderTodos(todos,filters)
     })
