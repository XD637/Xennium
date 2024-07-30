import clientPromise from './mongodb';

export const createUser = async (userData) => {
  try {
    const client = await clientPromise;
    const db = client.db('test'); // Replace with your database name
    const usersCollection = db.collection('users');
    
    // Insert the user data
    const result = await usersCollection.insertOne(userData);
    
    // Fetch and return the created user
    const createdUser = await usersCollection.findOne({ _id: result.insertedId });
    
    return createdUser;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

export const findUserByEmail = async (email) => {
  try {
    const client = await clientPromise;
    const db = client.db('test'); // Replace with your database name
    const usersCollection = db.collection('users');
    
    // Find and return the user by email
    const user = await usersCollection.findOne({ email });
    
    return user;
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
};
