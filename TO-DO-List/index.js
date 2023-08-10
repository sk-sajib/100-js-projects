
const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
clearBtn = document.querySelector(".clear-btn");

const taskBox = document.querySelector(".task-box");

let editId;
isEditTask = false;


// getting localStorage todo list
let todo = JSON.parse(localStorage.getItem("todo-list"))
console.log(todo)


// Filter Tasks Listener
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id)
    })
})


// Show todo task function
function showTodo(filter) {
    let li = ""
    if(todo) {
        todo.forEach((todo, id) => {
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all") {
                li += `<li class="task">
            <label for="${id}">
                <input onclick = "updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                <p class='${isCompleted}'>${todo.name}</p>
            </label>
            <div class="settings">
                <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                <ul class="task-menu">
                    <li onclick = "editTask(${id}, '${todo.name}')"><i class="fa-solid fa-pen-to-square"></i>Edit</li>
                    <li onclick = "deleteTask(${id})"><i class="fa-solid fa-trash"></i>Delete</li>
                </ul>
            </div>
            </li>`
            }
            
        })
    
    }
    taskBox.innerHTML = li || `<span>There has nothing to display </span>`;
}

showTodo("all")


function showMenu(selectedTask) {

    let taskName = selectedTask.parentElement.lastElementChild
    taskName.classList.add("show");

    // Remove menu while clicking on the document
    document.addEventListener("click", (e) => {

        if(e.target != selectedTask) {
            taskName.classList.remove("show")
        }
    })
}

function deleteTask(deleteId) {
   todo.splice(deleteId, 1);
   localStorage.setItem("todo-list", JSON.stringify(todo))
   showTodo("all")
   
}

// clear all task btn listener

clearBtn.addEventListener("click", () => {
    todo.splice(0, todo.length);
    localStorage.setItem("todo-list", JSON.stringify(todo))
    showTodo("all")
})

function editTask(taskId, taskName) { 
   editId = taskId;
   isEditTask = true;
   taskInput.value = taskName;

}


function updateStatus(selectedTask) {

    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked")

        // update selected item status to completed
        todo[selectedTask.id].status = "completed";

    } else{
        taskName.classList.remove("checked")

        // update selected item status to pending
        todo[selectedTask.id].status = "pending";
    }
    
    localStorage.setItem("todo-list", JSON.stringify(todo))
}


taskInput.addEventListener("keyup", (e) => {
    let userTask = taskInput.value.trim()
    if(e.key == "Enter" && userTask) {
       if(!isEditTask) { // if edit task isn't true
            if(!todo) { // if todo isn't exist pass an empty array to todo
                todo = []
            }
        let taskInfo = { name: userTask, status: "pending"};
        todo.push(taskInfo);

       } else{
            isEditTask = false;
            todo[editId].name = userTask
            console.log(userTask)
       }

        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todo));
        showTodo("all")
    }
})