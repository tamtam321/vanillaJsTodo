//_____________Selector____________________
// document.querySelector(): CSS selector által kijelölt HTML-ben első találat.
const todoInput = document.querySelector(".todo-input");
const addTodoButton = document.querySelector(".addTodo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//____________Event Listeners_______________
document.addEventListener("DOMContentLoaded", getTodos);
addTodoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkDelete);
filterOption.addEventListener("click", filterTodo);

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

    // ADD TODO  TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);

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

// Check & Delete Button Function
function checkDelete(e)
{
    // Store what I clicked on
    const item = e.target;

    // Check Mark
    if(item.classList[0] === "complete-btn")
    {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

    // Delete Todo
    if(item.classList[0] === "trash-btn")
    {
        const todo = item.parentElement;
        
        // Animation
        todo.classList.add("fall");

        // Delete from local storage
        removeLocalTodos(todo);

        // After the transition remove item
        todo.addEventListener("transitionend", function()
        {
            todo.remove();
        });
    }
}

// Filter List Function
function filterTodo(e)
{
    const todos = todoList.childNodes;
    todos.forEach(function(todo)
    {
        switch(e.target.value)
        {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed"))
                {
                    todo.style.display = "flex";
                }
                else
                {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed"))
                {
                    todo.style.display = "flex";
                }
                else
                {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

// Save items to local storage
function saveLocalTodos(todo)
{
    let todos;

    // Check if we already have an array in local storage. If not then we make an empty array, otherwise we access and save the local storage data in todos.
    if(localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    // We push the new data to our array and then push it back to local storage.
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// After refresh the page we query the data from local storage and update todo list.
function getTodos()
{
    let todos;

    // Check if we already have an array in local storage. If not then we make an empty array, otherwise we access and save the local storage data in todos.
    if(localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo)
    {
        // Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // Create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
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
    });
}

// Remove item from local storage
function removeLocalTodos(todo)
{
    let todos;

    // Check if we already have an array in local storage. If not then we make an empty array, otherwise we access and save the local storage data in todos.
    if(localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem("todos", JSON.stringify(todos));
}