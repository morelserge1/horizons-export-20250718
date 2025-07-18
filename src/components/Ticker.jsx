import React, { useState, useEffect } from 'react';
import './Ticker.css';

const generateRandomHash = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let hash = '0x';
  for (let i = 0; i < 40; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return hash;
};

const Ticker = () => {
  const [hashes, setHashes] = useState([]);

  useEffect(() => {
    const initialHashes = Array.from({ length: 10 }, () => generateRandomHash());
    setHashes(initialHashes);

    const interval = setInterval(() => {
      setHashes(prevHashes => {
        const newHashes = [...prevHashes];
        newHashes.shift();
        newHashes.push(generateRandomHash());
        return newHashes;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ticker-wrap">
      <div className="ticker">
        {hashes.map((hash, index) => (
          <div className="ticker__item" key={index}>
            <span className="text-green-400 mr-2">Tx:</span>{hash}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;