const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const counter = document.getElementById('counter');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function updateCounter() {
  counter.textContent = `${todos.length} task${todos.length !== 1 ? 's' : ''}`;
}

function renderTodos() {
  list.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;

    if (todo.done) li.classList.add('done');

    li.addEventListener('click', () => {
      todos[index].done = !todos[index].done;
      saveTodos();
      renderTodos();
    });

    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = '❌';

    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  updateCounter();
}

addBtn.addEventListener('click', () => {
  if (input.value.trim() === '') return;

  todos.push({ text: input.value, done: false });
  input.value = '';
  saveTodos();
  renderTodos();
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});

renderTodos();
updateCounter();