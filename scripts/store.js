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
    const allMealsInLocalStorage = getAllMealsFromLocalStorage();

    if (allMealsInLocalStorage.length > 0) {
        ensureRenderedFilledBaskedTemplate();
        renderBasketMeals(allMealsInLocalStorage);
    } else {
        renderEmptyBasketTemplate();
    }

    const mealsInBasketCount = getMealsInBasketCount(allMealsInLocalStorage);
    setMenuBarBasketButtonMealCount(mealsInBasketCount);
}

function ensureRenderedFilledBaskedTemplate() {
    const basketProductCardsWrapper = document.getElementById("basketProductCardsWrapper");

    if (basketProductCardsWrapper == null) {
        const basketContentWrapper = document.getElementById("basketContentWrapper");
        const filledBasketTemplate = getFilledBasketTemplate();
        basketContentWrapper.innerHTML = filledBasketTemplate;
    }
}

function renderBasketMeals(meals) {
    const basketProductCardsWrapper = document.getElementById("basketProductCardsWrapper");
    basketProductCardsWrapper.innerHTML = "";

    let subtotal = 0.0;

    meals.forEach(meal => {
        subtotal += meal.price * meal.amountInBasket;

        const lowerMealAmountButtonImgSrcAndAlt = getLowerMealAmountButtonImgSrAndAlt(meal.amountInBasket);
        basketProductCardsWrapper.innerHTML += getBasketProductCardTemplate(meal.id, meal.name, meal.amountInBasket,
            formatPriceToEuros(meal.price), lowerMealAmountButtonImgSrcAndAlt[0], lowerMealAmountButtonImgSrcAndAlt[1]);
    });

    setBasketAmountTexts(subtotal);
}

function renderEmptyBasketTemplate() {
    const basketContentWrapper = document.getElementById("basketContentWrapper");
    const emptyBasketTemplate = getEmptyBasketTemplate();

    basketContentWrapper.innerHTML = emptyBasketTemplate;
}

function addMealToBasket(mealId) {
    let meal = getFromLocalStorage(mealId);

    if (meal != null) {
        meal.amountInBasket++;
    }
    else {
        meal = getMealFromDbFile(mealId);
        meal.amountInBasket = 1;
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

function placeOrder() {
    clearLocalStorage();
    renderBasket();
    openOrderConfirmedDialog();
}

function openOrderConfirmedDialog() {
    const orderConfirmedDialog = document.getElementById("orderConfirmedDialog");
    orderConfirmedDialog.showModal();
}

function closeOrderConfirmedDialog() {
    const orderConfirmedDialog = document.getElementById("orderConfirmedDialog");
    orderConfirmedDialog.close();
}

function showMobileBasket() {
    const basket = document.getElementById("basket");
    basket.showModal();
}

//#region set functions
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
    menuBarBasketButtonMealCount
}

function setMenuBarBasketButtonMealCount(mealsInBasketCount) {
    const menuBarBasketButtonMealCount = document.getElementById("menuBarBasketButtonMealCount");
    menuBarBasketButtonMealCount.innerHTML = mealsInBasketCount;
}
//#endregion

//#region get functions
function getLowerMealAmountButtonImgSrAndAlt(mealAmountInBasket) {
    if (mealAmountInBasket > 1) {
        return ["assets/icons/minus.svg", "A minus."];
    }
    else {
        return ["assets/icons/delete.svg", "A trash bin."];
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

    return allMeals;
}

function getMealFromDbFile(mealId) {
    for (let categoriesWithMealsIndex = 0; categoriesWithMealsIndex < CATEGORIES_WITH_MEALS.length; categoriesWithMealsIndex++) {
        const category = CATEGORIES_WITH_MEALS[categoriesWithMealsIndex];

        for (let mealsIndex = 0; mealsIndex < category.meals.length; mealsIndex++) {
            const meal = category.meals[mealsIndex];

            if (meal.id == mealId) {
                return meal;
            }
        }
    }
}

function getMealsInBasketCount(meals) {
    let mealsInBasketCount = 0;

    meals.forEach(meal => {
        mealsInBasketCount += meal.amountInBasket;
    });

    return mealsInBasketCount;
}
//#endregion