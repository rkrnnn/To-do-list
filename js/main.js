console.log('main.js is loaded!');

var addTaskInput = document.querySelector("#inp-add");
var list = document.querySelector("#list-tasks");
var listDone = document.querySelector("#list-done-tasks");

var noTasksMsg = document.querySelector(".no-tasks-msg");
var noTasksMsgDone = document.querySelector(".done-list-no-tasks-msg");
var allTasksDoneMsg = document.querySelector(".done-list-all-done-msg");

var activeTasksNr = document.querySelector(".active-tasks-nr");
var totalTasksNr = document.querySelector(".total-tasks-nr");
var doneTasksNr = document.querySelector(".done-tasks-nr");

////////////////////////////////////////////////////////////////
/////// Overall interactions with tasks
////////////////////////////////////////////////////////////////

function getIndexofBtn(btnRef,childNr,list) {
    var index = 0;
    while ((index <= (list.childElementCount)) && (btnRef !== list.childNodes[index].firstChild.childNodes[childNr])) {
        index++;
    }

    return index;
}

// Add new task on enter in main input field
document.getElementById("inp-add")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("add-new-task-btn").click();
    }
});


////////////////////////////////////////////////////////////////
//////////  Edit Task components functions
////////////////////////////////////////////////////////////////


function editTaskOKCall(btnRef) {
    var divRef = btnRef.parentElement;
    var index = getIndexofBtn(divRef, 1, list);
    var editTaskInput = list.childNodes[index].firstChild.childNodes[1].firstChild;
    
    console.log('You want to edit this task. Current task: ' + listArr[index]);
    editTask(editTaskInput.value, index);
    
    list.childNodes[index].firstChild.childNodes[0].innerText = listArr[index];
    
    closeEditTaskCall(index);
}


function cancelEditTaskCall(btnRef) {
    var divRef = btnRef.parentElement;
    var index = getIndexofBtn(divRef, 1, list);

    closeEditTaskCall(index);
}


function openEditTaskCall(index) {
    list.childNodes[index].firstChild.childNodes[1].style.display = "";
    list.childNodes[index].firstChild.childNodes[0].style.display = "none";
    list.childNodes[index].firstChild.childNodes[2].className = "btn btn-outline-info btn-sm btn-edit disabled";
}


function closeEditTaskCall(index) {
    list.childNodes[index].firstChild.childNodes[1].style.display = "none";
    list.childNodes[index].firstChild.childNodes[0].style.display = "";
    list.childNodes[index].firstChild.childNodes[2].className = "btn btn-outline-info btn-sm btn-edit";
    list.childNodes[index].firstChild.firstChild.value = listArr[index];
}


////////////////////////////////////////////////////////////////
//////////  Edit DONE Task components functions
////////////////////////////////////////////////////////////////


function editDoneTaskOKCall(btnRef) {
    var divRef = btnRef.parentElement;
    var index = getIndexofBtn(divRef, 1, listDone);
    var editTaskInput = listDone.childNodes[index].firstChild.childNodes[1].firstChild;
    
    console.log('You want to edit this task. Current task: ' + listArrDone[index]);
    editDoneTask(editTaskInput.value, index);
    
    listDone.childNodes[index].firstChild.childNodes[0].innerText = listArrDone[index];
    
    closeEditDoneTaskCall(index);
}


function cancelEditDoneTaskCall(btnRef) {
    var divRef = btnRef.parentElement;
    var index = getIndexofBtn(divRef, 1, listDone);

    closeEditDoneTaskCall(index);
}


function openEditDoneTaskCall(index) {
    listDone.childNodes[index].firstChild.childNodes[1].style.display = "";
    listDone.childNodes[index].firstChild.childNodes[0].style.display = "none";
    listDone.childNodes[index].firstChild.childNodes[2].className = "btn btn-outline-info btn-sm btn-edit disabled";
}


function closeEditDoneTaskCall(index) {
    listDone.childNodes[index].firstChild.childNodes[1].style.display = "none";
    listDone.childNodes[index].firstChild.childNodes[0].style.display = "";
    listDone.childNodes[index].firstChild.childNodes[2].className = "btn btn-outline-info btn-sm btn-edit";
    listDone.childNodes[index].firstChild.firstChild.value = listArrDone[index];
}

////////////////////////////////////////////////////////////////
//////// Task Interaction Functions
////////////////////////////////////////////////////////////////

function editTaskCall(btnRef) {
    var index = getIndexofBtn(btnRef, 2, list);

    openEditTaskCall(index);

    console.log('You want to edit task nr ' + (index + 1));
}


function completeTaskCall(btnRef) {
    var index = getIndexofBtn(btnRef, 4, list);

    markTaskAsComplete(index);
    
    redrawListDone();
    redrawList();
    evaluateListsStatus();
    
    console.log('task completed!!!');
}


function deleteTaskCall(btnRef) {
    var index = getIndexofBtn(btnRef, 3, list);

    deleteTask(index);
    
    redrawList();
}


function editDoneTaskCall(btnRef) {
    var index = getIndexofBtn(btnRef, 2, listDone);

    openEditDoneTaskCall(index);

    console.log('You want to edit task nr ' + (index + 1));
}


function deleteDoneTaskCall(btnRef) {
    var index = getIndexofBtn(btnRef, 3, listDone);

    deleteDoneTask(index);
    
    redrawListDone();
}

////////////////////////////////////////////////////////////////
///////////////////////// Lists statuses, updates and display
///////////////////////////////////////////////////////////////

/// Adds new task to To Do List
function newTask() {
    if ((addTaskInput.value) && (addTaskInput.value.trim())) {
        noTasksMsg.style.display = 'none';

        addNewTask(addTaskInput.value);
        redrawList();
    }

    resetValue("#inp-add");
}

/// Updates empty list messages
function evaluateListsStatus() {
    // All tasks done
    if ((listArr.length == 0) && (listArrDone.length !== 0)) {
        allTasksDoneMsg.style.display = '';
        noTasksMsg.style.display = 'none';
        list.parentElement.parentElement.style.border = "2px solid #28a74559";
    }
    else {
        allTasksDoneMsg.style.display = 'none';
        noTasksMsg.style.display = 'none';
        list.parentElement.parentElement.style.border = "2px solid #dc354549";
    }

    // No tasks added
    if ((listArr.length == 0) && (listArrDone.length == 0)) {
        allTasksDoneMsg.style.display = 'none';
        noTasksMsg.style.display = '';
        list.parentElement.parentElement.style.border = "2px solid #b6effb";
    }
    // else {
    //     list.parentElement.parentElement.style.border = "1px solid #dc354549";
    // }

    // No done tasks
    if (!listArrDone.length){
        noTasksMsgDone.style.display = '';
        listDone.parentElement.parentElement.style.border = "2px solid #ffdd7a";
    }
    else {
        noTasksMsgDone.style.display = 'none';
        listDone.parentElement.parentElement.style.border = "2px solid #28a74559";
    }
}


/// Updates (x ouf of x) messages
function updateTaskNr() {
    activeTasksNr.innerText = listArr.length;
    totalTasksNr.innerText = listArrDone.length + listArr.length;
    doneTasksNr.innerText = listArrDone.length;
}


/// Empties 'Add new task' field
function resetValue(id) {
    document.querySelector(id).value = '';
}


/// Redraws To Do list based on listArr
function redrawList() {
    var array = listArr;
    var list_destination = list;

    /// Delete currently drawn list
    while (list_destination.firstChild) {
        list_destination.removeChild(list_destination.firstChild);
    }

    /// Generate new list
    var i = 0;
    while (i < array.length) {

        //////// Create task interaction buttons

        var editTaskBtn = document.createElement("BUTTON");
        var textEditBtn = document.createTextNode('🖉');
        editTaskBtn.appendChild(textEditBtn);
        editTaskBtn.className = "btn btn-outline-info btn-sm btn-edit";
        editTaskBtn.addEventListener("click", function(event){
            editTaskCall(event.target)
        });

        var finishedTaskBtn = document.createElement("BUTTON");
        var textFinishedBtn = document.createTextNode('✓');
        finishedTaskBtn.appendChild(textFinishedBtn);
        finishedTaskBtn.className = "btn btn-outline-success btn-sm btn-done";
        finishedTaskBtn.addEventListener("click", function(event){
            completeTaskCall(event.target);
        });

        var deleteTaskBtn = document.createElement("BUTTON");
        var textDeleteBtn = document.createTextNode('x');
        deleteTaskBtn.appendChild(textDeleteBtn);
        deleteTaskBtn.className = "btn btn-outline-danger btn-sm btn-delete";
        deleteTaskBtn.addEventListener("click", function(event){
            deleteTaskCall(event.target)
        });

        ////////Edit Task component structure creation////// 

        var editTaskComponent = document.createElement("DIV");
        editTaskComponent.className = "input-group edit-task-comp";
        editTaskComponent.style.display = "none";

        var editTaskField = document.createElement("INPUT");
        editTaskField.value = array[i];
        editTaskField.className = "form-control";
        editTaskField.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                editTaskOKCall(event.target);
            }
            });

        var editTaskBtnOK = document.createElement("BUTTON");
        var textEditTaskBtnOK = document.createTextNode('OK');
        editTaskBtnOK.className = "btn btn-outline-secondary";
        editTaskBtnOK.appendChild(textEditTaskBtnOK);
        editTaskBtnOK.addEventListener("click", function(event){
            editTaskOKCall(event.target)
            });
        

        var editTaskBtnCancel = document.createElement("BUTTON");
        var textEditTaskBtnCancel = document.createTextNode('Cancel');
        editTaskBtnCancel.className = "btn btn-outline-secondary";
        editTaskBtnCancel.appendChild(textEditTaskBtnCancel);
        editTaskBtnCancel.addEventListener("click", function(event){
            cancelEditTaskCall(event.target)
            });

        editTaskComponent.appendChild(editTaskField);
        editTaskComponent.appendChild(editTaskBtnOK);
        editTaskComponent.appendChild(editTaskBtnCancel);

        ////////////////////////////////
        
        var newItemDiv = document.createElement("DIV");
        newItemDiv.className = "new-item-div";

        var newItem = document.createElement("LI"); 

        newItem.appendChild(newItemDiv);
        list_destination.appendChild(newItem);  
        
        var textNode = document.createTextNode(array[i]);
        var taskTextSpan = document.createElement("SPAN");
        taskTextSpan.className = "task-text";
        taskTextSpan.appendChild(textNode);

        newItemDiv.appendChild(taskTextSpan);
        newItemDiv.appendChild(editTaskComponent);
        newItemDiv.appendChild(editTaskBtn);
        newItemDiv.appendChild(deleteTaskBtn);
        newItemDiv.appendChild(finishedTaskBtn);

        i++;
    }

    updateTaskNr();
    evaluateListsStatus();
}


/// Redraw Done Tasks List based on listArrDone
function redrawListDone() {
    var array = listArrDone;
    var list_destination = listDone;

    while (list_destination.firstChild) {
        list_destination.removeChild(list_destination.firstChild);
    }

    var i = 0;
    while (i < array.length) {

        //////// Create task interaction buttons

        var editTaskBtn = document.createElement("BUTTON");
        var textEditBtn = document.createTextNode('🖉');
        editTaskBtn.appendChild(textEditBtn);
        editTaskBtn.className = "btn btn-outline-info btn-sm btn-edit";
        editTaskBtn.addEventListener("click", function(event){
            editDoneTaskCall(event.target)
        });

        var deleteTaskBtn = document.createElement("BUTTON");
        var textDeleteBtn = document.createTextNode('x');
        deleteTaskBtn.appendChild(textDeleteBtn);
        deleteTaskBtn.className = "btn btn-outline-danger btn-sm btn-delete";
        deleteTaskBtn.addEventListener("click", function(event){
            deleteDoneTaskCall(event.target)
        });

        ////////Edit Task component structure creation////// 

        var editTaskComponent = document.createElement("DIV");
        editTaskComponent.className = "input-group edit-task-comp";
        editTaskComponent.style.display = "none";

        var editTaskField = document.createElement("INPUT");
        editTaskField.value = array[i];
        editTaskField.className = "form-control";
        editTaskField.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                editDoneTaskOKCall(event.target);
            }
            });

        var editTaskBtnOK = document.createElement("BUTTON");
        var textEditTaskBtnOK = document.createTextNode('OK');
        editTaskBtnOK.className = "btn btn-outline-secondary";
        editTaskBtnOK.appendChild(textEditTaskBtnOK);
        editTaskBtnOK.addEventListener("click", function(event){
            editDoneTaskOKCall(event.target)
            });

        var editTaskBtnCancel = document.createElement("BUTTON");
        var textEditTaskBtnCancel = document.createTextNode('Cancel');
        editTaskBtnCancel.className = "btn btn-outline-secondary";
        editTaskBtnCancel.appendChild(textEditTaskBtnCancel);
        editTaskBtnCancel.addEventListener("click", function(event){
            cancelEditDoneTaskCall(event.target)
            });

        editTaskComponent.appendChild(editTaskField);
        editTaskComponent.appendChild(editTaskBtnOK);
        editTaskComponent.appendChild(editTaskBtnCancel);

        ////////////////////////////////

        var newItemDiv = document.createElement("DIV");
        newItemDiv.className = "new-item-div";

        var newItem = document.createElement("LI");  
        list_destination.appendChild(newItem);  
        newItem.appendChild(newItemDiv);
        
        var textNode = document.createTextNode(array[i]);
        var taskTextSpan = document.createElement("SPAN");
        taskTextSpan.className = "task-text";
        taskTextSpan.appendChild(textNode);

        newItemDiv.appendChild(taskTextSpan);
        newItemDiv.appendChild(editTaskComponent);
        newItemDiv.appendChild(editTaskBtn);
        newItemDiv.appendChild(deleteTaskBtn);

        i++;
    }

    updateTaskNr();
    evaluateListsStatus();

}


/// Resets and empties both lists
function clearListView() {
    clearAllTasksfromArr();

    redrawListDone();
    redrawList();
    resetValue("#inp-add");
}
