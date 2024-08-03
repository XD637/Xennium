import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, address } = req.body;

    if (!userId || !address) {
      return res.status(400).json({ message: 'User ID and address are required' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('connect'); // Specify the database name

      // Check if the address already exists
      const existingAddress = await db.collection('address').findOne({ address });

      if (!existingAddress) {
        // Address does not exist, proceed to insert
        await db.collection('address').insertOne({
          userId, 
          address 
        });
        return res.status(200).json({ message: 'Address saved successfully' });
      } else {
        return res.status(200).json({ message: 'Address already exists' });
      }
    } catch (error) {
      console.error('Error saving address:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
