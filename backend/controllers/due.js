const DueSchema = require("../models/DueModel");

exports.addDue = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const due = new DueSchema({
        title,
        amount,
        category,
        description,
        date
    })
    try {
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || typeof amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }
        await due.save();
        res.status(200).json({ message: 'Due added successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getDues = async (req, res) => {
    try {
        const dues = await DueSchema.find().sort({ createdAt: -1 });
        res.status(200).json(dues);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.deleteDue = async (req, res) => {
    const { id } = req.params;
    try {
        const due = await DueSchema.findByIdAndDelete(id);
        if (!due) {
            return res.status(404).json({ message: 'Due not found' });
        }
        res.status(200).json({ message: 'Due Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
