import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { randomBytes } from 'crypto';
import nodemailer from 'nodemailer';

const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[a-zA-Z0-9._]{4,30}$/;
const confirmationCodeExpiry = 3600 * 1000; // 1 hour

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (!usernameRegex.test(username)) {
    return res.status(400).json({ message: 'Invalid username format. Username must be 4-30 characters long and contain only letters, numbers, dots, and underscores.' });
  }

  const lowerCaseUsername = username.toLowerCase();

  try {
    const client = await clientPromise;
    const db = client.db('test');

    // Check if email or username already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const existingUsername = await db.collection('users').findOne({ username: { $regex: `^${lowerCaseUsername}$`, $options: 'i' } });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmationCode = randomBytes(20).toString('hex');
    const expiresAt = new Date(Date.now() + confirmationCodeExpiry);

    // Insert unconfirmed user data
    await db.collection('unconfirmedUsers').insertOne({
      email,
      password: hashedPassword,
      username: lowerCaseUsername,
      confirmationCode,
      expiresAt,
      createdAt: new Date(),
    });

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Set up email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Confirmation',
      text: `Please confirm your email using the following code: ${confirmationCode}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully');

    return res.status(200).json({ message: 'Confirmation code sent to your email.' });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
