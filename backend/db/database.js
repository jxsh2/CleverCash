const mongoose = require("mongoose");

const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ DB Connected");
  } catch (error) {
    console.error("❌ DB Connection Error:", error.message);
    console.error("🔍 Full Error:", error); // optional: remove in prod
  }
};

module.exports = { db };
