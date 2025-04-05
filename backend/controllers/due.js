const DueSchema = require("../models/DueModel");
const { database } = require("../db/database"); // Adjust path as needed

exports.addDue = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const due = new DueSchema({
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

    await due.save();
    res.status(200).json({ message: "Due added successfully!" });
    console.log("Due added:", due);
  } catch (error) {
    console.error("Error adding due:", error);
    res.status(500).json({ message: "Server error while adding due." });
  }
};

exports.getDues = async (req, res) => {
  try {
    await database(); // 🟢 Ensure DB connection

    const dues = await DueSchema.find().sort({ createdAt: -1 });
    res.status(200).json(dues);
  } catch (error) {
    console.error("Error fetching dues:", error);
    res.status(500).json({ message: "Server error while fetching dues." });
  }
};

exports.deleteDue = async (req, res) => {
  const { id } = req.params;

  try {
    await database(); // 🟢 Ensure DB connection

    const due = await DueSchema.findByIdAndDelete(id);
    if (!due) {
      return res.status(404).json({ message: "Due not found." });
    }

    res.status(200).json({ message: "Due deleted successfully." });
  } catch (error) {
    console.error("Error deleting due:", error);
    res.status(500).json({ message: "Server error while deleting due." });
  }
};
