const list = document.getElementById("list")

function onFormSubmit(e) {
    e.preventDefault()
    const inputValue = e.target.children[0].value

    list.appendChild(createListItem(inputValue))
}

function deleteListItem(e) {
    const parent = e.target.parentElement
    list.removeChild(parent)
}

function createListItem(inputValue) {
    const item = document.createElement("div");
    item.innerHTML = `
        <div class="list-item-detail">
                <input class="ck-input" type="checkbox"/>
                <span>${inputValue}</span>
            </div>
            <button class="delete-button" onclick="deleteListItem(event)">X</button>
    `
    item.setAttribute("class", "list-item");
    return item 
}