let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

//console.log('Working');

function createListDOM(task) {
    const listItem = document.createElement('li');
  
    listItem.innerHTML = `
      <input type="checkbox" id="${task.id}" class="custom-checkbox" ${task.done ? 'checked' : ''}> 
      <label for="${task.id}">${task.text}</label> 
      <img src="bin.png" class="delete" data-id="${task.id}" />`;

      /* The sign surrounding the above 3 tags is `[backtick].
      It is used in programming languages to denote code blocks */

    tasksList.append(listItem);
}

function renderList () {
    tasksList.innerHTML='';
    for(let i=0;i<tasks.length;i++){
        createListDOM(tasks[i]);
    }
    tasksCounter.innerHTML=tasks.length;
}


function toggleTask (taskId) {
    let taskdone=tasks.filter(function(task){    // .filter() returns array
        return task.id===taskId;
    });

    if(taskdone.length>0){                        //task to be toggled will be at index 0 of the array 'taskdone'
        if(!taskdone[0].done){
            taskdone[0].parentElement.style.backgroundColor = "cyan";
        }
        taskdone[0].done= !taskdone[0].done;
        renderList();
        // showNotification("Task toggled successfully!");
        return;
    }

    showNotification("Could not toggle task");
}


function deleteTask (taskId) {
    let newtask=tasks.filter(function(task){
        return task.id!==taskId;
    });
    tasks=newtask;
    renderList();
    
    if(tasks.length===0){
        showNotification("Hurray!! All tasks completed successfully");
        document.getElementById("over").style.width="100px";
        setTimeout(()=>{
            document.getElementById("over").style.width="0px";
        },2500);
    }
    else{
        showNotification("Task completed successfully");
        document.getElementById("gif").style.width="100px";
        setTimeout(()=>{
            document.getElementById("gif").style.width="0px";
        },1500);
    }
}


function addTask (task) {
    if(task){
        tasks.push(task);
        //gif get's triggered only when more than 15 tasks are added.
        if(tasks.length>15){
            showNotification("Wow! more than 15 tasks, this is going to be a long day.")
            document.getElementById("many").style.width="100px";
            setTimeout(()=>{
                document.getElementById("many").style.width="0px";
            },2000);
        }
        renderList();
        // showNotification("Task added successfully");
        return;
    }
    showNotification("Task cannot be added");
}


function showNotification(text) {
    alert(text);
}


function keyPressed(e){
    if(e.key=='Enter'){

        let text = e.target.value; //The 'target' property of the e object refers to the DOM element that triggered the event.

        if(!text){
            showNotification("Task must contain text!")
            return;
        }

        const task={
           text:text,
           id:Date.now().toString(),
           done : false
        }
        e.target.value='';
        addTask(task);
    }
    
}

function checkTagClass(e){
    const target=e.target;
    if(target.className=='delete'){
        const taskID=target.dataset.id; 
        //in <img> there is data-id attribute. This 'data' creates dataset in JS. 'id' is basically name for the value stored. It can be anything.
        deleteTask(taskID);
        return;
    }
    else if(target.className=='custom-checkbox'){
        const taskID=target.id;
        toggleTask(taskID);
        return;
    }
}


function startApplication(){
    addTaskInput.addEventListener('keyup',keyPressed);
    document.addEventListener('click', checkTagClass);
}

startApplication();