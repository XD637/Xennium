// pages/index.js
"use client"
import React from 'react';
import CodeSnippet from '../components/CodeSnippet';
import { FaInstagram, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import ScrollToTopButton from '../components/ScrollToTopButton';



const pythonCode = `""" let's assume you have initially 10 xennium coins, call it iv (initial value). 
for each xennium coin you spend (sv - spend value), the true value of the one last xennium coin depreciates in a way, 
when the total xennium coin spent becomes 9 (in this case), 
the true value (tv) of the xennium coin becomes 0% (initially it was 100%), 
which means you can not spend the last xennium coin since it lost it's true value for you.
Means 1 became 0 """

#Xennium Algorithm

import matplotlib.pyplot as plt

class xennium:
    def __init__(self, iv):
        self.iv = iv  # initial value
        self.tv = 100  # initial true value
        self.depreciation_history = []  # list to store depreciation over time

    def x_algorithm(self):
        while self.iv > 1:  # Continue until only one coin is left
            sv = int(input("Enter the xennium to be spent: "))
            
            # Validate the input
            if sv > self.iv:
                print("Not enough xennium coins to spend.")
                break
            
            # Calculate remaining xennium coins and spent percentage
            self.iv -= sv  # subtract the spent amount
            spent_percentage = (sv / self.iv) * 100 if self.iv != 0 else 100 #spent percentage
            
            # Calculate depreciation and adjust true value
            depreciation = min(spent_percentage, self.tv) #check for bounds
            self.tv -= depreciation
            
            # Append true value to the history for plotting
            self.depreciation_history.append(self.tv)
        
        print("End of simulation. Remaining xennium coins:", self.iv)
        self.plot_depreciation()
    
    def plot_depreciation(self):
        # Plotting the depreciation history
        plt.plot(range(len(self.depreciation_history)), self.depreciation_history, marker='o')
        plt.xlabel('Time')
        plt.ylabel('True Value (%)')
        plt.title('Depreciation of xennium Coins Over Time')
        plt.grid(True)
        plt.show()

# funtion calling
if __name__ == "__main__":
    initial_xennium = 10
    xennium_simulator = xennium(initial_xennium)
    xennium_simulator.x_algorithm()

"""this algorithm shows the peculiar way of depreciation based on the how much you spend,
you may not realise but even if you spend the smallest amount , it changes the true value and depreciates it's value for you.
"""
`;

const About = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-black opacity-90">
      <Typewriter
          words={['What is xennium?']}
          loop={1}
          cursor
          cursorStyle='_'
          typeSpeed={250}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>
      <div style={{ padding: '2em' }}>
        <CodeSnippet code={pythonCode} language='python'/>
      </div>
      <h2 className="text-3xl font-semibold mb-4 text-center text-black opacity-90 ">
        Features <i class="bi bi-stars"></i>
      </h2>
      <ul className="list-disc list-inside mb-6">
        <li className="mb-4 flex items-start p-4 bg-gray-900 rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 text-white">
          <i className="bi bi-braces-asterisk mr-3 text-lg text-gray-400"></i>
          <span className="text-base text-gray-200">
            Connect to MetaMask: Easily link your MetaMask wallet to our platform for secure and efficient transactions.
          </span>
        </li>
        <li className="mb-4 flex items-start p-4 bg-gray-900 rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 text-white">
          <i className="bi bi-braces-asterisk mr-3 text-lg text-gray-400"></i>
          <span className="text-base text-gray-200">
            Send xennium Coins: Use our platform to send imaginary xennium coins without the need for actual cryptocurrency.
          </span>
        </li>
        <li className="mb-4 flex items-start p-4 bg-gray-900 rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 text-white">
          <i className="bi bi-braces-asterisk mr-3 text-lg text-gray-400"></i>
          <span className="text-base text-gray-200">
            Live Price Charts: Stay updated with real-time cryptocurrency price charts directly on our website.
          </span>
        </li>
        <li className="mb-4 flex items-start p-4 bg-gray-900 rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 text-white">
          <i className="bi bi-braces-asterisk mr-3 text-lg text-gray-400"></i>
          <span className="text-base text-gray-200">
            Secure and User-Friendly: Enjoy a secure, intuitive interface designed for both beginners and experienced users.
          </span>
        </li>
      </ul>
      <h2 className="text-3xl font-semibold mb-4 text-center text-black opacity-90">
        Stay Connected <i class="bi bi-link-45deg"></i>
      </h2>
      <p className="text-lg mb-6 text-black opacity-90">
        Follow us on social media and join our community to stay updated on the latest news and updates from xennium. Together, let&apos;s build the future of decentralized finance.
      </p>
      <div className="flex space-x-4 mt-6">
        <a href="#" className="text-gray-600 hover:text-gray-800"><FaInstagram size={24} /></a>
        <a href="#" className="text-gray-600 hover:text-gray-800"><FaTwitter size={24} /></a>
        <a href="#" className="text-gray-600 hover:text-gray-800"><FaGithub size={24} /></a>
        <a href="#" className="text-gray-600 hover:text-gray-800"><FaEnvelope size={24} /></a>
      </div>
      <ScrollToTopButton />
    </main>
  );
};

export default About;
