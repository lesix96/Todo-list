let todoList = [];

class ToDoItem {
  constructor(newTask, newId) {
    this.value = newTask;
    this.id = newId;
  }

  generateHtmlList(taskValue, taskId) {
    const LIST_ITEM = document.createElement('li');
    const TEXT_BOX = document.createElement('div');
    const DELETE_BTN = document.createElement('button');
    const EDIT_BTN = document.createElement('button');
    const SAVE_BTN = document.createElement('button');
    const CANCEL_BTN = document.createElement('button');
    const BTN = document.querySelectorAll(".btn");

    LIST_ITEM.appendChild(TEXT_BOX);

    function buttonsVisabilityChanger(value, id) {
      LIST_ITEM.parentElement.childNodes.forEach(element => {
      element.childNodes.forEach((btn) => {
        if (btn.name === 'edit' || btn.name === 'delete') {
          if (btn.id != id) {
            btn.style.display = value;
          }
        }
      })
    })
  }

    const DELETE_EVENT = () => {
      LIST_ITEM.parentElement.removeChild(LIST_ITEM);
      for (let i = 0; i < todoList.length; i++) {
        if (Number(this.id) === todoList[i].id) {
          const INDEX = todoList.indexOf(todoList[i]);
          todoList.splice(INDEX, 1);
        }
      }
      saveToLocalStorage(todoList);
    }

    const EDIT_EVENT = () => {
      buttonsVisabilityChanger('none', this.id);

      const CHANGED_ITEM = document.createElement('input');

      const SAVE_EVENT = () => {
        if (CHANGED_ITEM.value !== '') {
          for (let i = 0; i < todoList.length; i++) {
            if (Number(this.id) === todoList[i].id) {
              todoList[i].value = CHANGED_ITEM.value;
            }
          }
          saveToLocalStorage(todoList);

          TEXT_BOX.textContent = CHANGED_ITEM.value;
          LIST_ITEM.appendChild(CHANGED_ITEM);

          EDIT_BTN.style.display = 'inline-block';
          DELETE_BTN.style.display = 'inline-block';
          SAVE_BTN.style.display = 'none';
          CANCEL_BTN.style.display = 'none';

          LIST_ITEM.replaceChild(TEXT_BOX, CHANGED_ITEM)

          buttonsVisabilityChanger('inline-block', this.id);
        }
      }

      const CANCEL_EVENT = () => {
        for (let i = 0; i < todoList.length; i++) {
          if (Number(this.id) === todoList[i].id) {
            TEXT_BOX.textContent = todoList[i].value;
          }
        }

        EDIT_BTN.style.display = 'inline-block';
        DELETE_BTN.style.display = 'inline-block';
        SAVE_BTN.style.display = 'none';
        CANCEL_BTN.style.display = 'none';

        LIST_ITEM.appendChild(CHANGED_ITEM);

        LIST_ITEM.replaceChild(TEXT_BOX, CHANGED_ITEM);

        buttonsVisabilityChanger('inline-block', this.id);
      }

      CHANGED_ITEM.setAttribute('type', 'text');
      CHANGED_ITEM.value = TEXT_BOX.textContent;
      CHANGED_ITEM.id = taskId;
      CHANGED_ITEM.className = 'input';
      LIST_ITEM.appendChild(CHANGED_ITEM);

      EDIT_BTN.style.display = 'none';
      DELETE_BTN.style.display = 'none';
      SAVE_BTN.style.display = 'inline-block';
      CANCEL_BTN.style.display = 'inline-block';

      LIST_ITEM.replaceChild(CHANGED_ITEM, TEXT_BOX);

      SAVE_BTN.addEventListener('click', SAVE_EVENT)

      CANCEL_BTN.addEventListener('click', CANCEL_EVENT)
    }

    TEXT_BOX.id = taskId;
    TEXT_BOX.textContent = taskValue;
    TEXT_BOX.className = 'text__container';

    LIST_ITEM.id = taskId;
    LIST_ITEM.className = 'list__item'

    LIST_ITEM.appendChild(DELETE_BTN);
    LIST_ITEM.appendChild(EDIT_BTN);
    LIST_ITEM.appendChild(SAVE_BTN);
    LIST_ITEM.appendChild(CANCEL_BTN);

    DELETE_BTN.innerHTML = '<b>Delete</b>';
    DELETE_BTN.setAttribute('type', 'submit');
    DELETE_BTN.id = taskId;
    DELETE_BTN.className = 'btn';
    DELETE_BTN.name = 'delete';

    EDIT_BTN.innerHTML = '<b>Edit</b>';
    EDIT_BTN.setAttribute('type', 'submit');
    EDIT_BTN.id = taskId;
    EDIT_BTN.className = 'btn';
    EDIT_BTN.name = 'edit';

    SAVE_BTN.innerHTML = '<b>Save</b>';
    SAVE_BTN.setAttribute('type', 'submit');
    SAVE_BTN.id = taskId;
    SAVE_BTN.className = 'btn';

    CANCEL_BTN.innerHTML = '<b>Cancel</b>';
    CANCEL_BTN.setAttribute('type', 'submit');
    CANCEL_BTN.id = taskId;
    CANCEL_BTN.className = 'btn';

    EDIT_BTN.style.display = 'inline-block';
    DELETE_BTN.style.display = 'inline-block';
    SAVE_BTN.style.display = 'none';
    CANCEL_BTN.style.display = 'none';

    DELETE_BTN.addEventListener('click', DELETE_EVENT);

    EDIT_BTN.addEventListener('click', EDIT_EVENT);

    saveToLocalStorage(todoList);
    return LIST_ITEM;
  }
}

function idGenerator() {
  if (!todoList.length) {
    return 1;
  } else {
    return ((todoList[todoList.length - 1].id) + 1);
  }
}

function saveToLocalStorage(list) {
  localStorage.setItem('toDoList', JSON.stringify(todoList));
}

document.addEventListener('DOMContentLoaded', (event) => {
  const HEADER = document.createElement('div');
  const HEADER_TEXT = document.createTextNode('Todo List');
  const CONTAINER = document.createElement('div');
  const INPUT_CONTAINER = document.createElement('div');
  const INPUT_PLACE = document.createElement('input');
  const ADD_BTN = document.createElement('button');
  const TASKS_LIST = document.createElement('div');
  const ORDERED_LIST = document.createElement('ol');

  const ADD_EVENT = () => {
    if (INPUT_PLACE.value !== '') {
      const ID = idGenerator();
      const TASK = new ToDoItem(INPUT_PLACE.value, ID);
      const HTML_OBJECTS = TASK.generateHtmlList(INPUT_PLACE.value, ID);
      INPUT_PLACE.value = '';
      ORDERED_LIST.appendChild(HTML_OBJECTS);
      todoList.push(TASK);
      saveToLocalStorage(todoList);
    }
  }

  HEADER.className = 'header';
  HEADER_TEXT.className = 'header___text';
  CONTAINER.className = 'container';
  INPUT_CONTAINER.className = 'input__container';

  INPUT_PLACE.setAttribute('type', 'text');
  INPUT_PLACE.placeholder = `Let's write here new "todo"`;
  INPUT_PLACE.id = 'input__place';
  INPUT_PLACE.className = 'input';

  ADD_BTN.innerHTML = '<b>Add</b>';
  ADD_BTN.setAttribute('type', 'submit');
  ADD_BTN.id = 'add__button';
  ADD_BTN.className = 'btn';

  TASKS_LIST.className = 'tasks__list'
  ORDERED_LIST.className = 'list';

  document.body.append(HEADER);
  HEADER.appendChild(HEADER_TEXT);
  CONTAINER.appendChild(INPUT_CONTAINER);
  INPUT_CONTAINER.appendChild(INPUT_PLACE);
  INPUT_CONTAINER.appendChild(ADD_BTN);
  document.body.append(CONTAINER);
  CONTAINER.appendChild(TASKS_LIST);
  TASKS_LIST.appendChild(ORDERED_LIST);

  (() => {
    const STRING_DATA = localStorage.getItem('toDoList');
    todoList = JSON.parse(STRING_DATA);
    if(todoList === null){
      todoList = [];
    }
    todoList.forEach(element => {
      const TASK = new ToDoItem(element.value, element.id);
      const HTML_OBJECTS = TASK.generateHtmlList(element.value, element.id);
      ORDERED_LIST.appendChild(HTML_OBJECTS);
    })
  })();

  ADD_BTN.addEventListener('click', ADD_EVENT)
});