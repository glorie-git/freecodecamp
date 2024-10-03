let price = 19.5;
// let cid = [
//   ['PENNY', 1.01],
//   ['NICKEL', 2.05],
//   ['DIME', 3.1],
//   ['QUARTER', 4.25],
//   ['ONE', 90],
//   ['FIVE', 55],
//   ['TEN', 20],
//   ['TWENTY', 60],
//   ['ONE HUNDRED', 100]
// ];

let cid = [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
];

const currency = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100],
];

let cidIndex = cid.length - 1;
let changeArr = {};

const cashInput = document.getElementById("cash");
const changeDueElement = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

const getAmount = (change) => {
  if (change - currency[cidIndex][1] >= 0) {
    if (cid[cidIndex][1] - currency[cidIndex][1] >= 0) {
      cid[cidIndex][1] = (cid[cidIndex][1] - currency[cidIndex][1]).toFixed(2);
      return currency[cidIndex];
    } else {
      cidIndex--;
      return ["", 0];
    }
  } else {
    cidIndex--;
    return ["", 0];
  }
};

const calculateChange = (cash, price) => {
  let change = (cash - price).toFixed(2);
  let receipt = "";
  let status = "Status: ";
  const cashInDraw = cid.reduce((acc, money) => acc + money[1], 0);

  while (change > 0 && cidIndex >= 0) {
    const [type, amount] = getAmount(change);
    if (amount > 0) {
      change = (change - amount).toFixed(2);
      if (changeArr[type]) {
        changeArr[type] += amount;
      } else {
        changeArr[type] = amount;
      }
    }
  }

  if (cidIndex >= 0) {
    if (cashInDraw === cash - price) {
      status += "CLOSED";
    } else {
      status += "OPEN";
    }

    for (const [type, amount] of Object.entries(changeArr)) {
      receipt += ` ${type}: $${amount.toFixed(2)}`;
    }
    changeDueElement.innerText = status + receipt;
  } else {
    if (cashInDraw === cash - price) {
      status += "CLOSED";
    } else {
      status += "INSUFFICIENT_FUNDS";
    }

    changeDueElement.innerText = status;
  }

  changeArr = {};
  cidIndex = cid.length - 1;
};

purchaseBtn.addEventListener("click", () => {
  if (cashInput.value.length === 0 || Number(cashInput.value) < 0) {
    alert("Please enter a valid amount.");
    return;
  }

  let cash = Number(cashInput.value);
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cash === price) {
    changeDueElement.innerText =
      "No change due - customer paid with exact cash";
  } else {
    calculateChange(cash, price);
  }
});
