import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { fromUserId, toUserId, amount } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db('test'); // Use the correct database name

    const fromUser = await db.collection('users').findOne({ _id: new ObjectId(fromUserId) });
    const toUser = await db.collection('users').findOne({ _id: new ObjectId(toUserId) });

    if (!fromUser || !toUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (fromUser.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    await db.collection('users').updateOne(
      { _id: new ObjectId(fromUserId) },
      { $inc: { balance: -amount } }
    );

    await db.collection('users').updateOne(
      { _id: new ObjectId(toUserId) },
      { $inc: { balance: amount } }
    );

    const transaction = {
      from: fromUser._id,
      to: toUser._id,
      amount,
      timestamp: new Date(),
    };

    await db.collection('transactions').insertOne(transaction);

    res.status(200).json({ message: 'Transaction successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error });
  }
}
