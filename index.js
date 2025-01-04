const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

// Main function for Backend of the Website
const port = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', "https://food-co-front.vercel.app"],
    credentials: true
}));

// Importing routes
const foodRoutes = require("./src/foods/food.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

// Register routes
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

// Define root route
app.use('/', (req, res) => {
    res.send('Hotdogu?!');
});

// Connect to MongoDB and start the server
async function main() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected successfully");

        // Start the server after successful DB connection
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

main();
