function getMealCategoryTemplate(imgSrc, imgAlt, category, mealsTemplates) {
    return `
        <section class="meal_category_section">
            <header class="meal_category_header">
                <img src="${imgSrc}" alt="${imgAlt}">
                <h2>${category}</h2>
            </header>

            <div class="meals_wrapper">
                ${mealsTemplates}
            </div>
        </section>
    `;
}

function getMealTemplate(imgSrc, imgAlt, name, description, price){
    return `
        <div class="meal_card">
            <div class="meal_card_img_wrapper">
                <img src="${imgSrc}" alt="${imgAlt}">
            </div>
            <div class="meal_card_text_wrapper">
                <h3>${name}</h3>
                <p>${description}</p>
            </div>
            <div class="meal_card_transaction_wrapper">
                <p>${price}</p>
                <button>Add to basket</button>
            </div>
        </div>
    `;
}