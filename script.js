const addButton = document.getElementById('criar-tarefa');
const input = document.getElementById('texto-tarefa');
const taskList = document.getElementById('lista-tarefas');

const eraseAll = document.getElementById('apaga-tudo');
const eraseAllDone = document.getElementById('remover-finalizados');
const saveTasks = document.getElementById('salvar-tarefas');
const selectedTask = document.getElementById("remover-selecionado");

const moveUp = document.getElementById('mover-cima');
const moveDown = document.getElementById('mover-baixo')

// mover o item selecionado para cima ou para baixo
// verificar se possui a classe tasks-gray
// se clicar no botao cima, mover para cima
// se o elemento antes ou depois for vazio (null) não alterar posição
/** Source: link: https://trybecourse.slack.com/archives/C02L83FCV4K/p1640118230009300 - Requisito 13 - Baseado no código do colega Raphael Martins - Turma 19 - Tribo A - link PR: https://github.com/tryber/sd-019-a-project-todo-list/pull/112 */
/** Source: link: https://developer.mozilla.org/pt-BR/docs/Web/API/Node/insertBefore#syntax */
function moveItemUp() {
  const itemListTasks3 = document.querySelectorAll('li');
  const selectedItem = document.querySelector('.tasks-gray');
  for (let i of itemListTasks3) {
    if (i.classList.contains('tasks-gray')) {
      const beforeItem = selectedItem.previousElementSibling;
      if (beforeItem !== null) {
        taskList.insertBefore(beforeItem, selectedItem.nextElementSibling);
      }
    }
  }
}
moveUp.addEventListener('click', moveItemUp);

function moveItemDown() {
  const itemListTasks4 = document.querySelectorAll('li');
  const selectedItem = document.querySelector('.tasks-gray');
  for (let i of itemListTasks4) {
    if (i.classList.contains('tasks-gray')) {
      const afterItem = selectedItem.nextElementSibling;
      if (afterItem !== null) {
        taskList.insertBefore(afterItem, selectedItem);
      }
    }
  }
}
moveDown.addEventListener('click', moveItemDown);

// salvar no localStorage
/* Mentoria com o Alexandre Sumoyama, ele me ajudou a formular a lógica do requisito 12 - salvar o elemento HTML, as 'li's completas*/
function saveAtLocalStorage() {
  localStorage.setItem('item-tasks', JSON.stringify(taskList.innerHTML));
}
saveTasks.addEventListener('click', saveAtLocalStorage);

// "Pegar" o que esta salvo no localStorage
function getLocalStorage() {
  const savedStorage = JSON.parse(localStorage.getItem('item-tasks'));
  taskList.innerHTML = savedStorage;

  const itemListTasks = document.querySelectorAll('li');
  for (let i = 0; i < itemListTasks.length; i += 1) {
    itemListTasks[i].addEventListener('click', graySelected);
    itemListTasks[i].addEventListener('dblclick', done);
  }
}

// Função a ser executada quando carregar a página
/* Código elaborado com base no exemplo do course, bloco 5.4 link: https://app.betrybe.com/course/fundamentals/javascript-dom-eventos-e-web-storage/javascript-web-storage/b332393f-7548-4075-83e3-f632735efb95/conteudos/e90b472b-e79b-4b29-9979-8222daff0d70/local-e-session-storage/2ac29f5c-c36e-473d-8546-6fb18340e55e?use_case=side_bar */
function initial() {
  if (localStorage.getItem('item-tasks') === null) {
    localStorage.setItem('item-tasks', JSON.stringify([]));
  } else {
    getLocalStorage();
  }
} 

/** Source: link https://trybecourse.slack.com/archives/C02L83FCV4K/p1639313749377100?thread_ts=1639313080.376600&cid=C02L83FCV4K (Colocar o escutador de eventos do clique no item da lista dentro do botão adicionar (Fuction addItem) - Sugestão do Leo Araujo - Turma 19 - Tribo A) */
// adicionar itens na lista
function addItem() {
  const itemList = document.createElement('li');
  itemList.innerText = input.value;
  itemList.className = 'tasks';
  taskList.appendChild(itemList);
  input.value = '';

  itemList.addEventListener('click', graySelected);
  itemList.addEventListener('dblclick', done);
}
addButton.addEventListener('click', addItem);

/* O for percorre a lista e remove a classe 'tasks-gray' de todos antes de adicionar a mesma classe no item clicado. Imar Mendes - Turma 19 - Tribo A me ajudou neste requisito 8. */
// limpar a lista da classe gray
function clearGray() {
  const allTasks = document.querySelectorAll('.tasks');
  for (let index = 0; index < allTasks.length; index += 1) {
    allTasks[index].classList.remove('tasks-gray');
  }
}

/* Consultei o repositório (PR) do colega Thiago Jarilho Zardo para o requisito 7 (separar o código em pequenas funções) link: https://github.com/tryber/sd-019-a-project-todo-list/pull/7/files */
// adicionar classe gray (ficar como selecionado)
function graySelected(event) {
  clearGray();
  event.target.classList.add('tasks-gray');
}

/* ref: https://www.youtube.com/watch?v=xzf4DOnG-fo&t=744s - Utilização do classList.toggle - requisito 9 */
// adicionar a classe 'completed' para tarefas concluídas
function done(event) {
  event.target.classList.toggle('completed');
}

// remover toda a lista de tarefas
function removeAll() {
  const listTasks = document.querySelectorAll('.tasks');
  for (let index of listTasks) {
    index.remove();
    localStorage.clear();
  }
}
eraseAll.addEventListener('click', removeAll);

// limpar tarefas concluídas
function removeAllDone() {
  const listTasks2 = document.querySelectorAll('.tasks');
  for (let done of listTasks2) {
    if (done.classList.contains('completed')) {
      done.remove();
    }
  }
}
eraseAllDone.addEventListener('click', removeAllDone);

// remover tarefa selecionada
function removeSelected() {
  const listTasks3 = document.querySelectorAll('.tasks');
  for (let selected of listTasks3) {
    if (selected.classList.contains('tasks-gray')) {
      selected.remove();
    }
  }
}
selectedTask.addEventListener('click', removeSelected);

/** Source: link https://www.ti-enxame.com/pt/forms/insira-o-evento-de-pressionamento-de-tecla-em-javascript/957608294/ (Evento de pressionamento de tecla) */
/* ref: https://www.w3schools.com/jsref/event_onkeydown.asp (keydown event) */
// Insere item na lista se pressionar o 'Enter
function enter(event) {
  if (event.key === 'Enter') {
    let itemList = document.createElement('li');
    itemList.innerText = input.value;
    itemList.className = 'tasks';
    taskList.appendChild(itemList);
    input.value = '';

    itemList.addEventListener('click', graySelected);
    itemList.addEventListener('dblclick', done);
  }
}
input.addEventListener('keydown', enter); 

window.onload = function() {
  initial();
}
