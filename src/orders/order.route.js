const express = require('express');
const debug = require('debug')('app');
const { createOrder, getOrderByEmail, deleteOrdersByEmail, getRevenueData } = require('./ordercontroller');
const router = express.Router();
const Order = require('./order.model')
// Log every request
router.use((req, res, next) => {
  debug('dispatching %s %s', req.method, req.url);  
  next();
});

// Order Endpoint for creating an order
router.post('/', createOrder);

// Get orders by email (single order)
router.get('/email/:email', getOrderByEmail);

// Get all orders (add this route)
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all orders...');
    const orders = await Order.find(); // Fetch all orders
    console.log('Orders fetched:', orders);
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }
    res.json(orders); // Send orders as response
  } catch (error) {
    console.error('Error fetching orders:', error); // Log detailed error
    res.status(500).json({ message: 'Failed to orders', error: error.message });
  }
});
router.delete('/email/:email', deleteOrdersByEmail);
router.get('/dashboard', getRevenueData);
module.exports = router;
