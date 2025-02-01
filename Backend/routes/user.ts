import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../model/user';

const router = express.Router();

// Login route
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string, password: string } = req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { role } = user;
    res.status(200).json({ message: 'Login Success', role });
  } catch (error) {
    res.status(500).json({ message: 'There was an error logging in' });
  }
});

export default router;
