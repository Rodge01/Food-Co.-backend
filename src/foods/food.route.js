const express = require('express');
const { postAFood, getFood, getSingleFood, UpdateFoods, deleteFood } = require('./foodcontroller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();

// Route to create a new food item
router.post("/create-food", verifyAdminToken, postAFood);

// Route to get all foods
router.get("/", getFood);

// Route to get a single food item by ID
router.get("/:id", getSingleFood);

// Route to update a food item
router.put("/edit/:id", verifyAdminToken, UpdateFoods);

// Route to delete a food item by ID
router.delete("/:id", verifyAdminToken, deleteFood);

module.exports = router;
