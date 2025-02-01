import express, { Request, Response } from 'express';
import Product from '../model/product';
import Order from '../model/order';

const router = express.Router();

// Buy a product
router.post('/buy_product/:productId/:buyerId', async (req: Request, res: Response) => {
  try {
    const { productId, buyerId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const purchasedQuantity = req.body.quantity || 1; 

    if (product.productQuantity < purchasedQuantity) {
      return res.status(400).json({ message: 'Insufficient quantity available' });
    }

    const newOrder = new Order({
      productId,
      buyerId,
      quantity: purchasedQuantity,
      orderNumber: generateOrderNumber(),
      status: 'pending',
      paymentStatus: 'pending',
    });

    // Decrement product quantity by purchased quantity
    product.productQuantity =  (parseInt(product.productQuantity) - parseInt(purchasedQuantity)).toString();

    if (parseInt(product.productQuantity) === 0) {
      product.status = 'Unavailable';
    }

    // Save changes to the product and the new order
    await product.save();
    const savedOrder = await newOrder.save();

    res.status(201).json({ message: 'Product bought successfully', order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: 'There was an error' });
  }
});


// Change product status
router.put('/change_status/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const orders = await Order.find({ buyerId: username });
    await Promise.all(
      orders.map(async (order) => {
        order.status = 'Order Placed';
        order.paymentStatus = 'Done';
        await order.save();
      })
    );

    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating statuses', error });
  }
});

router.get('/oneUserPendingOrders/:buyerid', async (req, res) => {
  try {
    const { buyerid } = req.params;

    const pendingOrders = await Order.find({
      buyerId: buyerid,
      status: 'pending',
    }).populate({
      path: 'productId',
      select: 'productName productPrice', 
    });

    res.status(200).json({ pendingOrders });
  } catch (error) {
    res.status(500).json({ message: 'There was an error' });
  }
});


router.get('/allOrders', async (req, res) => {
  try {
    const allOrders = await Order.find()
      .populate('productId', 'productName productPrice')
      .populate('buyerId', 'name');
    
    res.status(200).json({ orders: allOrders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});


router.delete('/deleteOrder/:itemId', async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;

    if (!itemId) {
      return res.status(400).json({ message: 'Invalid item ID' });
    }

    const deletedOrder = await Order.findByIdAndDelete(itemId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully', deletedOrder });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Server error while deleting order' });
  }
});

router.put('/completeOrCancelOrder/:orderid', async (req, res) => {
  try {
    const { orderid } = req.params;
    const { action } = req.body; 

    const order = await Order.findById(orderid);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

   
    order.status = action;
    await order.save();

    res.status(200).json({ message: `Order ${action} successfully` });
  } catch (error) {
    res.status(500).json({ message: 'There was an error processing the order' });
  }
});

function generateOrderNumber(): string {
    const timestamp: number = Date.now(); 
    const randomString: string = Math.random().toString(36).substr(2, 5).toUpperCase();
    const orderNumber: string = `ORDER-${timestamp}-${randomString}`;
  
    return orderNumber;
  }

  
export default router;
