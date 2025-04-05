const ExpenseSchema = require("../models/ExpenseModel");
const { database } = require("../db/database"); // Fixed import path

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const expense = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    await database(); // 🟢 Ensure DB connection

    // Validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }

    await expense.save();
    res.status(200).json({ message: "Expense added successfully!" });
    console.log("Expense added:", expense);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Server error while adding expense." });
  }
};

exports.getExpense = async (_req, res) => {
  try {
    await database(); // 🟢 Ensure DB connection

    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Server error while fetching expenses." });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    await database(); // 🟢 Ensure DB connection

    await ExpenseSchema.findByIdAndDelete(id);
    res.status(200).json({ message: "Expense deleted successfully." });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Server error while deleting expense." });
  }
};
