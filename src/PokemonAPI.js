import React, { useState, useEffect } from 'react'
import CardsAPI from './CardsAPI';
import './App.css';


function Pokemon() {

  const poke_list = [];
  for(let i=1;i<=20;i++){
    poke_list.push(i)
  }
 


  return (
    <>
     
    
    <div className="container"> 
      
      {poke_list.map( poke_id =>
        <CardsAPI 
          pid = {poke_id}  
        />
      )}
    </div>

    </>
  );
}

export default PokemonAPI;
