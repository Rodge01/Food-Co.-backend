const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();
//this is the main function for Backend of the Website
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', "https://food-co-front.vercel.app" ],
    credentials: true 
}))

const foodRoutes = require("./src/foods/food.route")
const orderRoutes = require("./src/orders/order.route")
const userRoutes = require("./src/users/user.route")
const adminRoutes = require("./src/stats/admin.stats")
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);


async function main() {
    await mongoose.connect(process.env.DB_URL); 
    app.use('/', (req, res) => {
        res.send('Hotdogu?!')
      })
}  
main().then(()=>console.log("MongoDB Connect Successfully")).catch(err => console.log(err));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
