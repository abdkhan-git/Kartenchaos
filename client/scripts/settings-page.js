// AUDIO SETTINGS SLIDERS AND INPUTS FUNCTIONALITY

// Selectors
const musicSlider = document.querySelector('.music-slider');
const musicInput = document.querySelector('.music-input');
const backgroundAudio = document.getElementById("music");
const masterSlider = document.querySelector('.master-slider');
const masterInput = document.querySelector('.master-input');
const sfxAudio = document.getElementById('voiceover');
const sfxMenuSelectAudio = document.getElementById('menu-select');
const sfxSlider = document.querySelector('.sfx-slider');
const sfxInput = document.querySelector('.sfx-input');

// Initial volume settings
const defaultVolume = 0.05;
const defaultSfxVolume = 0.5;
backgroundAudio.volume = defaultVolume;
sfxAudio.volume = defaultSfxVolume;
sfxMenuSelectAudio.volume = defaultSfxVolume;

// Note: Music Slider will act as a multiplier to the Master Volume.
let musicMultiplier = 1;
let sfxMultiplier = 1;

// Event listeners
masterSlider.addEventListener('input', updateVolume);
masterInput.addEventListener('input', handleInputChange);
musicSlider.addEventListener('input', updateVolume);
musicInput.addEventListener('input', handleInputChange);
sfxSlider.addEventListener('input', updateVolume);
sfxInput.addEventListener('input', handleInputChange);

// Function to update volume
function updateVolume() {
    const masterVolume = masterSlider.value / 100;
    musicMultiplier = musicSlider.value / 50;
    const adjustedMusicVolume = (masterVolume / 10) * musicMultiplier;

    sfxMultiplier = sfxSlider.value / 50;
    const adjustedSfxVolume = (masterVolume) * sfxMultiplier;
    backgroundAudio.volume = adjustedMusicVolume;
    sfxAudio.volume = adjustedSfxVolume;
    sfxMenuSelectAudio.volume = adjustedSfxVolume;

    // Update input values
    masterInput.value = masterSlider.value;
    musicInput.value = musicSlider.value;
    sfxInput.value = sfxSlider.value;
}

// Function to handle direct input into input fields
function handleInputChange() {
    const inputValue = parseInt(this.value, 10);

    if (!isNaN(inputValue)) {
        if (this === masterInput) {
            masterSlider.value = inputValue;
        }
        else if (this === musicInput) {
            musicSlider.value = inputValue;
        }
        else if (this === sfxInput) {
            sfxSlider.value = inputValue;
        }

        updateVolume();
    }
}

//GENERAL & AUDIO BUTTONS ON CLICK
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


const audioResetBtn = document.querySelector('.reset-btn');
const generalResetBtn = document.querySelector('.general-reset-btn');

// Audio-Reset
audioResetBtn.addEventListener('click', () => {
    var i = 0;
    sliderInputs.forEach(sliderInput => {
        sliderInput.value = 50;
        sliders[i].value = sliderInputs[i].value;
        backgroundAudio.volume = defaultVolume;
        sfxAudio.volume = defaultSfxVolume;
        sfxMenuSelectAudio.volume = defaultSfxVolume;
        musicMultiplier = 1;
        sfxMultiplier = 1;
        i++;
    })


    const defaultSound = document.querySelector('.menu .default-sound');
    document.querySelector('.menu .hidden').classList.remove('hidden');
    defaultSound.classList.add('hidden');
    document.querySelector('.selected').innerText = defaultSound.innerText;
    audioChoiceLoad(defaultSound);


});

generalResetBtn.addEventListener('click', () => {
    updateBg("bg-0");
    updateCardStyle('default');
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

// Select between options for bg music
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

    for(let i = 0; i < options.length; i++){
        let option = options[i]
        option.addEventListener('click', () => {
            options.forEach(optionTemp => {
                optionTemp.classList.remove("hidden");
            })
            option.classList.add("hidden")
            selected.innerText = option.innerText;
            audioChoiceLoad(option);

            // Save music option to local storage
            localStorage.setItem("musicOption", i);
        });
    }
    document.addEventListener("click", (event) => {
        if(!select.contains(event.target)){
            menu.classList.remove('menu-open');
            caret.classList.remove('caret-rotate');
            select.classList.remove('selected-clicked');
        }
    })
});

function audioChoiceLoad(audioOption) {
    const audioElement = document.getElementById("music");
    audioElement.src = "Audio/" + audioOption.innerText + ".mp3";
    audioElement.load();
    audioElement.play();
}

// const bgStockOptions = document.querySelectorAll(".bg-stock")
// let bgCustomOptions = document.querySelectorAll(".bg-custom")
let bgDelete = document.querySelectorAll(".delete-bg")
const rulesBg = document.querySelector("#rules-background")
const settingsBg = document.querySelector("#setting-background")
const backgroundDiv = document.querySelector("#bg")

const settingsButton = document.querySelector("#settings");
const settingsDiv = document.querySelector("#settings-page");
const saveButtons = document.querySelectorAll(".save-btn")
settingsButton.addEventListener("click", () => {
    settingsDiv.classList.remove("hidden")
})

for(saveButton of saveButtons)
    saveButton.addEventListener("click", () => {
        settingsDiv.classList.add("hidden")
    })

const sliderInputs = document.querySelectorAll(".slider-input");
const sliders = document.querySelectorAll(".range-style");
for(let i = 0; i < 3; i++) {
    sliderInputs[i].addEventListener("input", ()=>{
        if(sliderInputs[i].value > 100){
            sliderInputs[i].value = 100;
        }
        if(sliderInputs[i].value < 0){
            sliderInputs[i].value = 0;
        }
        sliderInputs[i].addEventListener("change", ()=>{
            if(sliderInputs[i].value === "") {
                sliderInputs[i].value = sliderInputs[i].placeholder;
                sliders[i].value = sliderInputs[i].value;
                updateVolume();
            }
            sliderInputs[i].placeholder = sliderInputs[i].value
        })
        sliders[i].addEventListener("input", () => {
            sliderInputs[i].value = sliders[i].value;
        })
        sliderInputs[i].value = parseInt(sliderInputs[i].value).toFixed(0)
        sliders[i].value = sliderInputs[i].value; // Update corresponding slider value
    });
    sliders[i].addEventListener("input", () => { // Add input event listener to each slider
        sliderInputs[i].value = sliders[i].value; // Update corresponding slider input value
    });
}

function bgUpload(event) {
    var selectedFile = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
        let custombgs = localStorage.getItem("custombgs")
        if(custombgs && custombgs.includes(event.target.result)){
            return;
        }
        custombgs += event.target.result + "\n";
        localStorage.setItem("custombgs", custombgs.replaceAll("null",""))
        loadCustomBgs();
        updateBg("custombg-" + ((custombgs.split("\n").length)-2))
    };
    reader.readAsDataURL(selectedFile);
    document.querySelector(".bg-custom-select").value = "";
}

const bgOptions = document.querySelector(".bg-options")
const stockBgContainer = document.querySelector(".bg-stock-container")
function loadCustomBgs() {
    bgOptions.innerHTML = stockBgContainer.innerHTML;
    customBgStyle.innerHTML = "";
    if (localStorage.getItem("custombgs") === null) {
        const uploadDiv = document.querySelector(".bg-custom-upload-container")
        bgOptions.innerHTML += uploadDiv.outerHTML
        bgOptions.querySelector(".bg-custom-upload-container").classList.remove("hidden")
        return;
    }
    let custombgs = localStorage.getItem("custombgs").split("\n")
    for (let i = 0; i < custombgs.length - 1; i++) {
        customBgStyle.innerHTML += `.custombg-${i} {
            background-image: url("${custombgs[i]}");
            background-repeat: no-repeat;
            background-size: cover;
            height: 100%;
            width: 100%;
        }`;

        bgOptions.innerHTML += `<div class="bg-option bg-custom custombg-${i}" onclick="updateCustomBg('custombg', ${i}, this)">
            <img src="/client/Images/delete.svg" class="hidden delete-bg" onclick="deleteBg(${i})">
        </div>`;
    }

    const uploadDiv = document.querySelector(".bg-custom-upload-container")
    bgOptions.innerHTML += uploadDiv.outerHTML
    bgOptions.querySelector(".bg-custom-upload-container").classList.remove("hidden")
}

function deleteBg(i) {
    let custombgs = localStorage.getItem("custombgs").split("\n")
    console.log(custombgs)
    custombgs.splice(i, 1);
    console.log(custombgs)
    localStorage.setItem("custombgs", custombgs.join("\n"))
    if (localStorage.getItem("background") === "custombg-" + i) {
        updateBg("bg-0")
    }
    loadCustomBgs()
}

function updateBg(bg) {
    const bgOptions = document.querySelectorAll('.bg-option');
    bgOptions.forEach(option => option.classList.remove('selected-option'));

    const selectedOption = document.querySelector(`.bg-option.${bg}`);
    if (selectedOption) {
        selectedOption.classList.add('selected-option');
    }

    backgroundDiv.classList = bg;
    rulesBg.classList = bg;
    settingsBg.classList = bg;
    localStorage.setItem("background", bg);
}
function updateCustomBg(bg, index, event){
    if(document.querySelectorAll(".delete-bg")[index].contains(event.target)){
        return;
    }
    updateBg(bg + "-" + index);
    const bgOptions = document.querySelectorAll('.bg-option');
    bgOptions.forEach(option => option.classList.remove('selected-option'));

    const selectedOption = document.querySelector(`.bg-option.${bg}-${index}`);
    if (selectedOption) {
        selectedOption.classList.add('selected-option');
    }
}
function updateCardStyle(style) {
    const cardStyleOptions = document.querySelectorAll('.card-style-option');
    cardStyleOptions.forEach(option => option.classList.remove('selected-option'));

    const selectedOption = document.querySelector(`.card-style-option.${style}`);
    if (selectedOption) {
        selectedOption.classList.add('selected-option');
    }

    document.querySelector("#p1handcontainer").classList = style;
    document.querySelector("#dropl").classList = style;
    localStorage.setItem("cardstyle", style);
    updateCardStyleForAll(getRoomIDFromURL(), style);
}
document.querySelector(".settings-main-phase").addEventListener("click", ()=> {
    settingsDiv.classList.remove("hidden")
})