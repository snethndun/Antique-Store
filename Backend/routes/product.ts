import express, { Request, Response } from 'express';
import Product from '../model/product'; 

const router = express.Router();

// Create a product
router.post('/addProducts', async (req: Request, res: Response) => {
  try {
    const {
      productName,
      productPrice,
      productQuantity,
      productCondition,
      productImage,
      status
    } = req.body;

    const timestamps = {
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newProduct = new Product({
      productName,
      productPrice,
      productQuantity,
      productCondition,
      productImage,
      status,
      timestamps,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    // Respond with the saved product data
    res.status(201).json(savedProduct);
  } catch (error) {
    // Handle errors
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'An error occurred while creating the product' });
  }


});

// Get all products
router.get('/allProducts', async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred while fetching products' });
  }
});

// Get a specific product by ID
router.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the product' });
  }
});

// Update a product by ID
router.put('/products/:id', async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const {
      productName,
      productPrice,
      productQuantity,
      productCondition,
      productImage,
      status,
    } = req.body;

    const timestamps = {
      updatedAt: new Date(),
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          productName,
          productPrice,
          productQuantity,
          productCondition,
          productImage,
          status,
          timestamps,
        },
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the product' });
  }
});

// Delete a product by ID
router.delete('/deleteProducts/:id', async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the product' });
  }
});

export default router;
