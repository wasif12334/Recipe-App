let seacrhInput = document.querySelector('.search-input');
let searchBtn = document.querySelector('.search-btn');
let recipeContainer = document.querySelector('.recipe-container');
let header = document.querySelector('.heading');
let recipeCrossBtn = document.querySelector('.crosBtn');
let recipeDetails = document.querySelector('.recipe-description');

// Function for acessing the api and showing output 
async function GetRecipe(value){
    header.innerHTML = `Fetching Recipes`
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
    let resopnse =await data.json();
    header.innerHTML = `${value.toUpperCase()} RECIPES`
    // console.log(resopnse);
    resopnse.meals.forEach(meal => {
        let responseDiv = document.createElement('div');
        responseDiv.classList.add('recipe-card');     
        responseDiv.innerHTML =`
        <img src="${meal.strMealThumb} "> 
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea} Dish </p>
        <p><span>Belongs To </span>${meal.strCategory}</p>
        `
        const button = document.createElement('button');
        button.textContent = 'View Recipe';
        button.classList.add('card-btn');
        responseDiv.appendChild(button)
        recipeContainer.appendChild(responseDiv);
        button.addEventListener('click',()=>{
            popUpDetails(meal);
        })
        
    });
    
   
    
}

let popUpDetails = (meal)=>{
    console.log('view btn clicked');
    console.log(meal);
    
    recipeDetails.innerHTML =`
    <h2>${meal.strMeal}</h2>
    <ul>${fetchMealIngridents(meal)}</ul>

    <h3>${meal.strInstructions}</h3>
    
    
    `
    recipeDetails.parentElement.style.display = 'block';
}

let fetchMealIngridents = (meal)=>{
    let ingredentlist = " ";
    for(let i=1;i<=20;i++){
    let ingredent=meal[`strIngredient${i}`]
    if(ingredent){
        let mesures = meal[`strMeasure${i}`]
        ingredentlist+=`<li>${measure } ${ ingredent}</li>`
    }
    }
}
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    
    let data = seacrhInput.value.trim();
  
        GetRecipe(data);
        seacrhInput.value = " ";
    
})

