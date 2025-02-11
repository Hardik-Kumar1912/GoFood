require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected to: ${conn.connection.host}`);

    // Access the database
    const db = mongoose.connection.db;

    // Fetch data from 'FoodList' collection
    const fetched_foodList = db.collection("FoodList");
    const foodListData = await fetched_foodList.find({}).toArray();

    // Fetch data from 'FoodCategory' collection
    const fetched_foodCategory = db.collection("FoodCategory");
    const foodCategoryData = await fetched_foodCategory.find({}).toArray();

    // Assign global variables
    global.FoodList = foodListData.length > 0 ? foodListData : [];
    global.FoodCategory = foodCategoryData.length > 0 ? foodCategoryData : [];

    console.log(
      `✅ Fetched ${foodListData.length} items from FoodList & ${foodCategoryData.length} categories from FoodCategory`
    );

    if (foodListData.length === 0) console.log("⚠️ No data found in FoodList.");
    if (foodCategoryData.length === 0)
      console.log("⚠️ No data found in FoodCategory.");
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1); // Exit if connection fails
  }
};

module.exports = connectDb;
