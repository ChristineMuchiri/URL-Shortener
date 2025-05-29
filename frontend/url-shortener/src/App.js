import React, { useState } from 'react';
import axios from 'axios'; //api calls to backend
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://you-api-gateway-endpoint/shorten?url=${encodeURIComponent(longUrl)}`);

      setShortUrl(response.data.body); //what lambda returns
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  return (
    <div className='url-page'>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder='Enter Long URL'
        />
        <div className='bttn'>
          <button type='submit'>Shorten</button>
          </div>
      </form>
      {shortUrl && (
        <div style={{ marginTop: '20px' }}>
          <p>Short URL: <a href={shortUrl}>{shortUrl}</a></p>
        </div>
      )}
    </div>
  );
}

export default App;
