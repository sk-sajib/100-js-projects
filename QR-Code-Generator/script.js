const wrapper = document.querySelector(".wrapper");
const qrInput = wrapper.querySelector(".form input");
const generateBtn = wrapper.querySelector(".form button");
const qrImg = wrapper.querySelector(".qr-code img")

// Generate button event listener
generateBtn.addEventListener("click", generateQrCode)


// Generate QR cod function
function generateQrCode() {
    let qrValue = qrInput.value;
    if(qrValue) generateBtn.innerText = "QR Code Generating...";

    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`;

    // Once img has been loaded
    qrImg.addEventListener("load", () => { 
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
        //qrInput.value = ""
    })
   
}

qrInput.addEventListener("keyup", () => {
    if(!qrInput.value) {
        wrapper.classList.remove("active")
    }
})
