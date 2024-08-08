import React, { useState, useEffect } from 'react'
import Items from './Items';
import './App.css';


function AddItem() {

  
    const [item_id, setItemId] =  useState(1);
    const [item_names, setItemNames] =  useState({});
    const poke_list = [];
    
    for(let i=1;i<=250;i++){
        poke_list.push(i)
    }
   
  
    useEffect(()=>{

        for(let i=0;i<poke_list.length;i++){
            fetch(`https://pokeapi.co/api/v2/pokemon/${poke_list[i]}/`)
                .then(res => res.json())
                .then(data => {
                    item_names[poke_list[i]] = data.name.toUpperCase()
                })
                .catch(err => console.log(err))
        }
    },[item_id])

    

   

    function changeItemDisplay(e){
        e.preventDefault()
        const select =  e.target.value
        setItemId(select);

    }



 

    return (
        <>
        

    
        <div className="container"> 
      
       
       

            <select name="cars" id="cars" size="23" onChange={changeItemDisplay} class="select-pokemon">
                {poke_list.map( poke_id =>
                  
                        <option value = {poke_id}>{poke_id} - {item_names[poke_id]}</option>
                    
                )}
            </select>

            <Items poke_id = {item_id} />
            
     
        </div>

    </>
    );
}

export default AddItem;
