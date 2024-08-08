import React, { useState, useEffect } from 'react'
import {Route,Routes} from "react-router-dom"; 
import Header from './Header';
import Pokemon from './Pokemon';
import AddItem from './AddItem';
import About from './About';
import './App.css';



function App() {

  return (
    <>
     
    <Header/>
    <Routes>
        <Route path="/" element={<Pokemon />}/>
        <Route path="/more-pokemon" element={<AddItem />}/>
        <Route path="/about" element={<About />}/>
    </Routes>
  

    </>
  );
}

export default App;
