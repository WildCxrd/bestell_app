function getMealCategoryTemplate(imgSrc, imgAlt, category, mealsTemplates) {
    return `
        <section class="meal_category_section">
            <header class="meal_category_header">
                <div class="meal_category_header_img_wrapper">
                    <img src="${imgSrc}" alt="${imgAlt}">
                </div>                
                <h2>${category}</h2>
            </header>

            <div class="meals_wrapper">
                ${mealsTemplates}
            </div>
        </section>
    `;
}

function getMealTemplate(mealId, imgSrc, imgAlt, name, description, price) {
    return `
        <div id="meal_${mealId}" class="meal_card">
            <div class="meal_card_img_wrapper">
                <img src="${imgSrc}" alt="${imgAlt}">
            </div>
            <div class="meal_card_text_wrapper">
                <h3>${name}</h3>
                <p>${description}</p>
            </div>
            <div class="meal_card_transaction_wrapper">
                <p>${price}</p>
                <button onclick="addMealToBasket('${mealId}')">Add to basket</button>
            </div>
        </div>
    `;
}

function getBasketProductCardTemplate(mealId, mealName, amountInBasket, price) {
    return `
        <div id="product_${mealId}" class="basket_product_card">
            <header class="basket_product_card_header">
                <h3 id="basketProductCardHeading">${mealName}</h3>
            </header>

            <div class="basket_product_card_content_wrapper">
                <div class="basket_product_card_meal_amount_wrapper">
                    <button id="lowerMealAmountButton" class="meal_amount_button" onclick="removeMealFromBasket('${mealId}')">
                        <img id="lowerMealAmountButtonImg" src="assets/icons/delete.svg" alt="">
                    </button>
                    <p id="mealAmount">${amountInBasket}</p>
                    <button id="raiseMealAmountButton" class="meal_amount_button" onclick="addMealToBasket('${mealId}')">
                        <img id="raiseMealAmountButtonImg" src="assets/icons/plus.svg" alt="">
                    </button>
                </div>

                <p id="basketProductCardPrice">${price}</p>
            </div>
        </div>
    `;
}