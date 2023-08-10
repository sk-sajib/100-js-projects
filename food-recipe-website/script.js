
const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealContent = document.querySelector(".meal-details-content");
const closeBtn = document.getElementById("recipe-close-btn");


searchBtn.addEventListener("click", getMealList)
mealList.addEventListener("click", getRecipeList)



function getMealList() {

    let searchInput = document.getElementById("search-input").value.trim()
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then( (response) => response.json())
    .then( (data) => {
        let html = ""
       if(data.meals) {
         data.meals.forEach(meal => {
            html += `
            <div class="meal-item" data-id = "${meal.idMeal}">
              <div class="meal-img">
                 <img src="${meal.strMealThumb}" alt="">
              </div>
             <div class="meal-info">
                <h3>${meal.strMeal}</h3>
                <a href="" class="recipe-btn">Get recipe</a>
            </div>
          </div>
            
            `;


         });
       } else{
            html += ` sorry we did find anything based on your query   "${searchInput}" `
       }

       mealList.innerHTML = html;
    })

}


function getRecipeList(e) {
    e.preventDefault()
    //console.log(e.target.classList.contains("recipe-btn"))
     if(e.target.classList.contains("recipe-btn")) {
        let mealItem = e.target.parentElement.parentElement
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then( (res) => res.json())
        .then((data) => {
            mealRecipeModal(data.meals)
        })
     }
}

 
function mealRecipeModal(meal) {

    meal = meal[0]
    
    let html = `
    
    <h2 class = "recipe-title">${meal.strMeal}</h2>
    <p class = "recipe-category">${meal.strCategory}</p>
    <div class = "recipe-instruct">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>
    <div class = "recipe-meal-img">
      <img src = "${meal.strMealThumb}" alt = "">
    </div>
    <div class = "recipe-link">
      <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
    </div>
    
    `

    mealContent.innerHTML = html
    mealContent.parentElement.classList.add("showRecipe")


}

closeBtn.addEventListener("click", function() {
    mealContent.parentElement.classList.remove("showRecipe")
})

