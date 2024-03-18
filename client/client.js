console.log("client.js works so far");
const socket = io();

let roomID = null;
let player1 = false;
let cardi = document.createElement('div');
resetCardI()
let currplayerhand;
let p1card;
let p2card;
let p1cardID;
let p2cardID;
let valsum;
let greater;

function resetCardI(){
    var request = new XMLHttpRequest();
    request.open("GET", "/client/cards/2B.svg", false);
    request.send(null);
    cardi.innerHTML = request.responseText.replaceAll("height=\"3.5in\"", "").replaceAll("width=\"2.5in\"","");
    cardi.style.borderRadius = '10px';
    cardi.style.width = "150px";
}

function makeGame() {
    player1= true;
    let hand = generateHand(30)
    loadCards(hand)
    loadOppCards()
    socket.emit('makeGame', {cardstyle: localStorage.getItem("cardstyle"), hand: hand});
}



window.onload = function () {
    const extractedRoomID = getRoomIDFromURL();

    if (extractedRoomID) {
        // Call joinGame with the extracted room ID
        joinGame(extractedRoomID);
    }
};

function getRoomIDFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('roomID');
}

// Copy Link to Clipboard from button
function copyLinkToClipboard() {
    var link = window.location.href;
    navigator.clipboard.writeText(link).then(function() {
        console.log('Link copied to clipboard!');
        showNotification('Link copied to clipboard!');
    }, function(err) {
        console.error('Failed to copy link: ', err);
    });
}

function showNotification(message) {
    var notification = document.getElementById('clipboard-notification');
    notification.innerText = message;
    notification.style.display = 'block';
    setTimeout(function() {
        notification.style.display = 'none';
    }, 3000); // Hide notification after 3 seconds
}

function joinGame() {
    console.log("joingame room id" + roomID);
    let hand = generateHand(30)
    loadCards(hand)
    loadOppCards()
    socket.emit('joinGame', { roomID: roomID, cardstyle: localStorage.getItem("cardstyle"), hand: hand});
    roomID = getRoomIDFromURL();
    socket.emit('joinGame', {roomID: roomID, cardstyle: localStorage.getItem("cardstyle"), hand: hand});
}
function goToMainPhase() {
    // Go to the main phase logic here
    document.getElementsByClassName("home-ui")[0].style.display = "none";
    document.getElementsByClassName("wait-phase")[0].style.display = "none";
    document.querySelector("#Main-phase").style.display = "flex";
}


socket.on('newGame', (data) => {
    
    roomID = data.roomID;
    console.log(roomID);
    // Hide the home screen
    document.getElementsByClassName("home-ui")[0].style.display = "none";

    document.getElementsByClassName("wait-phase")[0].style.display = "block";

    // Update the URL without a full page reload
    const roomUrl = window.location.origin + '/?roomID=' + roomID;
    history.pushState({ roomID: roomID }, 'Room Created', roomUrl);
});

socket.on("2playersConnected", () => {
    
    console.log(roomID);
    goToMainPhase();
    startTimer();
});

// Note that cardChosen is not the card element but its ID
function sendCardChoice(cardChosen) {
    let choiceEvent;
    
    console.log(roomID);
    if (player1){
        choiceEvent = "player1Choice";
        
    }
    else {
        choiceEvent = "player2Choice";
        console.log("its player2 choice");
    }
   
    socket.emit(choiceEvent, {
      
        cardChosen:cardChosen,
        
        roomID: roomID,
    });
}

socket.on("updatep2withp1card", (data) => {
    p1card = data.cardChosen;
    console.log(p1card);
    if(!player1){
        
        console.log(p2card)
        if (dropright) {
            dropright.appendChild(cardi);
            document.querySelectorAll(".opp-card:not(.hidden)")[0].innerHTML = "";
            document.querySelectorAll(".opp-card:not(.hidden)")[0].classList.add("hidden")
        }
        else {
            console.log("Element with id 'dropright' not found.");
        }

    }
});
socket.on("updatep1withp2card", (data) => {
    console.log(player1);
    p2card = data.cardChosen;
    console.log(p2card);
    if(player1){
        p2card = data.cardChosen;
        console.log(p1card)
      if (dropright) {
            dropright.appendChild(cardi);
            document.querySelectorAll(".opp-card")[0].remove();
        } else {
            console.log("Element with id 'dropright' not found.");
        }
    }
});

socket.on('loadCardStyles', (data) => {
    let displayStyle
    if(socket.id === data.player1){
        displayStyle = data.p2cardstyle
    }
    else {
        displayStyle = data.p1cardstyle
    }
    document.querySelector("#p2handcontainer").classList = displayStyle;
    document.querySelector("#dropr").classList = displayStyle;
    document.querySelector("#c2c").classList = displayStyle;
})

socket.on('gotoVSContainer', (data) => {
    setTimeout(function() {
        document.querySelector(".vs-container").classList.remove("hidden")
        if(data.p1hand.length === 0 && data.p2hand.length === 0){
            if(socket.id === data.player1) {
                let hand = generateHand(30);
                data.p1hand = hand;
                loadCards(data.p1hand)
                loadOppCards()
                socket.emit("updatePlayer1Hand", data)
            }
            else {
                data.p2hand = generateHand(30);
                loadCards(data.p2hand)
                loadOppCards()
                socket.emit("updatePlayer2Hand", data)
            }
            console.log("hands changed")
            // socket.emit("newHand", data)
        }
    }, 1500);
})


function nextRound(){
    document.querySelector(".vs-container").classList.add("hidden")
    dropleft.innerHTML = ""
    dropright.innerHTML = ""
    resetCardI()
}

function flipCards(p1cardid,p2cardid) {
    var p1sidecard = document.querySelector('.TEST1'); // Corrected selector
    var p2sidecard = document.querySelector('.TEST2');
    p1sidecard.classList.add("card3");
    p2sidecard.classList.add("card4");
    
    // Set the src attribute at 50% of the animation
    setTimeout(function() {
        let modifiedSvgp1 = getCard(p1cardid, 'curr');
        p1sidecard.innerHTML =  modifiedSvgp1
        let modifiedSvgp2 = getCard(p2cardid, 'opp');
        p2sidecard.innerHTML =  modifiedSvgp2
    }, 1000);
   
}

function goToClashPhase() {
    document.getElementsByClassName("home-ui")[0].style.display = "none";
    document.getElementsByClassName("wait-phase")[0].style.display = "none";
    document.querySelector("#Main-phase").style.display = "none";
    document.querySelector("#clash-page").style.display = "block";
    console.log("player1cards" + p1card, p2card)
    if(player1) {
        flipCards(p1card, p2card);
    }
    else{
        flipCards(p2card, p1card);
    }

  }


