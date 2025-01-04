const Food = require("./food.model");

const postAFood = async (req, res) => {
    try {
        const newFood = await Food({...req.body});
        await newFood.save();
        res.status(200).send({ message: "Food posted Successfully!", food: newFood });
    } catch (error) {
        console.error("Error Creating Food", error);
        res.status(500).send({ message: "Failed to create Food" });
    }
}

//get Food
const getFood = async (req, res)=>{
    try {
        const foods = await Food.find().sort({createdAt: -1});
        res.status(200).send(foods);
    } catch (error) {
        console.error("Error Fetching Food", error);
        res.status(500).send({ message: "Failed to Fetch Food" }); 
    }
}
//this is when you click the Sale it will appear in one page
const getSingleFood = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Food.findById(id);
        if (!food) {
            return res.status(404).send({ message: "Food not Found!" });
        }
        res.status(200).send(food);
    } catch (error) {
        console.error("Error Fetching Food", error);
        res.status(500).send({ message: "Failed to Fetch Food" });
    }
}

//this is for updating the food data
const UpdateFoods = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFood = await Food.findByIdAndUpdate(id, req.body, { new: true }); 
        if (!updatedFood) {
            return res.status(404).send({ message: "Food not Found!" });
        }
        res.status(200).send({
            message: "Food Updated Successfully!",
            Food: updatedFood // Send the updated food data
        });

    } catch (error) {
        console.error("Error Updating Food", error);
        res.status(500).send({ message: "Failed to Update Food" });
    }
};
//this is for deleting the food Data
const deleteFood = async (req, res) => {
    try {
        const { id } = req.params;  // Get the ID from the URL parameters
        const deletedFood = await Food.findByIdAndDelete(id);  // Try to delete the food by ID

        if (!deletedFood) {
            return res.status(404).send({ message: "Food not Found!" });  // If food not found, return 404
        }

        res.status(200).send({
            message: "Food Deleted Successfully!",
            Food: deletedFood  // Return the deleted food details
        });
    } catch (error) {
        console.error("Error Deleting Food", error);
        res.status(500).send({ message: "Failed to Delete Food" });
    }
};



module.exports ={
    postAFood,
    getFood,
    getSingleFood,
    UpdateFoods,
    deleteFood

}