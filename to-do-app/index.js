const form = document.getElementById("addForm")
const items = document.getElementById("items")
const filter = document.getElementById("filter")

// Form Submit Event Listener

form.addEventListener("submit", addItems)

// Delete Event Listener
items.addEventListener("click", removeItem)

// Filter  event Listener
filter.addEventListener("keyup", filterItems)




// addItems function

function addItems(e) {
    e.preventDefault()

    // Add Input to li items
    const input = document.getElementById("item").value
    const newItem = document.createElement("li")
    newItem.className = 'list-group-item'
    newItem.textContent =  input + " " 
    
    // add button li item
    const button = document.createElement("button")
    button.className = "btn btn-danger btn-sm float-right delete"
    //button.textContent = "X"
    button.appendChild(document.createTextNode(` X`))
    newItem.appendChild(button)

    // Finally add new li to itemsList
    if(input === "") {
        alert("please type something to add")
    } else{
        items.appendChild(newItem)
        document.getElementById("item").value =""
    }
    
   


}

// Remove function
function removeItem(e) {
    if(e.target.classList.contains("delete")) {
        alert("are you sure")
        let li = e.target.parentElement
        items.removeChild(li)
    }
}
 

// Filter function

function filterItems(e) {
    const text = e.target.value.toLowerCase()

    // get all li items
    const li = document.getElementsByTagName("li")

    // convert HTML collection to an array
    Array.from(li).forEach( (item) => {
        const itemName = item.firstChild.textContent
        if(itemName.toLowerCase().indexOf(text) != -1) {
            item.style.display = "block"
        } else {
            item.style.display = "none"
        }

    })

}