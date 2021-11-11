const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

/* invoking function*/
getRandomUser();
getRandomUser();
getRandomUser();

/* Functions */

let data = [];

// Fetch Random Users
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results;
  const newUser = {
    name: `${user[0].name.first} ${user[0].name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

// Double Users Money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

//sorth by rechest

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Show only miliionaires

function showOnlyMillionairs() {
  data = data.filter((user) => user.money >= 1000000);
  updateDOM();
}

// Calculate Wealth
function calculateWealth() {
  let totalwealth = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `<h3>Total wealth: <strong>${formatMoney(
    totalwealth
  )}</strong></h3>`;
  main.appendChild(wealthElement);
}

// Add users to data list
function addData(user) {
  data.push(user);
  updateDOM();
}

// Insert to main div
function updateDOM(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";
  providedData.forEach((person) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as Money

function formatMoney(amount) {
  return "$ " + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

/* Event Listners */

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showOnlyMillionairs);
calculateWealthBtn.addEventListener("click", calculateWealth);
