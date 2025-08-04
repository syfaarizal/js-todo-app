const list = document.getElementById("list");
const STORAGE_KEY = "todoList";

document.addEventListener("DOMContentLoaded", () => {
  loadData();
});

function onFormSubmit(e) {
  e.preventDefault();
  const input = e.target.children[0];
  const inputValue = input.value.trim();
  if (!inputValue) return;

  const newItem = createListItem(inputValue);
  list.appendChild(newItem);
  saveData();
  input.value = "";
}

function deleteListItem(e) {
  const parent = e.target.closest(".list-item");
  parent.remove();
  saveData();
}

function createListItem(text) {
  const item = document.createElement("div");
  item.classList.add("list-item", "fade-in");
  item.innerHTML = `
    <div class="list-item-detail">
      <input class="ck-input" type="checkbox" onchange="saveData()"/>
      <span class="list-text">${text}</span>
    </div>
    <div class="button-group">
      <button class="edit-button" onclick="editListItem(event)"><i class="fas fa-pen"></i></button>
      <button class="delete-button" onclick="deleteListItem(event)"><i class="fas fa-trash"></i></button>
    </div>
  `;
  return item;
}

function editListItem(e) {
  const span = e.target.closest(".list-item").querySelector(".list-text");
  const newText = prompt("Edit task:", span.textContent);
  if (newText !== null && newText.trim() !== "") {
    span.textContent = newText.trim();
    saveData();
  }
}

function saveData() {
  const items = list.querySelectorAll(".list-item");
  const data = [];
  items.forEach(item => {
    const text = item.querySelector(".list-text").textContent;
    const done = item.querySelector("input[type='checkbox']").checked;
    data.push({ text, done });
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  const data = JSON.parse(saved);
  data.forEach(({ text, done }) => {
    const item = createListItem(text);
    item.querySelector("input[type='checkbox']").checked = done;
    list.appendChild(item);
  });
}
