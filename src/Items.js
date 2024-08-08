import {useState, useEffect} from 'react';


const Items = props => { 

    const poke_id = props.poke_id;
    const [poke_name, setName] =  useState('');
    const [poke_img, setImg] =  useState('');
    const [poke_hp, setHP] =  useState('');
    const [poke_atk, setAT] =  useState('');
    const [poke_dfc, setDF] =  useState('');
    const [poke_type, setType] =  useState('');
    const [current_bids, setCurrentBids] =  useState([]);
    const getDate = new Date();
    const today = getDate.toISOString().substring(0,10);
   
   
    useEffect(()=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${poke_id}/`)
            .then(res => res.json())
            .then(data => {
                
                setName(data.name.toUpperCase())
                setImg(data.sprites.front_default)
                setHP(data.stats[0].base_stat)
                setAT(data.stats[1].base_stat)
                setDF(data.stats[2].base_stat)
                setType(data.types[0].type.name)
               

            })
            .catch(err => console.log(err))
        
        fetch(`https://poke-bid-backend.onrender.com/item/current/${poke_id}`)
            .then(res => res.json())
            .then(data => {
                
                const bidIds = data.map(bid => bid.bid_id);
                setCurrentBids(bidIds);
    
            })
            .catch(err => console.log(err))

    },[poke_id])




    function addNewItem(event){
        event.preventDefault()
        const form = event.target
        const end_date = form.enddate.value
        const start_price = form.startprice.value
        const bid_id = `bid-${poke_id}-${end_date}`
        const poke_attack = poke_atk
        const poke_defense = poke_dfc
       
        
        const itemData = {
            bid_id,
            end_date,
            start_price,
            poke_id,
            poke_name,
            poke_type,
            poke_img,
            poke_hp,
            poke_attack,
            poke_defense
        };

        fetch(`https://poke-bid-backend.onrender.com/item/current/${poke_id}`)
            .then(res => res.json())
            .then(data => {
                
                const bidIds = data.map(bid => bid.bid_id);
                setCurrentBids(bidIds);
    
            })
            .catch(err => console.log(err))

        if (current_bids.length === 0) {        

            fetch('https://poke-bid-backend.onrender.com/item/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                form.enddate.value="";
                form.startprice.value="";
                alert("Item added succefully!")
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else {
            alert("This Pokemon is currently bidding!!!!")
        }

    }

    return(
        
        <div className={`item card ${poke_type.toLowerCase()}`} >
            <h3>{poke_name}</h3>
            <p>ID - {poke_id} | TYPE - {poke_type}</p>
            
            <div class="card-info">
                <img src={poke_img} width='200' height='200'></img>
                <div class="card-stat">
                    <p>HP {poke_hp}<progress value={poke_hp} max="100"></progress></p>
                    <p>Attack {poke_atk}<progress value={poke_atk} max="100"></progress></p>
                    <p>Defense {poke_dfc}<progress value={poke_dfc} max="100"></progress> </p>
                </div> 
               
                   
               
            </div>
            <form id={"new-item-form-"+poke_id} onSubmit={addNewItem}>
                    <label for="startprice">Start Price : </label>
                    <input type="number" id="startprice" name="startprice" required min='10' step='5'></input> CAD
                    <br></br>
                    <br></br>
                    <label for="enddate">End Date : </label>
                    <input type="date" id="enddate" name="enddate" required min={today}></input>
                    <br></br>
                    <br></br>
                    <input type="submit" id={"add-item-btn-"+poke_id} value="Add Pokemon"></input>
            </form>
            
           
        </div>
        
    )
}

export default Items;