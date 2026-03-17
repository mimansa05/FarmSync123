// Fake API using localStorage

const STORAGE_KEY = "expenses_data";

// GET
export const getExpenses = async () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return data;
};

// POST
export const addExpenseApi = async (expense) => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const newExpense = {
    id: Date.now(),
    ...expense,
    amount: Number(expense.amount),
  };

  const updated = [newExpense, ...data];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return newExpense;
};

// DELETE
export const deleteExpenseApi = async (id) => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const updated = data.filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return true;
};