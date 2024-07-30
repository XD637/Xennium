import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { verifyRecaptcha } from '../../../lib/verifyRecaptcha'; // Adjust the path as needed

export async function POST(request) {
  const { name, email, message, recaptchaToken } = await request.json();

  if (!name || !email || !message || !recaptchaToken) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  try {
    // Verify reCAPTCHA token
    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed.' }, { status: 400 });
    }

    // Connect to MongoDB and save message
    const client = await clientPromise;
    const db = client.db('contact');
    const collection = db.collection('messages');

    await collection.insertOne({ name, email, message, date: new Date() });

    return NextResponse.json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
