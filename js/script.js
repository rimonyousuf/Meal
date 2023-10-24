const loadMeals = (textSearch) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${textSearch}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))
}

const displayMeals = meals => {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = '';
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('row');
        mealDiv.innerHTML = `
        <div class="row g-3 border rounded-1">
            <div class="col-md-4">
                <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${meal.strArea}</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick = "loadUserMeal(${meal.idMeal})" type="button" class="btn btn-warning w-50 fw-bold" data-bs-toggle="modal" data-bs-target="#exampleModal">
            View Details
            </button>
                </div>
            </div>
        </div>
        `;
        mealContainer.appendChild(mealDiv);
    })
}

const searchMeal = () => {
    const textSearch = document.getElementById('btn-search').value;
    loadMeals(textSearch);
}

const loadUserMeal = (idMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayUserMeal(data.meals[0]))
}

const displayUserMeal = meal => {
    document.getElementById('exampleModalLabel').innerText = meal.strMeal;
    document.getElementById('exampleModalBody').innerHTML = `
        <img class = "img-fluid mb-3" src = "${meal.strMealThumb}">
        <p class="mb-3"><span class="fw-bold">Category:</span> ${meal.strCategory}</p>
        <p class="mb-3"><span class="fw-bold">Instruction:</span> ${meal.strInstructions}</p>
        <p class="mb-3"><span class="fw-bold">Youtube:</span> https://www.youtube.com</p>
    `
}

loadMeals('rice');