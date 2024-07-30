'use client';

import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FiCopy } from 'react-icons/fi';
import { MdCheck } from 'react-icons/md';
import { FaPython } from 'react-icons/fa';

const CodeSnippet = ({ code, language = 'python' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Hide tick after 2 seconds
  };

  const containerStyle = {
    borderRadius: '5px',
    overflow: 'hidden',
    backgroundColor: '#000', // Black background for the container
    color: '#f8f8f2', // Light text color
    margin: '1em 0',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333', // Gray background for the header
    padding: '0.5em 1em',
    borderBottom: '1px solid #444',
    color: '#f8f8f2', // Light text color for header
    position: 'relative',
  };

  const buttonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9em', // Reduced font size for text
    color: '#f8f8f2', // Light color for button
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const iconStyle = {
    marginRight: '0.5em',
  };

  const tickStyle = {
    marginLeft: '0.5em',
    fontSize: '1.2em', // Same size for tick as before
    color: '#f8f8f2', // Same color as the copy icon
    display: copied ? 'block' : 'none',
  };

  const buttonText = copied ? 'Copied' : 'Copy code';

  const codeStyle = {
    padding: '1em',
    margin: 0,
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <FaPython style={{ marginRight: '0.5em' }} />
          {language}
        </span>
        <button onClick={handleCopy} style={buttonStyle}>
          <FiCopy style={iconStyle} />
          {buttonText}
          <MdCheck style={tickStyle} />
        </button>
      </div>
      <SyntaxHighlighter language={language} style={dracula} customStyle={codeStyle}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
