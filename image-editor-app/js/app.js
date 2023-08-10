
const fileInput = document.querySelector(".file-input"),
chooseImgBtn = document.querySelector(".choose-img"),
filterBtns = document.querySelectorAll(".options button"),
filterName = document.querySelector(".filter-info .name"),
sliderValue = document.querySelector(".slider .value"),
sliderInput = document.querySelector(".slider input"),
resetFilterBtn = document.querySelector(".reset-filter"),
rotateOptions = document.querySelectorAll(".rotate button")

// console.log(sliderInput.value, sliderValue.innerText)

const previewImg = document.querySelector(".preview-img img");

let brightness = "100", saturation = "100", inversion = "0", grayscale = "0", blur = "0";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const loadImage = () => {
    setTimeout(() => {
        const file = fileInput.files[0]; // detect user selected file
        if(!file) return; // if user doesn't select any file
        previewImg.src = URL.createObjectURL(file); // show user selected file 

        previewImg.addEventListener("load", () => {
            document.querySelector(".container").classList.remove("disable");
        })
    }, 0);

    //console.log("shudgdfg");
}


const applyFilter = () => {

    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    console.log(brightness, saturation, inversion, grayscale)
}

filterBtns.forEach((option )=> {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness") {
            sliderInput.max = 200;
            sliderInput.value = brightness;
            console.log(brightness)
            sliderValue.innerText = `${brightness}%`;
        } else if(option.id === "saturation") {
            sliderInput.max = 200;
            sliderInput.value = saturation;
            console.log(saturation)
            sliderValue.innerText = `${saturation}%`;
        } else if(option.id === "inversion") {
            sliderInput.max = 100;
            sliderInput.value = inversion;
            sliderValue.innerText = `${inversion}%`;

        } 
        
        else {
            sliderInput.max = 100;
            sliderInput.value = grayscale;
            sliderValue.innerText = `${grayscale}`;
        }
        
    })
})

const updateFilter = () => {

    sliderValue.innerText = `${sliderInput.value}%`;

    const selectedFilter = document.querySelector(".options .active");
    //console.log(selectedFilter)

    if(selectedFilter.id === "brightness") {
        brightness = sliderInput.value;
    } else if(selectedFilter.id === "saturation") {
        saturation = sliderInput.value;
    } else if(selectedFilter.id === "inversion") {
        inversion = sliderInput.value;

    }
    else {
        grayscale = sliderInput.value;
    }

    applyFilter();
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left") {
            rotate -= 90;
        } else if(option.id === "right") {
            rotate += 90;
        } else if(option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});


const resetFilter = () => {
    brightness = "110"; saturation = "100"; inversion = "0"; grayscale = "0";
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterBtns[0].click()
    applyFilter();
}



resetFilterBtn.addEventListener("click", resetFilter)
sliderInput.addEventListener("input", updateFilter)
fileInput.addEventListener('change', loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());