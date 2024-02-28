const todos = JSON.parse(localStorage.getItem('saved-todos')) || [];

const addTodoButton = document.querySelector('.add-todo');
const todoName = document.querySelector('.todo-name');
const todoInput = document.querySelector('.todo-input');
const todoDuedateElement = document.querySelector('.todo-due-date');
const todosList = document.querySelector('.todos');

renderTodos()

addTodoButton.addEventListener('click', addTodo);

function renderTodos() {
  if (todos.length === 0) {
    todosList.innerHTML = `<tr><td colspan="5" class="text-center">No task found</td></tr>`;
    return;
  }
  let todosHTML = '';
  
  todos.forEach(function(todoObject, i) {
    // const name = todoObject.name;
    // const dueDate = todoObject.dueDate;
    const {name, dueDate} = todoObject;

    const html = `
    <div class="todo">${name}</div>
    <div class="todo">${dueDate}</div>
    <button class="delete-todo" onclick="
      todos.splice(${i}, 1);
      renderTodos();
      localStorage.removeItem('saved-todos');
    ">Delete</button>
    `;
    todosHTML += html;
  });

  todosList.innerHTML = todosHTML;
}

function addTodo() {
  const todo = todoName.value;
  const todoDuedate = todoDuedateElement.value;
  
  todos.push({
    name: todo,
    dueDate: todoDuedate
  });

  todoName.value = '';

  renderTodos();

  localStorage.setItem('saved-todos', JSON.stringify(todos));
}

todoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

