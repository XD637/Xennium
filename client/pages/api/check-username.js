import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ message: 'Missing username' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('test');

    const existingUser = await db.collection('users').findOne({ username });

    return res.status(200).json({ exists: !!existingUser });
  } catch (error) {
    console.error('Error checking username:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
