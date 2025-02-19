const list = JSON.parse(localStorage.getItem("list"));
const listElement = document.getElementById("task-list");
const taskInput = document.getElementById("task_input");

render();

function render(){
    listElement.innerText = null;
    localStorage.setItem("list",JSON.stringify(list))
    list.forEach(el=> {
        const newTask = document.createElement("li"); 
        newTask.setAttribute("class", " item");

        const taskSpan = document.createElement("span");
        taskSpan.setAttribute("class", (el.done ? "done" : "in-progress"))

        const taskText = document.createTextNode(el.title + " ");
        taskSpan.appendChild(taskText); 
        newTask.appendChild(taskSpan);

        const doneButton = document.createElement("button");
        doneButton.setAttribute("id", el.id+"done");
        doneButton.setAttribute("class","done-button");

        const buttonText = document.createTextNode("Done");
        doneButton.appendChild(buttonText);

        newTask.appendChild(doneButton);

        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("id", el.id+"delete");
        deleteButton.setAttribute("class","delete-button");

        const buttonTextForDelete = document.createTextNode("Delete");
        deleteButton.appendChild(buttonTextForDelete);

        newTask.appendChild(deleteButton);

        listElement.appendChild(newTask);
    });
}

listElement.addEventListener("click", (event)=>{
    if( event.target.nodeName === "BUTTON"){
        for(let i = 0; i < list.length; i++){
            if(list[i].id + "done" === event.target.id){
                list[i].done = !list[i].done;
            }
            else if(list[i].id + "delete" === event.target.id){
                list.splice(i, 1);
                break;
            }
        }
        render();
    }
});


function addToList(){
    let newTaskTitle = taskInput.value;
    list.push(
        {
            id:Math.random()+"",
            title: newTaskTitle,
            done: false,
        });
    taskInput.value = '';
    render();
}

