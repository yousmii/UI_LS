document.addEventListener("DOMContentLoaded", init);

function init() {
    addAsterisks();
}

function addAsterisks() { // Voeg een asterisk toe aan alle labels met de class 'required', just for fun :)
    const requiredLabels = document.querySelectorAll('label.required');
    requiredLabels.forEach(label => {
        label.innerHTML += ' <span class="asterisk">*</span>';
    });
}
