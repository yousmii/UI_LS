import {stickers_data} from "./data.js";

document.addEventListener("DOMContentLoaded", init);


function init() {
    loadCustomerDetails();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('product').startsWith('custom')) {
        loadCustomProduct();
        return;
    }

    const product = stickers_data.find(sticker => sticker.name === urlParams.get('product'));

    if (!product) {
        window.location.href = 'products.html'; // Redirect to products page if no name is provided
    }
    loadProduct(product);
}

function loadCustomerDetails() {
    const urlParams = new URLSearchParams(window.location.search);

    const voornaam = urlParams.get('voornaam');
    const naam = urlParams.get('naam');
    const email = urlParams.get('email');
    const telefoon = urlParams.get('telefoon');
    const adres = urlParams.get('adres');
    const postcode = urlParams.get('postcode');
    const stad = urlParams.get('stad');
    const opmerkingen = urlParams.get('opmerkingen');

    document.getElementById('voornaam').textContent = voornaam;
    document.getElementById('naam').textContent = naam;
    document.getElementById('email').textContent = email;
    document.getElementById('telefoonnummer').textContent = telefoon;
    document.getElementById('adres').textContent = adres;
    document.getElementById('postcode').textContent = postcode;
    document.getElementById('stad').textContent = stad;
    document.getElementById('opmerkingen').textContent = opmerkingen;
}

function loadProduct(product) {
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

function loadCustomProduct() {
    const urlParams = new URLSearchParams(window.location.search);

    const product = {
        name: 'Custom Sticker',
        image: '../media/custom-option.png',
        alt: 'Custom Sticker',
        description: 'A custom sticker made just for you!',
        price: '5 EUR',
        size: urlParams.get('size'),
        material: 'Waterproof Matte Vinyl',
        label: ''
    };
    loadProduct(product);
}