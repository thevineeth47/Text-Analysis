import React, { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  const [text, setText] = useState(''); 
  const [searchString, setSearchString] = useState(''); 
  const [replaceString, setReplaceString] = useState(''); 
  const [highlightedText, setHighlightedText] = useState(''); 

  // Function to count unique words
  const getUniqueWordCount = (text) => {
    const words = text
      .toLowerCase()
      .match(/\b\w+\b/g); // Match words only
    if (!words) return 0; // Handle case where there are no words
    const uniqueWords = new Set(words);
    return uniqueWords.size;
  };

  // Function to count characters excluding spaces and punctuation
  const getCharacterCount = (text) => {
    const strippedText = text.replace(/[^a-zA-Z0-9]/g, ''); // Remove non-alphanumeric characters
    return strippedText.length;
  };

  
  const replaceAndHighlight = () => {
    if (!searchString) return; 
    const newText = text.split(searchString).join(replaceString); 
    const regex = new RegExp(replaceString, 'gi');
    const highlighted = newText.replace(regex, (match) => `<mark>${match}</mark>`);
    setHighlightedText(highlighted); 
    setText(newText);
  };

  return (
    <div className="App">
      <h1>Real-Time Text Analysis & String Replacement</h1>

      {/* Textarea for input */}
      <textarea
        rows="10"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing..."
      />

      {/* Stats section for real-time word and character count */}
      <div className="stats">
        <p>Unique Word Count: {getUniqueWordCount(text)}</p>
        <p>Character Count (Excluding Spaces and Punctuation): {getCharacterCount(text)}</p>
      </div>

      {/* Input fields for string replacement */}
      <div className="replace-section">
        <input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search string"
        />
        <input
          type="text"
          value={replaceString}
          onChange={(e) => setReplaceString(e.target.value)}
          placeholder="Replace with"
        />
        <button onClick={replaceAndHighlight}>Replace All</button>
      </div>

      {/* Highlighted text after replacement */}
      <div className="highlighted-text">
        <h3>Text after Replacement (Highlighted):</h3>
        <div
          dangerouslySetInnerHTML={{ __html: highlightedText || text }} 
        />
      </div>
    </div>
  );
}

export default App;
