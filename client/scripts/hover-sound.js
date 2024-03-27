document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll("button");
    const bgOptions = document.querySelectorAll('.bg-option');
    const cardStyleOptions = document.querySelectorAll('.card-style-option');
    const voiceover = document.getElementById('voiceover');
    const menuSelect = document.getElementById('menu-select');

    function playSound(audio) {
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    }

    buttons.forEach(button => {
        button.addEventListener("mouseover", () => playSound(voiceover));
    });

    bgOptions.forEach(option => {
        option.addEventListener('mouseover', () => playSound(menuSelect));
    });

    cardStyleOptions.forEach(option => {
        option.addEventListener('mouseover', () => playSound(menuSelect));
    });

    document.querySelector(".card1clash").innerHTML = getCard("2B", "currvs").replaceAll("B2", "B2-curr");
    document.querySelector(".card2clash").innerHTML = getCard("2B", "oppvs").replaceAll("B2", "B2-opp");

    const storedCardStyle = localStorage.getItem('cardstyle');
    if (storedCardStyle) {
        updateCardStyle(storedCardStyle);
    }

    const storedBackground = localStorage.getItem('background');
    if (storedBackground) {
        updateBg(storedBackground);
    }

    loadCustomBgs();
});
