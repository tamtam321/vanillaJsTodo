//_____________Selector____________________
// document.querySelector(): CSS selector által kijelölt HTML-ben első találat.
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".addTodo-button");
const todoList = document.querySelector(".todo-list");

//____________Event Listeners_______________
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

//____________Functions_____________________
function addTodo(event)
{
    // Prevent form from submitting.
    event.preventDefault();
    
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // CHECK MARK BUTTON
    const completeButton = document.createElement("button");
    completeButton.innerHTML = "<i class='fas fa-check'></i>";
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    // CHECK TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // APPEND TO LIST
    todoList.appendChild(todoDiv);

    // Clear Todo INPUT VALUE
    todoInput.value = "";
}

// Delete Button Function
function deleteCheck(e)
{
    // Store what I clicked on
    const item = e.target;

    // Delete Todo
    if(item.classList[0] === "trash-btn")
    {
        const todo = item.parentElement;
        todo.classList.add("fall");
        todo.remove();
    }

    // Check Mark
    if(item.classList[0] === "complete-btn")
    {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}