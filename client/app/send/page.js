// pages/send.js
"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SendCoins from '../components/sendCoins'; // Default import
import '../globals.css';

export default function Send() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SendCoins />
    </main>
  );
}
