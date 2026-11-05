function initialize() {
    loadCategoriesWithMeals();
}

function loadCategoriesWithMeals() {
    const mealCategoriesSection = document.getElementById("mealCategoriesSection");
    mealCategoriesSection.innerHTML = "";

    CATEGORIES_WITH_MEALS.forEach(categoryWithMeals => {
        const mealTemplates = getMealTemplates(categoryWithMeals.meals);
        const categoryTemplate = getMealCategoryTemplate(categoryWithMeals.imgSrc, categoryWithMeals.imgAlt, categoryWithMeals.category, mealTemplates);
        mealCategoriesSection.innerHTML += categoryTemplate;
    });
}

function getMealTemplates(meals) {
    let mealTemplates = "";

    meals.forEach(meal => {
        const formattedPrice = formatPriceToEuros(meal.price);
        mealTemplates += getMealTemplate(meal.imgSrc, meal.imgAlt, meal.name, meal.description, formattedPrice);
    });

    return mealTemplates;
}

function formatPriceToEuros(price) {
    return price.toFixed(2).replace(".", ",") + "€";
}