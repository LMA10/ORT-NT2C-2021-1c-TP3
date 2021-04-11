const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}


const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

const arrayTareas = [];

class Tarea {
  constructor(titulo){
    this.titulo = titulo;
    this.terminada = false;
  }
}

function addNewTask(task){
  let newTask;
  try {
    newTask = new Tarea(task);
    arrayTareas.push(newTask);
  } catch (error) {
    alert("Error al intentar agregar la nueva tarea " + error);
  }
}

function renderCounter(){
  return arrayTareas.length;
}

function togglebox(event) {
  this.terminada = event.target.checked
  Render();
}

function addTodo() {

  let newTask = requestNewTask();
  addNewTask(newTask);

  Render();
}

function Render(){

  list.innerHTML = "";

  arrayTareas.map((task) => {


    const cb = document.createElement('input')
    const li = document.createElement('li')
    cb.type = 'checkbox'
    cb.className = classNames.TODO_CHECKBOX
    cb.checked = task.terminada
    cb.onchange = togglebox.bind(task)
   
    itemCountSpan.innerHTML = renderCounter();
    const span = document.createElement('span')
    span.className = classNames.TODO_TEXT
    span.innerHTML = task.titulo
  
    li.className = classNames.TODO_ITEM
    li.appendChild(span)
    li.appendChild(cb)
    list.appendChild(li);

  })

  RenderUncheked();
}


function RenderUncheked(){
  itemCountSpan.innerHTML = renderCounter();
  let unchecked = 0
  arrayTareas.map((task)=> {
      if (!task.terminada){
        unchecked++;
      }
  })
  uncheckedCountSpan.innerHTML = unchecked;
}

const requestNewTask = () => {
  return prompt('Ingrese nueva tarea:');
}
