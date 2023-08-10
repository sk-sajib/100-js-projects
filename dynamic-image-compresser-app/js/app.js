
const uploadContainer = document.querySelector(".upload-container"),
previewImg = uploadContainer.querySelector("img"),
imageWidth = document.querySelector(".width-container input"),
imageHeight = document.querySelector(".height-container input"),
imageRatio = document.querySelector(".aspect-ratio input"),
imageQuality = document.querySelector(".image-quality input"),
downloadImgBtn = document.getElementById("download-img-btn");
const fileInput = document.getElementById("file-input")

let changeImageRatio;

const loadFile = (e) => {

    setTimeout( () => {
        const file = e.target.files[0];
        if(!file) return;
        console.log(file)
    
        const url = URL.createObjectURL(file);
        previewImg.src = url;
    
        previewImg.addEventListener("load", () => {
            imageHeight.value = previewImg.naturalHeight;
            imageWidth.value = previewImg.naturalWidth;
            changeImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
            document.querySelector(".container").classList.add("active");
        });
    }, 0);
   
}

imageWidth.addEventListener("keyup", () => {
    const height = imageRatio.checked ? imageWidth.value / changeImageRatio : imageHeight.value;
    imageHeight.value = Math.floor(height);

});
imageHeight.addEventListener("keyup", () => {
    const width = imageRatio.checked ? imageHeight.value * changeImageRatio : imageWidth.value;
    imageWidth.value = Math.floor(width);

});

const resizeAndDownloadImage = () => {

    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    const imgQualityReduce = imageQuality.checked ? 0.7 : 0.1;
    
    

    canvas.width = imageWidth.value;
    canvas.height = imageHeight.value;

    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    a.href = canvas.toDataURL("image/jpeg", imgQualityReduce);
    a.download = new Date().getTime();
    a.click();
}


downloadImgBtn.addEventListener("click", resizeAndDownloadImage)
fileInput.addEventListener("change", loadFile)
uploadContainer.addEventListener("click", () => fileInput.click())