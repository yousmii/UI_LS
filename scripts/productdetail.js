import {stickers_data} from "./data.js";




document.addEventListener("DOMContentLoaded", init);

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    document.title = name;

    if (!name) {
        window.location.href = 'products.html'; // Redirect to products page if no name is provided
    }
    loadProduct(stickers_data.find(sticker => sticker.name === name));
}

function loadProduct(product){
    // Update the base HTML elements
    document.getElementById('pagetitle').textContent = product.name + " Productpagina";
    document.getElementById('breadcrumbTitle').textContent = product.name;

    // Get the elements by their IDs
    const productImage = document.getElementById('productImage');
    const productTitle = document.getElementById('productTitle');
    const productDescription = document.getElementById('productDescription');
    const productDetails = document.getElementById('productDetails');

    // Set the properties of these elements
    productImage.src = product.image;
    productImage.alt = product.alt;
    productTitle.textContent = product.name;
    productDescription.textContent = product.description;

    // Edit the label field if the product has one
    if (product.label !== '') {
        const label = document.getElementById('label');
        label.classList.add('label');

        switch (product.label) {
            case 'new':
                label.classList.add('new');
                label.innerText = 'New!';
                break;
            case 'sold-out':
                label.classList.add('sold-out');
                label.innerText = 'Sold Out';
                break;
            case 'on-sale':
                label.classList.add('on-sale');
                label.innerText = 'On Sale';
                break;
        }
    }

    // Add details
    productDetails.innerHTML = `
        <h3 class="hiddenTitle">Productdetails:</h3>
        <details open>
            <summary>Prijs</summary>
            <span>${product.price}</span>
        </details>
        <details open>
            <summary>Formaat</summary>
            <span>${product.size}</span>
        </details>
        <details open>
            <summary>Materiaal</summary>
            <span>${product.material}</span>
        </details>
    `;
}