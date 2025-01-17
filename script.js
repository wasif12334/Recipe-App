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

GetRecipe("");
let popUpDetails = (meal)=>{
      
    recipeDetails.innerHTML =`
    <h2>${meal.strMeal}</h2>
    <ul><h3>Ingridents:</h3> ${fetchMealIngridents(meal)}</ul>
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p> 
      `
    recipeDetails.parentElement.style.display = 'block';
}
let fetchMealIngridents = (meal)=>{
    console.log('fetch function called');
    
    let ingredentlist = " ";
    for(let i=1;i<=20;i++){
    let ingredent=meal[`strIngredient${i}`]
    if(ingredent){
        let mesures = meal[`strMeasure${i}`]
        ingredentlist+=`<li>${mesures} ${ ingredent}</li>`
    }
    else
     {
        break;
     }
    
    }
    return ingredentlist;
    console.log('fetch function ended');
}

//Event Listener on seacrh Btn 
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    
    let data = seacrhInput.value.trim();
  
        GetRecipe(data);
        seacrhInput.value = " ";
    
})
//Event Listener on recipecrossBtn 
recipeCrossBtn.addEventListener('click',()=>{
    recipeDetails.parentElement.style.display='none';
})