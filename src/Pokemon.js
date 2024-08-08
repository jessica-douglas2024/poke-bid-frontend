import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import './App.css';

function Pokemon() {
  const [currentBids, setCurrentBids] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`https://poke-bid-backend.onrender.com/items/current`)
      .then(res => res.json())
      .then(data => {
        setCurrentBids(data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBids = currentBids.filter(bid => {
    const { poke_name, poke_id, poke_type } = bid;
    const term = searchTerm.toLowerCase();
    return (
      poke_name.toLowerCase().includes(term) ||
      poke_id.toString().includes(term) ||
      poke_type.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <div className='search-box'>
        <br></br>
        <label>Search </label>
        <input
          type="text"
          placeholder="Name / ID / Type"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="container">
        {filteredBids.map(bid => (
          <Cards key={bid.bid_id} {...bid} />
        ))}
      </div>
    </>
  );
}

export default Pokemon;

