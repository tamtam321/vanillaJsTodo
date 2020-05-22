//_____________Selector____________________
// document.querySelector(): CSS selector által kijelölt HTML-ben első találat.
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//____________Event Listeners_______________
todoButton.addEventListener("click", addTodo);

//____________Functions_____________________
function addTodo(event)
{
    // Prevent form from submitting.
    event.preventDefault();
    
    
}