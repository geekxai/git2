const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const count = document.getElementById("todo-count");
const clearCompletedBtn = document.getElementById("clear-completed");

const STORAGE_KEY = "simple_todo_items";
let todos = loadTodos();

function loadTodos() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function createTodo(text) {
  return {
    id: crypto.randomUUID(),
    text,
    completed: false,
  };
}

function updateCount() {
  const pending = todos.filter((todo) => !todo.completed).length;
  count.textContent = `${pending} 项待办`;
}

function renderTodos() {
  list.innerHTML = "";

  if (todos.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = "暂无待办，开始添加你的第一个任务吧！";
    list.appendChild(empty);
    updateCount();
    return;
  }

  todos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = `todo-item${todo.completed ? " completed" : ""}`;
    item.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", "切换完成状态");

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "delete-btn";
    delBtn.textContent = "删除";

    item.append(checkbox, text, delBtn);
    list.appendChild(item);
  });

  updateCount();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) return;

  todos.unshift(createTodo(value));
  saveTodos();
  renderTodos();
  form.reset();
  input.focus();
});

list.addEventListener("click", (event) => {
  const target = event.target;
  const item = target.closest(".todo-item");
  if (!item) return;

  const id = item.dataset.id;
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  if (target.matches('input[type="checkbox"]')) {
    todo.completed = target.checked;
  } else if (target.classList.contains("delete-btn")) {
    todos = todos.filter((t) => t.id !== id);
  } else {
    return;
  }

  saveTodos();
  renderTodos();
});

clearCompletedBtn.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
});

renderTodos();
