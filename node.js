class Expense {
  constructor(desc, amount, category) {
    this.id = Date.now();
    this.desc = desc;
    this.amount = amount;
    this.category = category;
  }
}

class ExpenseTracker {
  constructor() {
    this.expenses = [];
  }

  addExpense(expense) {
    this.expenses.push(expense);
  }

  removeExpense(id) {
    this.expenses = this.expenses.filter(function(exp) {
      return exp.id !== id;
    });
  }

  getTotal() {
    let total = 0;

    this.expenses.forEach(function(exp) {
      total += exp.amount;
    });

    return total;
  }

  filterByCategory(category) {
    if (category === "All") {
      return this.expenses;
    }

    return this.expenses.filter(function(exp) {
      return exp.category === category;
    });
  }
}

const tracker = new ExpenseTracker();

let saved = localStorage.getItem("expenses");

if (saved) {
  tracker.expenses = JSON.parse(saved);
  showExpenses(tracker.expenses);
}

function addExpense() {
  let desc = document.getElementById("desc").value;
  let amount = document.getElementById("amount").value;
  let category = document.getElementById("category").value;

  if (desc === "" || amount === "") {
    alert("Fill all fields");
    return;
  }

  let expense = new Expense(desc, Number(amount), category);

  tracker.addExpense(expense);

  saveData();
  showExpenses(tracker.expenses);
}

function showExpenses(data) {
  let list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(function(exp) {
    let li = document.createElement("li");

    li.innerHTML =
      exp.desc +
      " - KES " +
      exp.amount +
      " (" +
      exp.category +
      ")" +
      " <button onclick='deleteExpense(" +
      exp.id +
      ")'>X</button>";

    list.appendChild(li);
  });

  document.getElementById("total").textContent = tracker.getTotal();
}

function deleteExpense(id) {
  tracker.removeExpense(id);
  saveData();
  showExpenses(tracker.expenses);
}

function filterExpenses() {
  let selected = document.getElementById("filter").value;
  let data = tracker.filterByCategory(selected);
  showExpenses(data);
}

function saveData() {
  localStorage.setItem("expenses", JSON.stringify(tracker.expenses));
}

module.exports = { Expense, ExpenseTracker };