
document.addEventListener('DOMContentLoaded', function() {
  var audio = document.getElementById("music");
  audio.volume = 0.025;
});



//GENERAL/AUDIO BUTTONS ON CLICK
const btnElList = document.querySelectorAll('.main-btn');

btnElList.forEach(btnEl => {
    btnEl.addEventListener('click', () => {
        // Check if any button element has class 'clicked'
        const clickedBtns = document.querySelectorAll('.clicked');
        // Remove 'clicked' class from all elements with class 'clicked'
        clickedBtns.forEach(clickedBtn => {
            clickedBtn.classList.remove('clicked');
            clickedBtn.classList.add('hover-enabled');
        });
        // Add 'clicked' class to the currently clicked button
        btnEl.classList.remove('hover-enabled');
        btnEl.classList.add('clicked');
    });
});



//LOADS UP CLICKED SECTION
const audioEl = document.querySelector('#Audio-Setting-Option');

const generalEl = document.querySelector('#General-Setting-Option');

const generalBtn = document.querySelector('.general button');

const audioBtn = document.querySelector('.audio button');

audioBtn.addEventListener('click', () => {
    audioEl.classList.remove('display-disabled');
    generalEl.classList.add('display-disabled');
});

generalBtn.addEventListener('click', () => {
    generalEl.classList.remove('display-disabled');
    audioEl.classList.add('display-disabled');
});



// VOLUME SLIDERS
// const sliders = document.querySelectorAll("input");
// const slideValues = document.querySelectorAll(".slider-value span");

// sliders.forEach((slider, index) => {
//     slider.oninput = () => {
//         let value = slider.value;
//         slideValues[index].textContent = value;
//         slideValues[index].style.left = (value / 2) + "%";
//         slideValues[index].classList.add("show");
//     };
//
//     slider.onblur = () => {
//         slideValues[index].classList.remove("show");
//     };
// });



//MUSIC CHOOSER
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
        select.classList.toggle('selected-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('-selected-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');

            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
        });
    });
});



// HANDLING BACKGROUND OPTIONS
const bgOptions = document.querySelectorAll(".bg-option"); // Select all elements with the class ".bg-option"
const backgroundDiv = document.querySelector("#bg"); // Select the element with the id "#bg"
for (let i = 0; i < bgOptions.length; i++) { // Loop through each background option
    bgOptions[i].addEventListener("click", () => { // Add click event listener to each background option
        backgroundDiv.classList = ""; // Remove all existing classes from backgroundDiv
        backgroundDiv.classList.add("bg-" + i); // Add a new class based on the index of the clicked element
    });
}




// HANDLING SETTINGS DISPLAY
const settingsButton = document.querySelector("#settings"); // Select the element with the id "#settings"
const settingsDiv = document.querySelector("#settings-page"); // Select the element with the id "#settings-page"
const saveButtons = document.querySelectorAll(".save-btn"); // Select all elements with the class ".save-btn"
settingsButton.addEventListener("click", () => { // Add click event listener to settingsButton
    settingsDiv.classList.remove("hidden"); // Remove the class "hidden" from settingsDiv
});
for (saveButton of saveButtons) // Loop through each save button
    saveButton.addEventListener("click", () => { // Add click event listener to each save button
        settingsDiv.classList.add("hidden"); // Add the class "hidden" to settingsDiv
    });

// HANDLES SLIDERS
const sliderInputs = document.querySelectorAll(".slider-input"); // Select all elements with the class ".slider-input"
const sliders = document.querySelectorAll(".range-style"); // Select all elements with the class ".range-style"
for (let i = 0; i < 3; i++) { // Loop through the first three elements (sliders)
    sliderInputs[i].addEventListener("change", () => { // Add change event listener to each slider input
        if (sliderInputs[i].value > 100) { // Ensure slider input value is between 0 and 100
            sliderInputs[i].value = 100;
        }
        if (sliderInputs[i].value <= 0) {
            sliderInputs[i].value = 0;
        }
        sliders[i].value = sliderInputs[i].value; // Update corresponding slider value
    });
    sliders[i].addEventListener("input", () => { // Add input event listener to each slider
        sliderInputs[i].value = sliders[i].value; // Update corresponding slider input value
    });
}


//RESET OPTION

const audioResetBtn = document.querySelector('.audio-reset-btn');
const generalResetBtn = document.querySelector('.general-reset-btn');

// Audio-Reset
audioResetBtn.addEventListener('click', () => {
    var i = 0;
    sliderInputs.forEach(sliderInput => {
        sliderInput.value = 50;
        sliders[i].value = sliderInputs[i].value;
        i++;
    });

    document.querySelector('.selected').innerHTML = 'Default';
});

// General-Reset
generalResetBtn.addEventListener('click', () =>{
    backgroundDiv.classList = "";
    backgroundDiv.classList.add("bg-0");

})
