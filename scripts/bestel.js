import {stickers_data} from "./data.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
    addAsterisks();
    customOptionListener();
    addStickerOptions();
}

function addAsterisks() { // Voeg een asterisk toe aan alle labels met de class 'required', just for fun :)
    const requiredLabels = document.querySelectorAll('label.required');
    requiredLabels.forEach(label => {
        label.innerHTML += ' <span class="asterisk">*</span>';
    });
}

function customOptionListener() {
    const productSelect = document.getElementById('product');
    const fileUploadContainer = document.getElementById('custom-option-container');
    const fileUploadInput = document.getElementById('fileUpload');

    productSelect.addEventListener('change', function () {
        const selectedOption = productSelect.value;
        if (selectedOption === 'custom_single') {
            fileUploadContainer.innerHTML = `
                <label for="fileUpload">Upload a png for your custom sticker: <span class="asterisk">*</span></label>
                <input type="file" id="fileUpload" name="fileUpload" accept=".jpg, .jpeg, .png" required>
                <label for="size">Size: <span class="asterisk">*</span> </label> 
                <input type="text" id="size" name="size" placeholder="eg. 2x3" required pattern="^\\d+\\s*x\\s*\\d+$">
            `;
            const sizeInput = document.getElementById('size');
        } else {
            fileUploadContainer.innerHTML = ``;
        }
    });
}

function addStickerOptions() {
    const productSelect = document.getElementById('product');

    stickers_data.forEach(sticker => {
        const option = document.createElement('option');
        option.value = sticker.name;
        option.textContent = sticker.name;
        productSelect.appendChild(option);
    });
}
