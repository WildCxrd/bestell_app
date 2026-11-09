const deliveryFee = 4.99;

function initialize() {
    renderCategoriesWithMeals();
    renderBasket();
}

function renderCategoriesWithMeals() {
    const mealCategoriesSection = document.getElementById("mealCategoriesSection");
    mealCategoriesSection.innerHTML = "";

    CATEGORIES_WITH_MEALS.forEach(categoryWithMeals => {
        const mealTemplates = getMealTemplates(categoryWithMeals.meals);
        const categoryTemplate = getMealCategoryTemplate(categoryWithMeals.imgSrc, categoryWithMeals.imgAlt, categoryWithMeals.category, mealTemplates);
        mealCategoriesSection.innerHTML += categoryTemplate;
    });
}

function renderBasket() {
    const basketProductCardsWrapper = document.getElementById("basketProductCardsWrapper");
    const allMealsInLocalStorage = getAllMealsFromLocalStorage();

    basketProductCardsWrapper.innerHTML = "";

    let subtotal = 0.0;

    allMealsInLocalStorage.forEach(meal => {
        subtotal += meal.price * meal.amountInBasket;
        basketProductCardsWrapper.innerHTML += getBasketProductCardTemplate(meal.id, meal.name, meal.amountInBasket, formatPriceToEuros(meal.price));
    });

    setBasketAmountTexts(subtotal);
}

function setBasketAmountTexts(subtotal) {
    const subtotalText = document.getElementById("subtotalText");
    const deliveryFeeText = document.getElementById("deliveryFeeText");
    const totalText = document.getElementById("totalText");
    const basketPayButton = document.getElementById("basketPayButton");
    const total = subtotal + deliveryFee;
    const totalInEuros = formatPriceToEuros(total);

    subtotalText.innerHTML = formatPriceToEuros(subtotal);
    deliveryFeeText.innerHTML = formatPriceToEuros(deliveryFee);
    totalText.innerHTML = totalInEuros;
    basketPayButton.innerHTML = `Buy now (${totalInEuros})`;
}

function addMealToBasket(mealId) {
    let meal = getFromLocalStorage(mealId);

    if (meal != null) {
        meal.amountInBasket++;
    }
    else {
        meal = getMealFromDb(mealId);
        meal.amountInBasket++;
    }

    saveInLocalStorage(meal.id, meal);
    renderBasket();
}

function removeMealFromBasket(mealId) {
    let meal = getFromLocalStorage(mealId);

    if (meal != null) {
        meal.amountInBasket--;

        if (meal.amountInBasket > 0) {
            saveInLocalStorage(meal.id, meal);
        }
        else {
            removeFromLocalStorage(meal.id);
        }

        renderBasket();
    }
}

function getMealTemplates(meals) {
    let mealTemplates = "";

    meals.forEach(meal => {
        const formattedPrice = formatPriceToEuros(meal.price);
        mealTemplates += getMealTemplate(meal.id, meal.imgSrc, meal.imgAlt, meal.name, meal.description, formattedPrice);
    });

    return mealTemplates;
}

function getAllMealsFromLocalStorage() {
    const allMeals = [];
    const keysInLocalStorage = Object.keys(localStorage);

    keysInLocalStorage.forEach(element => {
        if (element.startsWith("m_")) {
            const meal = JSON.parse(localStorage.getItem(element));
            allMeals.push(meal);
        }
    });

    // return allProducts.toSorted((bookOne, bookTwo) => bookOne.publishedYear - bookTwo.publishedYear);
    return allMeals;
}

function getMealFromDb(mealId) {
    for (const categoryWithMeals of CATEGORIES_WITH_MEALS) {
        return categoryWithMeals.meals.find(meal => meal.id == mealId);
    }
}