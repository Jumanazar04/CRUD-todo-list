const formCreate = document.getElementById('form-create'),
formEdit = document.getElementById('form-edit'),
inputCreate = document.getElementById('input-create'),
listGroupTodo = document.getElementById('list-group-todo'),
massageCreate = document.getElementById('massage-create'),
time = document.getElementById('time'),
inputEdit = document.getElementById('input-edit'),

//  time elements

fullDay = document.getElementById('full-day'),
hourEl = document.getElementById('hour'),
minuteEl = document.getElementById('minute'),
secondEl = document.getElementById('second');

const editBtn = document.getElementsByClassName('edit-btn')
const deleteBtn = document.querySelector('.delete-btn');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overay');

let formItemId = ''

let todos = JSON.parse(localStorage.getItem('list')) 
    ? JSON.parse(localStorage.getItem('list'))
    : [] ;

    if(todos.length) showTodos()

console.log(todos);

//set todos
function setTodos () {
    localStorage.setItem('list', JSON.stringify(todos));
}

// time 
function getTimes (){
    const now = new Date()
    // const date = now.getDate() < 10 ? '0' + (now.getDate()) : now.getDate();
    // const month = now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now.getMonth();
    // const year = now.getFullYear();

    const hour = now.getHours() < 10 ? '0' +  now.getHours(): now.getHours();
    const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    const second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();

    fullDay.textContent = `${hour}:${minute}:${second}`

    return ;
}

setInterval(getTimes, 1000)

function getTime (){
    const now = new Date()
    const date = now.getDate() < 10 ? '0' + (now.getDate()) : now.getDate();
    const month = now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now.getMonth();
    const year = now.getFullYear();

    const hour = now.getHours() < 10 ? '0' +  now.getHours(): now.getHours();
    const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    const second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();

    return `${hour}:${minute}  ${date}:${month}:${year}`;
}

getTime()

//shov todos
function showTodos () {
    const todos = JSON.parse(localStorage.getItem('list'));
    listGroupTodo.innerHTML = ''
    todos.forEach((item, i) => {
        listGroupTodo.innerHTML += `
        <li ondblclick="completedTodo(${i})" class="list-group-item d-flex justify-content-between ">
            ${item.text}
                <div class="todo-icons">
                    <span class="opacity-50 me-2">
                        ${getTime()}
                    </span>
                    <img onclick=(editTodo(${i})) src="./img/edit.png" class="ms-1" alt="edit" width="25px" height="25px">
                    <img onclick=(deleteTodo(${i})) src="./img/delete.png" class="ms-2" alt="edit" width="25px" height="25px">
                </div>
        </li>
            `
    })
}




// show error
function showMassage (where, massage) {
    document.getElementById(`${where}`).textContent = massage

    setTimeout(() => {
        document.getElementById(`${where}`).textContent = ''
    }, 2000)
}


//get todos
formCreate.addEventListener('submit', (e) => {
    e.preventDefault()

    const TodoText = inputCreate.value.trim()
    formCreate.reset()

    if(TodoText.length) {
        todos.push({text: TodoText, time: getTime(), completed: false})
        setTodos()
        showTodos()
    }else {
        showMassage('massage-edit', 'Please, enter some text...')
    }

    
})

// form edit

formEdit.addEventListener('submit', (e) => {
    e.preventDefault()

    const TodoText = inputEdit.value.trim()
    formEdit.reset()

    if(TodoText.length) {
        todos.splice(formItemId, 1,
            {text: TodoText, 
            time: getTime(), 
            completed: false})
        setTodos()
        showTodos()
        close()
    }else {
        showMassage('massage-edit', 'Please, enter some text...')
    }

})
function deleteTodo (id) {
    const deletedTodos = todos.filter((item, i) => {
        return i !== id
    })

    todos = deletedTodos
    setTodos()
    showTodos()
}

// comleted todo

function completedTodo (id) {
    const completedTodos = todos.map((item, i) => {
        if(id == i){
            return {...item, completed: item.completed == true ? false : true}
        }else {
            return{...item}
        }
    })

    todos = completedTodos
    setTodos()
    showTodos()
}


function editTodo (id) {
    open()
    formItemId = id
}

function open (){
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

function close () {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}





