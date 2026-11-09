function formatPriceToEuros(priceNumber) {
    return `${priceNumber.toFixed(2).replace(".", ",")}€`;
}

function saveInLocalStorage(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
}

function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}