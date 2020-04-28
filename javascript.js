let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    todo: [],
    complete: []
  };

var checkImg = new Image();

document.getElementById('add').addEventListener('click',function() {
    let value = document.getElementById('item').value;
    if (value) {
        addItemToDo(item);
        document.getElementById('item').value = '';
    }
});

document.getElementById('item').addEventListener('keydown', function (e) {
    let value = document.getElementById('item').value;
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
      addItemToDo(item);
      document.getElementById('item').value = '';
    }
  });

function removeItem() {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;
    let id = parent.id;
    let value = item.innerText;
  
    if (id === 'todo') {
      data.todo.splice(data.todo.indexOf(value), 1);
    } else {
      data.complete.splice(data.complete.indexOf(value), 1);
    }
  
    parent.removeChild(item);
  }

function completeItem() {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;
    let id = parent.id;
    let value = item.innerText;
  
    if (id === 'todo') {
      data.todo.splice(data.todo.indexOf(value), 1);
      data.complete.push(value);
      checkImg.src = '/resources/check2.png';
    } else {
      data.complete.splice(data.complete.indexOf(value), 1);
      data.todo.push(value);
      checkImg.src = '/resources/check.png';
    }
  
    // Check if the item should be added to the completed list or to re-added to the todo list
    let target = (id === 'todo') ? document.getElementById('complete'):document.getElementById('todo');
  
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
}

function addItemToDo(text) {
    let list = document.getElementById('todo');

    let item = document.createElement('li');
    item.innerText= text.value;

    let buttons = document.createElement('div');
    buttons.classList.add('buttons');

    let remove = document.createElement('button');
    remove.classList.add('remove');
    var removeImg = new Image();
    removeImg.src = '/resources/trash.png';
    removeImg.onmouseover = function () {
        this.src = '/resources/trash2.png';
    };
    removeImg.onmouseleave = function () {
        this.src = '/resources/trash.png';
    }
    remove.appendChild(removeImg);

    remove.addEventListener('click', removeItem);

    let check = document.createElement('button');
    check.classList.add('check');
    checkImg = new Image();
    checkImg.src = '/resources/check.png';
    check.appendChild(checkImg);

    check.addEventListener('click', completeItem);


    buttons.appendChild(remove);
    buttons.appendChild(check);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
} 