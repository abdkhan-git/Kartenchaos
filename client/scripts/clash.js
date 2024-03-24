
const p1Hp = document.getElementById('p1-health-bar');
const p2Hp = document.getElementById('p2-health-bar');
const p1DamageIndicatorContainer = document.querySelector('.p1-damage-indicator-container');
const p1DamageTaken = document.querySelector('.p1-damage-taken');
const p2DamageIndicatorContainer = document.querySelector('.p2-damage-indicator-container');
const p2DamageTaken = document.querySelector('.p2-damage-taken');

// Load Player HP + Adds Animation as HP loads
loadPlayerHP(p1Hp);
loadPlayerHP(p2Hp);


// ATTACK BUTTONS FUNCTIONALITY, 
//*** ONLY FOR TESTING PURPOSES ***
const p1Attack = document.querySelector('.p1-attack');
const p2Attack = document.querySelector('.p2-attack');
var dmg = 10;

function damageP2(damage){
    p2Hp.value = attackEnemy(p2Hp.value, damage);
    displayDamageTaken(p2DamageIndicatorContainer, p2DamageTaken, p2Hp, 'right', damage);
    if(p2Hp.value === 0){
        winScreen()
    }
}

function damageP1(damage){
    p1Hp.value = attackEnemy(p1Hp.value, damage);
    console.log(p1Hp.value)
    displayDamageTaken(p1DamageIndicatorContainer, p1DamageTaken, p1Hp, 'left', damage);
    if(p1Hp.value === 0){
        loseScreen()
    }
}

function winScreen(){
    gameOver = true;
    setTimeout(() => {
        document.querySelector("#victory").classList.remove("hidden")
        document.querySelector("#victory").play()
        console.log("you win")
    }, 1000)
}

function loseScreen(){
    gameOver = true;
    setTimeout(() => {
        document.querySelector("#defeat").classList.remove("hidden")
        document.querySelector("#defeat").play()
        console.log("you lose")
    }, 1000)
}
function attackEnemy(hp, dmg){
    return Math.max(0, hp - dmg);
}



// Spawns Player HP in the begining of the Screen
function loadPlayerHP(hp) {
    var totalHP = hp.value;
    hp.value = 0;
    const incrementDelay = 20;
    for (let i = 0; i <= totalHP; i++) {
        setTimeout(function() {
            hp.value = i;
        }, i * incrementDelay);
    }
}

document.getElementById('shatterButton').addEventListener('click', function () {
    shatter()
});



// Wait for the 'S' animation to finish, then add class to position 'V' element in the center
document.addEventListener('DOMContentLoaded', function() {
    var vElement = document.querySelector('.v');

    // Function to be executed after animation finishes
    function afterAnimation() {
        setTimeout(function() {
            vElement.classList.add('new-position');
        }, 1500);
    }

    // Detect animation end for various browsers
    vElement.addEventListener('animationend', afterAnimation);
    vElement.addEventListener('webkitAnimationEnd', afterAnimation);
    vElement.addEventListener('oanimationend', afterAnimation);
    vElement.addEventListener('MSAnimationEnd', afterAnimation);
});



function displayDamageTaken(damageIndicatorContainer, damageTaken, hp, direction, damage) {
    damageIndicatorContainer.style.animation = 'none';
    damageIndicatorContainer.offsetHeight;
    damageIndicatorContainer.style[direction] = `${hp.value}%`;
    damageIndicatorContainer.children[0].innerText = "-" + damage
    if(hp.value === 100) {
        return;
    }

    setTimeout(function() {
        damageTaken.classList.remove('hidden');
        damageIndicatorContainer.style.animation = 'fallingDown 0.7s linear forwards';
        setTimeout(function(){
            damageTaken.classList.add('hidden');
        }, 800);
    }, 100);
}

const TWO_PI = Math.PI * 2.5;
const imageWidth = 149.38; // Assuming image width
const imageHeight = 209.38; // Assuming image height

var imageIndex = 0;
var vertices = [];
var indices = [];
var fragments = [];

document.getElementById('shatterButton').addEventListener('click', function () {
    let shatterSound = document.getElementById('breaksound');
    if (shatterSound) {
        shatterSound.currentTime = .5;
        shatterSound.play();
    } else {
        console.error(document.querySelector(".myCardClass"))
        console.error("Audio element with ID 'breaksound' not found.");
    }
    shatter();
});

function shatter() {

    var clickPosition = [imageWidth/2, imageHeight/2];
    triangulate(clickPosition);
    shatterAnimation(clickPosition);
}

function triangulate(clickPosition) {
    var rings = [
        { r: 500, c: 12 },
        { r: 10, c: 12 },
        { r: 305, c: 12 },
        { r: 1200, c: 12 } // very large in case of corner clicks
    ];
    var x, y;
    var centerX = clickPosition[0];
    var centerY = clickPosition[1];

    vertices.push([centerY, centerX]);

    rings.forEach(function (ring) {
        var radius = ring.r;
        var count = ring.c;
        var variance = radius * 0.05;

        for (var i = 0; i < count; i++) {
            x = Math.cos((i / count) * TWO_PI) * radius + centerY + randomRange(-variance, variance);
            y = Math.sin((i / count) * TWO_PI) * radius + centerX + randomRange(-variance, variance);
            vertices.push([x, y]);
        }
    });

    vertices.forEach(function (v) {
        v[0] = clamp(v[0], 0, imageWidth);
        v[1] = clamp(v[1], 0, imageHeight);
    });

    indices = Delaunay.triangulate(vertices);
}

function shatterAnimation(clickPosition) {
    var p0, p1, p2, fragment;
    var tl0 = new TimelineMax({ onComplete: shatterCompleteHandler });

    for (var i = 0; i < indices.length; i += 3) {
        p0 = vertices[indices[i + 0]];
        p1 = vertices[indices[i + 1]];
        p2 = vertices[indices[i + 2]];

        fragment = new Fragment(p0, p1, p2);

        var dx = fragment.centroid[0] - clickPosition[1] / 2;
        var dy = fragment.centroid[1] - clickPosition[1] / 2;
        var d = Math.sqrt(dx * dx + dy * dy);
        var rx = 200 * sign(dy);
        var ry = 100 * -sign(dx);
        var delay = d * 0.004 * randomRange(0.9, 1.1);
        fragment.canvas.style.zIndex = Math.floor(d).toString();

        var tl1 = new TimelineMax();

        tl1.to(fragment.canvas, 1, {
            z: -500,
            rotationX: rx,
            rotationY: ry,
            ease: Cubic.easeIn
        });
        tl1.to(fragment.canvas, 0.4, { alpha: 0 }, 0.5);

        tl0.insert(tl1, delay);

        fragments.push(fragment);
        document.querySelector(".myCardClass").appendChild(fragment.canvas);
    }

    document.querySelector(".myCardClass").removeChild( document.querySelectorAll('.myCardClass svg')[imageIndex]);

}

function shatterCompleteHandler() {
    setTimeout(function () {
        fragments.forEach(function (f) {
            document.querySelector(".myCardClass").removeChild(f.canvas);
        });
        fragments.length = 0;
        vertices.length = 0;
        indices.length = 0;

        placeImage();
    }, 10000);
}

function randomRange(min, max) {
    return min + (max - min) * Math.random();
}

function clamp(x, min, max) {
    return x < min ? min : (x > max ? max : x);
}

function sign(x) {
    return x < 0 ? -1 : 1;
}

function Fragment(v0, v1, v2) {
    this.v0 = v0;
    this.v1 = v1;
    this.v2 = v2;

    this.computeBoundingBox();
    this.computeCentroid();
    this.createCanvas();
    this.clip();
}

Fragment.prototype = {
    computeBoundingBox: function () {
        var xMin = Math.min(this.v0[0], this.v1[0], this.v2[0]);
        var xMax = Math.max(this.v0[0], this.v1[0], this.v2[0]);
        var yMin = Math.min(this.v0[1], this.v1[1], this.v2[1]);
        var yMax = Math.max(this.v0[1], this.v1[1], this.v2[1]);

        this.box = {
            x: xMin,
            y: yMin,
            w: xMax - xMin,
            h: yMax - yMin
        };
    },
    computeCentroid: function () {
        var x = (this.v0[0] + this.v1[0] + this.v2[0]);
        var y = (this.v0[1] + this.v1[1] + this.v2[1]);

        this.centroid = [x, y];
    },
    createCanvas: function () {
        this.canvas = document.createElement('canvas');
        this.canvas.width = imageWidth
        this.canvas.height = imageHeight;
        this.canvas.style.width = imageWidth+ 'px';
        this.canvas.style.height = imageHeight + 'px';
        this.canvas.style.left = this.box.x + 15 + 'px'; // Set left to the original x coordinate
        this.canvas.style.top = this.box.y + 30  + 'px'; // Set top to the original y coordinate

        this.ctx = this.canvas.getContext('2d');
    },
    clip: function () {
        this.ctx.translate(-this.box.x, -this.box.y);
        this.ctx.beginPath();
        this.ctx.moveTo(this.v0[0], this.v0[1]);
        this.ctx.lineTo(this.v1[0], this.v1[1]);
        this.ctx.lineTo(this.v2[0], this.v2[1]);
        this.ctx.closePath();
        this.ctx.clip();
        var image = document.querySelector(".myCardClass svg"); // Corrected selector

        console.log(image)
        if (image instanceof SVGElement) { //check if an svg
            // Convert SVG to data URL

            var svgString = new XMLSerializer().serializeToString(image); // get string

            var tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); //make a replica


            console.log(svgString)
            tempSvg.innerHTML = svgString;  // copy into tempSvg
            cardStyleShatter(tempSvg,document.querySelector("#dropl").classList.value); //get the card style and change tempSvg svg contents to it
            var modifiedSvgString = new XMLSerializer().serializeToString(tempSvg);
            var blob = new Blob([modifiedSvgString], { type: 'image/svg+xml' });
            var url = URL.createObjectURL(blob);                                    //conversion
            var img = new Image();

            img.onload = function () {
                this.ctx.imageSmoothingEnabled = false;                 // !important, need help with drawn image being blurry current plan is to use pixel calculation
                this.ctx.drawImage(img, 0, 0, imageWidth,imageHeight);

                URL.revokeObjectURL(url);
            }.bind(this);
            // console.log(url)
            img.src = url;

        } else if (image instanceof HTMLImageElement ||
            image instanceof HTMLCanvasElement ||
            image instanceof HTMLVideoElement ||
            image instanceof OffscreenCanvas ||
            image instanceof ImageBitmap) {
            // Draw other supported image types directly onto the canvas
            console.log(img)

            this.ctx.drawImage(image, 0, 0,imageWidth, imageHeight); // part that actually shows the image

        } else {
            // Handle unsupported image types

            console.error("Unsupported image type:", typeof image);
        }


    }
};

/*
    Manually change the svg contents to replicate cards.css
    applied to image before it gets drawn in.
*/
function cardStyleShatter(tempSvg, style) {
    let rules = document.styleSheets[0].rules;
    let matchingRule = Object.values(rules).find(rule => rule.selectorText === "." + style);
    let styleObjString = matchingRule.style.cssText;
    let styleObj = {};

    styleObjString.split(";").forEach(property => {
        let [key, value] = property.split(":").map(item => item.trim());
        if (key && value) {
            styleObj[key] = value.replaceAll("!important", "").replaceAll('path(\"', "").replaceAll('\")', "");
        }
    });

    let innerRules = Object.values(rules).find(rule => rule.selectorText === "." + style).cssRules
    for (let i = 0; i < innerRules.length; i++) {
        let innerObjString = innerRules[i].style.cssText;
        let innerObj = {};
        innerObjString.split(";").forEach(property => {
            let [key, value] = property.split(":").map(item => item.trim());
            if (key && value) {
                innerObj[key] = value.replaceAll("!important", "").replaceAll('path(\"', "").replaceAll('\")', "");
            }
        })
        styleObj[innerRules[i].selectorText] = innerObj
    }
    for (const [key, value] of Object.entries(styleObj)) {
        if (typeof styleObj[key] === "object") {
            for (const [keyInner, valueInner] of Object.entries(styleObj[key])) {
                tempSvg.querySelectorAll(key).forEach(function (rect) {
                    rect.setAttribute(keyInner, valueInner);
                });
            }
        }
    }
}




