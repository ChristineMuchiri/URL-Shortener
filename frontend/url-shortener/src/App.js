import React, { useState } from 'react';
import { shortenUrl } from './api';
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent page reload
    if (!longUrl.startsWith("http")) {
        alert("Please enter a valid URL starting with http:// or https://");
        return;
    }
    
    try {
      
      setLoading(true);
      const shortUrl = await shortenUrl(longUrl);
      setLoading(false);

      setShortUrl(shortUrl); //what lambda returns
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='url-page fade-in'>
      <header>
        <img src='/shortener.PNG' alt='logo' style={{ height: '60px', width: '100px' }} />
        <h1>Cuttly</h1>
        <h2>Simplify your links</h2>
      </header>
      
      <form onSubmit={handleSubmit} className='url-form'>
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder='Enter Long URL'
        />
        <p>Shorten your links and make them easy to share</p>
        <div className='bttn'>
          <button type='submit' disabled={loading}>
            {loading ? "Shortening..." : "Shorten"}
          </button>
        </div>
      </form>
      
      {shortUrl && (
        <div className='short-url-display'>
          <p>Short URL: <a href={shortUrl} target='_blank' rel='noopener noreferrer'>{shortUrl}</a></p>
          <button onClick={() => navigator.clipboard.writeText(shortUrl)}>
            Copy
          </button>
        </div>
      )}
        
      <footer>
        <p> Made with💡 by Christine Muchiri - <a href='https://github.com/ChristineMuchiri/Serverless-Url-Shortener' target="_blank" rel="noopener noreferrer">Github Repo</a></p>
      </footer>
    </div>
  );
}

export default App;
