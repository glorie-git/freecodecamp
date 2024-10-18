const rules = document.getElementById("rules");
const rockButton = document.getElementById("rockButton");
const paperButton = document.getElementById("paperButton");
const scissorsButton = document.getElementById("scissorsButton");
const rulesToggleButton = document.getElementById("rules-toggle-button");

const options = {
  rock: 0,
  paper: 1,
  scissors: 2,
};

scissorsButton.addEventListener("click", () => takeTurn(options.scissors));
paperButton.addEventListener("click", () => takeTurn(options.paper));
rockButton.addEventListener("click", () => takeTurn(options.rock));

rulesToggleButton.addEventListener("click", toggleRules);

function toggleRules() {
  rules.classList.toggle("hide");

  if (rules.classList.contains("hide")) {
    rulesToggleButton.textContent = "View Rules";
  } else {
    rulesToggleButton.textContent = "Hide Rules";
  }
}
