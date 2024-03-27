let cards = document.querySelectorAll("#p1handcontainer div:not(.hidden)")
const dropleft = document.querySelector("#dropl");
const dropright = document.querySelector("#dropr");

let count = 0;
let min = 25;
let max = 35;
const cardsInner = document.querySelectorAll(".card-inner");
const suits = ["D","H","S","C"]
let gameOver = false;

function generateHand(sum) {
// Initialize an array with five cells
    let cells = [0, 0, 0, 0, 0];

// Distribute the sum among the cells
    for (let i = 0; i < 4; i++) {
        // Generate a random number between 1 and the remaining sum or 10, whichever is smaller
        let randomValue = Math.min(Math.floor(Math.random() * (sum - (4 - i))) + 1, 10);

        // Assign the random value to the current cell
        cells[i] = randomValue + suits[Math.floor(Math.random() * suits.length)];

        // Deduct the assigned value from the remaining sum
        sum -= randomValue;
    }

// Assign the remaining sum to the last cell, ensuring it doesn't exceed 10
    cells[4] = Math.min(sum, 10) + suits[Math.floor(Math.random() * suits.length)];
    currplayerhand = cells.join("-").split("-");
    playerhand = cells.join("-").split("-");
    return cells;
}
function getRandominRange(min, max) {
    return parseInt(Math.random() * (max - min)) + min;
}

function loadCards(hand) {
    for (let i = 0; i < hand.length; i++) {
        cards[i].classList.remove("hidden")
        cards[i].innerHTML = getCard(hand[i], "curr")
    }
}

function placeCard(i) {
    console.log("placing card number " + i)
    console.log("card div " + cards[i])
    if (dropleft.children.length === 0) {
        sendCardChoice(playerhand[i]);
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('myCardClass');
        cardDiv.appendChild(cards[i].children[0])
        cardDiv.style.borderRadius = '10px';
        cardDiv.style.width = "149.38px";
        cardDiv.style.height = "209.38px";
        cardDiv.style.display= 'flex'
        cardDiv.style.justifyContent= 'center'
        
        dropleft.appendChild(cardDiv);
        cards[i].classList.add("hidden");
        currplayerhand.splice(currplayerhand.indexOf(playerhand[i]),1)
    }
}

function getCard(card, tag){
    let suit = card.at(-1)
    var request = new XMLHttpRequest();
    request.open("GET", "/client/cards/" + card + ".svg", false);
    request.send(null);
    return request.responseText.replaceAll("height=\"3.5in\"", "").replaceAll("width=\"2.5in\"","").replaceAll("V" + suit, tag + "-V" + suit).replaceAll("S" + suit, tag + "-S" + suit);
}

let countdownTime = 10; // Initial countdown time
let countdownInterval; // Variable to hold the interval

// Function to start the countdown timer
function startTimer() {
    // Synchronize the start time
    const startTime = new Date().getTime() + 12000; // Start time after 5 seconds

    // Start the countdown interval
    countdownInterval = setInterval(() => {
        // Calculate the remaining time
        const currentTime = new Date().getTime();
        const remainingTime = Math.max(0, Math.floor((startTime - currentTime) / 1000));
        updateCountdown(remainingTime);
        if (remainingTime === 0) {
            let index = playerhand.indexOf(currplayerhand[Math.floor(Math.random() * currplayerhand.length)])
            console.log(index)
            console.log(cards[index])
            placeCard(index, cards[index])
        }
    }, 1000);
}

function stopTimer(){
    clearInterval(countdownInterval);
    document.getElementById('timer').innerHTML = "<div class=\"vs-container\">\n" +
    "<p class = \"v\" id = \"V\">V</p>\n" +
    "<p class=\"s\">S</p>\n" +
      "</div>";
       
    document.getElementById("timer").style.display = "flex"
    document.getElementById("timer").style.justifyContent = "center"
    goToClashPhase();
}

// Function to update the countdown element with the given time
function updateCountdown(time) {
  document.getElementById('timer').textContent = time;
}

function goHome(){
    document.querySelector("#error").classList.add("hidden")
    document.querySelector(".home-ui").style.display = ""
    document.querySelector("#Main-phase").style.display = "none"
    history.pushState({}, '',window.location.origin)
}

// Remove the 'selected' class from all options
function deselectAllOptions() {
    const bgOptions = document.querySelectorAll('.bg-option');
    const cardStyleOptions = document.querySelectorAll('.card-style-option');

    bgOptions.forEach(option => option.classList.remove('selected'));
    cardStyleOptions.forEach(option => option.classList.remove('selected'));
}

function updateBg(bg) {
    deselectAllOptions();

    const selectedOption = document.querySelector(`.bg-option.${bg}`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }

    backgroundDiv.classList = bg;
    rulesBg.classList = bg;
    settingsBg.classList = bg;
    localStorage.setItem("background", bg);
}

function updateCustomBg(bg, index, event) {
    if (document.querySelectorAll(".delete-bg")[index].contains(event.target)) {
        return;
    }

    deselectAllOptions();

    const selectedOption = document.querySelector(`.bg-option.${bg}-${index}`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }

    backgroundDiv.classList = `${bg}-${index}`;
    rulesBg.classList = `${bg}-${index}`;
    settingsBg.classList = `${bg}-${index}`;
    localStorage.setItem("background", `${bg}-${index}`);
}

function updateCardStyle(style) {
    deselectAllOptions();

    const selectedOption = document.querySelector(`.card-style-option.${style}`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }

    document.querySelector("#p1handcontainer").classList = style;
    document.querySelector("#dropl").classList = style;
    localStorage.setItem("cardstyle", style);
}