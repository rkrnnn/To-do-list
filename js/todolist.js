
console.log('todolist.js is loaded');

var listArr = [];
var listArrDone = [];


function addNewTask(taskName) {
    listArr.push(taskName);
}

function deleteTask(index) {
    listArr.splice(index,1);
}

function deleteDoneTask(index) {
    listArrDone.splice(index,1);
}


function markTaskAsComplete(index) {
    listArrDone.push(listArr[index]);
    listArr.splice(index,1);
}


function editTask(input, index) {
    console.log('Succes! Task nr ' + (index + 1) + ' has been edited. New task is: ' + input);

    listArr[index] = input;
}

function editDoneTask(input, index) {
    console.log('Succes! Finished Task nr ' + (index + 1) + ' has been edited. New finished task is: ' + input);

    listArrDone[index] = input;
}


function clearAllTasksfromArr() {
    listArr.splice(0, listArr.length);
    listArrDone.splice(0, listArrDone.length);
}

