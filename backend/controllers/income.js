const IncomeSchema = require("../models/IncomeModel");
const { database } = require("..//db/database"); // Adjust path as needed

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = IncomeSchema({
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

    await income.save();
    res.status(200).json({ message: "Income added successfully!" });
    console.log("Income added:", income);
  } catch (error) {
    console.error("Error adding income:", error);
    res.status(500).json({ message: "Server error while adding income." });
  }
};

exports.getIncomes = async (_req, res) => {
  try {
    await database(); // 🟢 Ensure DB connection

    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    console.error("Error fetching incomes:", error);
    res.status(500).json({ message: "Server error while fetching incomes." });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    await database(); // 🟢 Ensure DB connection

    await IncomeSchema.findByIdAndDelete(id);
    res.status(200).json({ message: "Income deleted successfully." });
  } catch (error) {
    console.error("Error deleting income:", error);
    res.status(500).json({ message: "Server error while deleting income." });
  }
};
