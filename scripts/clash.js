
const p1Attack = document.querySelector('.p1-attack');
const p2Attack = document.querySelector('.p2-attack');
let p1Hp = document.getElementById('p1-health-bar');
let p2Hp = document.getElementById('p2-health-bar');
const dmg = 5;

// p1Hp.style.setProperty('--progress-color', 'rgba(30,100,10,1)');
// p2Hp.style.setProperty('--progress-color', 'rgba(30,100,10,1)');
p1Attack.addEventListener('click', () => {
  p2Hp.value = attackEnemy(p2Hp.value, dmg);
  if(p2Hp.value <= 0){
    p2Hp.max = 100;
    p2Hp.value = 100;
  }
  p2Hp.max = p2Hp.value;
  updateWidth(p2Hp);
  updateBackgroundColor(p2Hp);
});

p2Attack.addEventListener('click', () => {
  p1Hp.value = attackEnemy(p1Hp.value, dmg);
  if(p1Hp.value <= 0){
    p1Hp.max = 100;
    p1Hp.value = 100;
  }
  p1Hp.max = p1Hp.value;
  updateWidth(p1Hp);
  updateBackgroundColor(p1Hp);
});


function attackEnemy(hp, dmg){
  hp -= dmg;
  
  return hp;
}



// function updateBackgroundColor(hp){
  
//   if (hp.value >= 85) {
//     hp.style.setProperty('--progress-color', 'rgba(30,100,10,1)');
//   } else if (hp.value >= 70) {
//     hp.style.setProperty('--progress-color', 'rgba(36,147,21,1)');
//   }
//   else if (hp.value >= 50) {
//     hp.style.setProperty('--progress-color', 'rgba(163,218,3,1)');
//   } 
//   else if (hp.value >= 25) {
//     hp.style.setProperty('--progress-color', 'rgba(210,185,41,1)');
//   }
//   else if (hp.value >= 15) {
//     hp.style.setProperty('--progress-color', 'rgba(190,39,6,1)');
//   }
//   else {
//     hp.style.setProperty('--progress-color', 'rgba(134,37,16,100)');
//   }

// }

// function updateWidth(hp) {
//   hp.style.width = `${hp.value}%`;
//   hp.style.transition = 'width .5s ease';
// }

