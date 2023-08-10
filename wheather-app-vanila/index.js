
const cityName = document.getElementById("city");
const temp = document.getElementById("temp");
const descriptionDiv = document.getElementById("description");
const iconSpan = document.getElementById("icon");

// search button
const searchBtn = document.getElementById("search-btn");


const loadWhetherDataByCity = async (city) => {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=174fbe357862b6f8a0ff37128bddc876&units=metric`;

    try {
        const res = await fetch(api);
        const data = await res.json();
        displayWhetherDataByCityName(data);
    } catch (error) {
        console.log(error.message);
    }
    
}


const displayWhetherDataByCityName = (whether) => {

     const {name} = whether;
     const {temp} = whether.main;
     const{description} = whether.weather[0];
     const{icon} = whether.weather[0];

     cityName.textContent = name;
     temp.textContent = temp;
     descriptionDiv.textContent = description;
     iconSpan.src = `http://openweathermap.org/img/w/${icon}.png`;

}
 
// search button event handler
searchBtn.addEventListener("click", () => {

    const searchInput = document.getElementById('input');
    let regex = /^[a-zA-Z/\s]+$/;

    if(searchInput.value.match(regex)) {
        loadWhetherDataByCity(searchInput.value);
        searchInput.value = "";
        
    } else {
        alert("Pleas type City name to get whether data");
        false;
    }
  
    
  
})
