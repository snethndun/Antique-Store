import request from 'supertest';
import app from '../server'; // Import the app
import mongoose from 'mongoose';

describe('User Routes', () => {
  // Cleanup after tests
  afterAll(async () => {
    await mongoose.connection.close(); // Close MongoDB connection
  });

  it('should return a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello from your Node.js backend!');
  });
});
