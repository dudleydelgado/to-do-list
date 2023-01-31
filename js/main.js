const date = document.querySelector('#date');
const list = document.querySelector('#list');
const input = document.querySelector('#input');
const enterButton = document.querySelector('#enter');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let id
let LIST
let personName = document.querySelector('#namePerson');





//Function date

const DATE = new Date()
date.innerHTML = DATE.toLocaleDateString('es', {weekday:'long', month:'short', day:'numeric'})

//function addTask

function addTask(task, id, completed, removed){

if(removed){
    return
}

const COMPLETED = completed ? check : uncheck
const LINE = completed ? lineThrough : ''

    const element = `
    <li id='element'>
        <i class="far fa-circle co${COMPLETED}" data="completed" id="${id}"></i>
        <p class="text ${LINE}">${task}</p>
        <i class="fas fa-trash de" data="removed" id="${id}"></i>
    </li>
    `
    //Si queremos que se muestren las tareas mas nuevas primero de arriba hacia abajo usamos 'afterbegin'
    list.insertAdjacentHTML('beforeend', element)
}

// completedTask

function completedTask(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    //parentnode se usa para leer el elemento padre de el elemento en cuestion
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].completed = LIST[element.id].completed ? false : true
}

function removedTask(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].removed = true
}

enterButton.addEventListener('click', () =>{
    const task = input.value
    if(task){
        addTask(task, id, false, false)
        LIST.push({
            name: task,
            id: id,
            completed: false,
            removed: false
        })
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
    input.value = ''
    id++
})

document.addEventListener('keyup', function(event){
    if(event.key=='Enter'){
        const task = input.value
        if(task){
            addTask(task, id, false, false)
            LIST.push({
                name: task,
                id: id,
                completed: false,
                removed: false
            })
        }
        localStorage.setItem('TODO', JSON.stringify(LIST))
        input.value=''
        id++
    }
})

list.addEventListener('click', function(event){
    const element = event.target
    const elementData = element.attributes.data.value
    if(elementData === 'completed'){
        completedTask(element)
    } else if(elementData === 'removed'){
        removedTask(element)
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
})


//Local storage get item

let data = localStorage.getItem('TODO')
if(data){
    LIST=JSON.parse(data)
    id = LIST.length
    loadList(LIST)
}else{
    LIST = []
    id = 0
}


function loadList(DATA){
    DATA.forEach(function(i){
        addTask(i.name,i.id,i.completed,i.removed)
    })
}