import {stickers_data} from "./data.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category) {
        const filteredProducts = stickers_data.filter(sticker => sticker.category === category);
        addProducts(filteredProducts);
    } else {
        addProducts(stickers_data);
    }
    addFilter();
}

function addProducts(stickers) {
    const productContainer = document.getElementById('productList');
    productContainer.innerHTML = ''; // Clear existing products

    stickers.forEach(sticker => {
        const productElement = document.createElement('li');
        const productLink = document.createElement('a');
        productLink.href = `productdetail.html?name=${sticker.name}`;
        productLink.innerHTML = `
            <img src="${sticker.image}" alt="${sticker.name}">
            <ul>
                <li>${sticker.name}</li>
                <li>${sticker.price} EUR</li>
            </ul>
        `;

        if (sticker.label !== '') {
            const label = document.createElement('span');
            label.classList.add('label');

            switch (sticker.label) {
                case 'new':
                    label.classList.add('new');
                    label.innerText = 'New!';
                    break;
                case 'sold-out':
                    label.classList.add('sold-out');
                    label.innerText = 'Sold Out';
                    productElement.classList.add('sold-out');
                    break;
                case 'on-sale':
                    label.classList.add('on-sale');
                    label.innerText = 'On Sale';
                    break;
            }
            productLink.appendChild(label);
        }
        productElement.appendChild(productLink);
        productContainer.appendChild(productElement);
    });
}

function addFilter() {
    const filters = document.querySelectorAll('#filters input[type="checkbox"]');
    filters.forEach(filter => {
        filter.addEventListener('change', filterProducts);
    });
}

function filterProducts() {
    const selectedFilters = Array.from(document.querySelectorAll('#filters input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);

    let filteredProducts = stickers_data;

    if (selectedFilters.length > 0) {
        filteredProducts = stickers_data.filter(sticker =>
            selectedFilters.includes(sticker.label) || selectedFilters.includes(sticker.category)
        );
    }
    addProducts(filteredProducts);
}