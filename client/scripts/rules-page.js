const rulesButton = document.querySelector("#rules")
const rulesDiv = document.querySelector("#rules-page")
const rulesExit = document.querySelector("#rules-page-exit")

rulesButton.addEventListener("click", () =>{
    rulesDiv.classList.remove("hidden")
})

rulesExit.addEventListener("click", () =>{
    rulesDiv.classList.add("hidden")
})