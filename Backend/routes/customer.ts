import express, { Request, Response } from 'express';
import Customer, { Customer as CustomerType } from '../model/customer';
import User from '../model/user';
import bcrypt from 'bcrypt';

const router = express.Router();

// Register a new customer
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, address, phoneNumber, mostLikePhoneBrand }: CustomerType = req.body;

    // Check if email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
    }

    const newCustomer = new Customer({
      name,
      email,
      address,
      phoneNumber,
      mostLikePhoneBrand,
    });

    const savedCustomer = await newCustomer.save();
    save_user(email , req.body.password , req.body.role);

    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'There is a error' });
  }
});

async function save_user(email: string, password: string, role: string): Promise<any> {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return { error: 'Email already exists. Please use a different email.' };
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
  
      const newUser = new User({
        email,
        password: hashedPassword, // Store the hashed password
        role,
      });
  
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      return { error: 'There was an error saving the user.' };
    }
  }

export default router;
