const wrapper = document.querySelector(".wrapper");
const form = wrapper.querySelector("form");
const fileInput = form.querySelector("input");
const contentInfo = form.querySelector(".content p");
const closeBtn = wrapper.querySelector(".close");
const copyBtn = wrapper.querySelector(".copy");


function fetchRequest(formData, userInputFile) {

    contentInfo.innerText = "Scanning QR code...";

    // sending post request to qr server api with passing
    // formData as body and getting response from it
    fetch(`https://api.qrserver.com/v1/read-qr-code/`, {
        method: "POST", body: formData
    })
    .then(res => res.json())
    .then( result => {
        result = result[0].symbol[0].data;
        contentInfo.innerText =  result ? "Upload QR code to Scan" : "Couldn't Scan QR code";
        if(!result) return;
        form.querySelector("img").src = URL.createObjectURL(userInputFile);
        wrapper.querySelector("textarea").innerText = result;
        wrapper.classList.add("active");
        console.log(result)
    }).catch( () => {
        contentInfo.innerText = "Couldn't Scan QR code"
    })
}




fileInput.addEventListener("change", (e) => {

    let file = e.target.files[0]; // getting user selected file
     if(!file) return;
    let formData = new FormData() // creating new formatData object
    formData.append('file', file) // adding selected file to formatData
    fetchRequest(formData, file)

})

copyBtn.addEventListener("click", () => {
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text)
})

closeBtn.addEventListener("click", () =>  wrapper.classList.remove("active"));

form.addEventListener("click", () => fileInput.click())