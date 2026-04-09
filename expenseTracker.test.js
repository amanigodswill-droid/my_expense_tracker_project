
const { Expense, ExpenseTracker } = require('./expenseTracker');

test("add expense", () => {
  const tracker = new ExpenseTracker();

  tracker.addExpense(new Expense("Food", 100, "Food"));

  expect(tracker.expenses.length).toBe(1);
});

test("remove expense", () => {
  const tracker = new ExpenseTracker();
  const exp = new Expense("Food", 100, "Food");

  tracker.addExpense(exp);
  tracker.removeExpense(exp.id);

  expect(tracker.expenses.length).toBe(0);
});

test("calculate total", () => {
  const tracker = new ExpenseTracker();

  tracker.addExpense(new Expense("A", 100, "Food"));
  tracker.addExpense(new Expense("B", 200, "Transport"));

  expect(tracker.getTotal()).toBe(300);
});

test("filter category", () => {
  const tracker = new ExpenseTracker();

  tracker.addExpense(new Expense("A", 100, "Food"));
  tracker.addExpense(new Expense("B", 200, "Transport"));

  const result = tracker.filterByCategory("Food");

  expect(result.length).toBe(1);
});