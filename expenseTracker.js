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
    this.expenses = this.expenses.filter(exp => exp.id !== id);
  }

  getTotal() {
    return this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }

  filterByCategory(category) {
    if (category === "All") return this.expenses;
    return this.expenses.filter(exp => exp.category === category);
  }
}

module.exports = { Expense, ExpenseTracker };