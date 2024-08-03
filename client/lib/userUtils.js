import clientPromise from './mongodb';

export async function findUserByUsernameOrEmail(identifier) {
  const client = await clientPromise; // Use client from clientPromise
  const db = client.db('test');
  const collection = db.collection('users');

  const user = await collection.findOne({
    $or: [
      { email: identifier },
      { username: identifier },
    ],
  });

  return user;
}
