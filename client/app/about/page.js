// pages/index.js
"use client"
import React from 'react';
import CodeSnippet from '../components/CodeSnippet';
import { FaInstagram, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import ScrollToTopButton from '../components/ScrollToTopButton';



const pythonCode = `""" let's assume you have initially 10 xenium coins, call it iv (initial value). 
for each xenium coin you spend (sv), the value of the one last xenium coin depreciates in a way, 
when the total xenium coin spent becomes 9 (in this case), 
the true value (tv) of the xenium coin becomes 0% (initially it is 100%), 
which means you can not spend the last xenium coin since it lost it's true value.
Means 1 became 0 """
#Xenium Algorithm

import matplotlib.pyplot as plt

class Xenium:
    def __init__(self, iv):
        self.iv = iv  # initial value
        self.tv = 100  # initial true value
        self.depreciation_history = []  # list to store depreciation over time

    def x_algorithm(self):
        while self.iv > 1:  # Continue until only one coin is left
            sv = int(input("Enter the xenium to be spent: "))
            
            # Validate the input
            if sv > self.iv:
                print("Not enough xenium coins to spend.")
                break
            
            # Calculate remaining xenium coins and spent percentage
            self.iv -= sv  # subtract the spent amount
            spent_percentage = (sv / self.iv) * 100 if self.iv != 0 else 100 #spent percentage
            
            # Calculate depreciation and adjust true value
            depreciation = min(spent_percentage, self.tv) #check for bounds
            self.tv -= depreciation
            
            # Append true value to the history for plotting
            self.depreciation_history.append(self.tv)
        
        print("End of simulation. Remaining xenium coins:", self.iv)
        self.plot_depreciation()
    
    def plot_depreciation(self):
        # Plotting the depreciation history
        plt.plot(range(len(self.depreciation_history)), self.depreciation_history, marker='o')
        plt.xlabel('Time')
        plt.ylabel('True Value (%)')
        plt.title('Depreciation of Xenium Coins Over Time')
        plt.grid(True)
        plt.show()

# funtion calling
if __name__ == "__main__":
    initial_xenium = 10
    xenium_simulator = Xenium(initial_xenium)
    xenium_simulator.x_algorithm()

"""this algorithm shows the peculiar way of depreciation based on the how much you spend,
you may not realise but even if you spend the smallest amount , it changes the true value and depreciates it.
what happens when the depriciation is recurive? means it itself changes the Xenium value, find out!!!"""
`;

const About = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-black opacity-90">
      <Typewriter
          words={['What is Xenium?']}
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
            Send Xenium Coins: Use our platform to send imaginary Xenium coins without the need for actual cryptocurrency.
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
        Follow us on social media and join our community to stay updated on the latest news and updates from Xenium. Together, let&apos;s build the future of decentralized finance.
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
