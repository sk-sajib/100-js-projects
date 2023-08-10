const whetherLocation = document.getElementById("whether-location");
const temperature = document.getElementById("current-temperature");
const temperatureDes = document.getElementById("temperature-description");
const countryName = document.getElementById("country");
const iconDiv = document.querySelector(".whether-icon")


let lat;
let long;

document.getElementById("getLocation").addEventListener("click", () => {
    iconDiv.innerHTML = "";
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) => {

            console.log(position)
            let {latitude, longitude} = position.coords;
            lat = latitude;
            long = longitude;
            loadWhether(lat, long)
        });

    }
});


const loadWhether = (lat, long) => {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=174fbe357862b6f8a0ff37128bddc876`;
    axios.get(api)
    .then(data => displayWhetherData(data.data))
}
 
const displayWhetherData = (whether) => {
    console.log(whether)
    const {name} = whether;
    const {country} = whether.sys;
    const {temp} = whether.main;
    const {description} = whether.weather[0];
    const {icon} = whether.weather[0];
    console.log(country)
    whetherLocation.textContent = name;
    countryName.textContent = country;
    temperature.textContent = temp;
    temperatureDes.textContent = description;
    const whetherIcon = document.createElement("img");
    whetherIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
    iconDiv.appendChild(whetherIcon);

}