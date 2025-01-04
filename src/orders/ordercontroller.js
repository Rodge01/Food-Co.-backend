const Order = require("./order.model");

//this is for creating order when costumer Add to cart this code will save the Order
const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);  
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).send({ message: "Failed to create order" });  // Changed message to be more relevant
  }
};

//this is for fetching the order/transaction history of the costumer
const getOrderByEmail = async (req, res) => {
  try {
    const {email} = req.params
    const orders = await Order.find({email}).sort({createAt: -1});
    if(!orders){
      return res.status(404).json({message:"Order not Found"})
    }
    res.status(200).json(orders);  
  } catch (error) {
    console.error("Error fetching order", error);
    res.status(500).send({ message: "Failed to fetch order" });  // Changed message to be more relevant
  }
};
const deleteOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    // Delete orders by the email provided
    const result = await Order.deleteMany({ email });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No orders found to delete' });
    }

    res.status(200).json({ message: 'Orders deleted successfully' });
  } catch (error) {
    console.error('Error deleting orders:', error);
    res.status(500).json({ message: 'Failed to delete orders', error: error.message });
  }
};
const getRevenueData = async (req, res) => {
  let { timePeriod } = req.query; // Get the timePeriod from query params
  timePeriod = timePeriod.trim().toLowerCase();  // Trim and normalize to lower case
  console.log("Received time period (trimmed):", timePeriod);  // Log the trimmed value

  // Valid time periods
  const validTimePeriods = ['day', 'week', 'month', 'year'];
  if (!validTimePeriods.includes(timePeriod)) {
    console.log("Invalid time period after trimming:", timePeriod);
    return res.status(400).json({ message: "Invalid time period. Valid options are: 'day', 'week', 'month', 'year'" });
  }

  let groupByField;
  switch (timePeriod) {
    case 'day':
      groupByField = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
      break;
    case 'week':
      groupByField = { 
        $concat: [
          { $toString: { $isoWeekYear: "$createdAt" } }, "-", 
          { $toString: { $isoWeek: "$createdAt" } }
        ]
      };
      break;
    case 'month':
      groupByField = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
      break;
    case 'year':
      groupByField = { $dateToString: { format: "%Y", date: "$createdAt" } };
      break;
    default:
      return res.status(400).json({ message: "Invalid time period" });
  }

  try {
    const revenueData = await Order.aggregate([
      ...(timePeriod === 'week' ? [
        {
          $addFields: {
            isoWeekYear: { $isoWeekYear: "$createdAt" },
            isoWeek: { $isoWeek: "$createdAt" }
          }
        }
      ] : []),
      {
        $group: {
          _id: groupByField,
          totalRevenue: { $sum: "$totalPrice" }
        }
      },
      {
        $sort: { _id: 1 } // Sort by time period
      }
    ]);

    if (!revenueData || revenueData.length === 0) {
      return res.status(404).json({ message: "No revenue data found" });
    }

    res.status(200).json(revenueData);
  } catch (error) {
    console.error("Error calculating revenue:", error);
    res.status(500).send({ message: "Failed to calculate revenue", error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderByEmail,
  deleteOrdersByEmail,
  getRevenueData, // Export the new function
};