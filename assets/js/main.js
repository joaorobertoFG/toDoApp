const input = document.querySelector(".todo-input");
const btnInput = document.querySelector(".todo-input--btn");
const tasks = document.querySelector(".tasks");

// Função para criar um <li>
function createLi() {
  const li = document.createElement("li");
  return li;
}

// Função para limpar o input
function cleanInput() {
  input.value = "";
  // input.focus();
}

// Criar uma nova tarefa
function createTask(textInput, completed = false) {
  const li = createLi();
  li.setAttribute("class", "taskLi");

  const textSpan = document.createElement("span");
  textSpan.textContent = textInput;
  textSpan.classList.add("task-text");
  if (completed) {
    textSpan.classList.add("completed");
  }

  // Criar um container para os botões
  const actionsDiv = document.createElement("div");
  actionsDiv.setAttribute("class", "task-actions");

  const checkBtn = createCheckBtn(completed);
  const deleteBtn = createDeleteBtn();

  actionsDiv.appendChild(checkBtn);
  actionsDiv.appendChild(deleteBtn);

  li.appendChild(textSpan); // Adiciona o texto da tarefa
  li.appendChild(actionsDiv); // Adiciona os botões
  tasks.prepend(li);

  cleanInput();
  saveTasks();
}

// Criar o botão de deletar
function createDeleteBtn() {
  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("aria-label", "Delete item");
  deleteBtn.setAttribute("class", "delete-button");

  deleteBtn.innerHTML = `
        <svg class="trash-svg" viewBox="0 -10 64 74" xmlns="http://www.w3.org/2000/svg">
            <g id="trash-can">
                <rect x="16" y="24" width="32" height="30" rx="3" ry="3" fill="#e74c3c"></rect>
                <g transform-origin="12 18" id="lid-group">
                    <rect x="12" y="12" width="40" height="6" rx="2" ry="2" fill="#c0392b"></rect>
                    <rect x="26" y="8" width="12" height="4" rx="2" ry="2" fill="#c0392b"></rect>
                </g>
            </g>
        </svg>
    `;

  return deleteBtn;
}

// Criar a checkbox personalizada
function createCheckBtn(completed) {
  const checkWrapper = document.createElement("div");
  checkWrapper.setAttribute("class", "content");

  checkWrapper.innerHTML = `
        <label class="checkBox">
            <input type="checkbox" class="checkbox" ${completed ? "checked" : ""}>
            <div class="transition"></div>
        </label>
    `;

  return checkWrapper;
}

// Evento para adicionar tarefas ao pressionar Enter
input.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (!input.value) return;
    createTask(input.value);
    saveTasks();
  }
});

// Evento para adicionar tarefas ao clicar no botão "+"
btnInput.addEventListener("click", function () {
  if (!input.value) return;
  createTask(input.value);
});

// Evento para deletar uma tarefa
document.addEventListener("click", function (e) {
  const el = e.target.closest(".delete-button");
  if (el) {
    const taskItem = el.closest("li");
    if (taskItem) {
      taskItem.remove();
      saveTasks();
    }
  }
});

// Evento para marcar/desmarcar a checkbox
document.addEventListener("change", function (e) {
  if (e.target.classList.contains("checkbox")) {
    const taskItem = e.target.closest("li");
    const taskText = taskItem.querySelector(".task-text");
    
    if (e.target.checked) {
      taskText.classList.add("completed");
    } else {
      taskText.classList.remove("completed");
    }

    saveTasks(); // Atualiza o LocalStorage
  }
});

// Salvar tarefas no LocalStorage
function saveTasks() {
  const liTasks = tasks.querySelectorAll("li");
  const taskList = [];

  for (let task of liTasks) {
    let taskText = task.querySelector(".task-text").textContent;
    let isCompleted = task.querySelector(".checkbox").checked;

    taskList.push({
      text: taskText,
      completed: isCompleted,
    });
  }

  localStorage.setItem("tasks", JSON.stringify(taskList));
}

// Restaurar tarefas do LocalStorage
function addSavedTasks() {
  const tasks = localStorage.getItem("tasks");
  if (!tasks) return;

  const taskList = JSON.parse(tasks);

  // Reverte a ordem para que as tarefas mais recentes fiquem no topo
  taskList.reverse().forEach(task => {
    createTask(task.text, task.completed);
  });
}


document.addEventListener("deviceready", function() {
  if (window.StatusBar) {
      StatusBar.hide();
  }
});


document.addEventListener("deviceready", function() {
  AndroidFullScreen.immersiveMode(
      function() { console.log("Modo tela cheia ativado!"); },
      function(error) { console.log("Erro ao ativar tela cheia: " + error); }
  );
});

document.addEventListener("deviceready", function() {
  AndroidFullScreen.immersiveMode();
});

// Iniciar com tarefas salvas
addSavedTasks();
