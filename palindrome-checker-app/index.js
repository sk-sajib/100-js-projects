const inputText = document.querySelector(".inputs input"),
checkBtn = document.querySelector(".inputs button"),
checkingInfo = document.querySelector(".info-txt")

let filter;

checkBtn.addEventListener("click", () => {
    // Reverse the user given input value then check with main given input value
    let reverseValue =  filter.split("").reverse().join("")
    checkingInfo.style.display = "block";
    if(filter != reverseValue) {
        return checkingInfo.innerHTML = `No <span> ${inputText.value}</span> isn't palindrome`
    }
    checkingInfo.innerHTML = `Yes <span> ${inputText.value}</span> is palindrome`

    inputText.value = "";
})


inputText.addEventListener("keyup", () => {

    // Removing spaces & all special characters from input value
    filter = inputText.value.toLocaleLowerCase().replace(/[^A-Z0-9]/ig, "");
    if(filter) {
        return checkBtn.classList.add("active");
    }
    checkBtn.classList.remove("active")
})