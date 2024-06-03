import Order from '../Models/orders.js'
export const createOrder = async (req, res) => {
  try {
    const { confirmOrder, orderComplete, confirmPayment, phoneNumber,customerName,customerEmail, tableNumber, food, total } = req.body;
    const newOrder = new Order({
      confirmOrder,
      orderComplete,
      confirmPayment,
      phoneNumber,
      customerName,
      customerEmail,
      tableNumber,
      food,
      total
    });
    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const getOrders = async (req, res) => {
  try {
    const { email } = req.query; 
    let orders;

    if (email) {
      orders = await Order.find({ customerEmail: email });
    } else {
      orders = await Order.find();
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  };