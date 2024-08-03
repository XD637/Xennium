import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'Missing user ID' });
  }

  try {
    console.log('Connecting to MongoDB...');
    const client = await clientPromise;
    const db = client.db('test'); // Ensure the correct database name
    console.log('Connected to MongoDB. Fetching wallet information...');
    
    // Log userId for debugging
    console.log('Fetching wallet for userId:', userId);

    // Convert userId to ObjectId
    const userObjectId = new ObjectId(userId);

    // Fetch the wallet information using the user ID from the 'balance' collection
    const wallet = await db.collection('wallets').findOne({ userId: userObjectId });

    console.log('Wallet fetched:', wallet);

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    return res.status(200).json(wallet);
  } catch (error) {
    console.error('Error fetching wallet info:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
