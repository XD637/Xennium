import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

const keyHashRounds = 12; // Adjust as needed
const confirmationCodeExpiry = 3600 * 1000; // 1 hour

const generateKeys = () => {
  // Placeholder for actual key generation logic
  // Use a cryptographic library or method to generate real public/private keys
  const publicKey = randomBytes(32).toString('hex');
  const privateKey = randomBytes(64).toString('hex');
  return { publicKey, privateKey };
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, confirmationCode } = req.body;

  if (!email || !confirmationCode) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('test');

    // Find the unconfirmed user
    const unconfirmedUser = await db.collection('unconfirmedUsers').findOne({ email, confirmationCode });

    if (!unconfirmedUser) {
      return res.status(400).json({ message: 'Invalid email or confirmation code' });
    }

    // Check if the confirmation code has expired
    if (new Date() > unconfirmedUser.expiresAt) {
      return res.status(400).json({ message: 'Confirmation code has expired' });
    }

    // Generate keys
    const { publicKey, privateKey } = generateKeys();

    // Insert the user into the 'users' collection
    const result = await db.collection('users').insertOne({
      email,
      password: unconfirmedUser.password,
      username: unconfirmedUser.username,
      createdAt: new Date(),
    });

    // Retrieve the inserted user's ID
    const userId = result.insertedId;

    // Save the keys and balance in the 'wallets' collection
    await db.collection('wallets').insertOne({
      userId, // Add the userId field
      email,
      publicKey,
      privateKey, // Store the private key directly
      balance: 10,
      createdAt: new Date(),
    });

    // Delete the user from the 'unconfirmedUsers' collection
    await db.collection('unconfirmedUsers').deleteOne({ _id: unconfirmedUser._id });

    return res.status(201).json({ message: 'Email confirmed successfully' });
  } catch (error) {
    console.error('Error confirming email:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
