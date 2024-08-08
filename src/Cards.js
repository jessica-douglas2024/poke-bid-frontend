import {useState, useEffect} from 'react';
import History from './History';

const Cards = props => { 

    const [poke_id,setPokeID] = useState('');
    const [poke_name, setName] =  useState('');
    const [poke_img, setImg] =  useState('');
    const [poke_hp, setHP] =  useState('');
    const [poke_atk, setAT] =  useState('');
    const [poke_dfc, setDF] =  useState('');
    const [poke_type, setType] =  useState('');
    const [poke_bid, setBid] = useState(0);
    const [poke_bid_user, setBidUser] = useState('--------');
    const [bid_end_date, setEndDate] = useState('');
    const bid_id = props.bid_id;
    const [show_history,setShowHistory] = useState(false);

    useEffect(()=>{
        fetch(`https://poke-bid-backend.onrender.com/item/${bid_id}`)
            .then(res => res.json())
            .then(data => {
                
                setPokeID(data.poke_id)
                setName(data.poke_name.toUpperCase())
                setImg(data.poke_img)
                setHP(data.poke_hp)
                setAT(data.poke_attack)
                setDF(data.poke_defense)
                setType(data.poke_type)
                setEndDate(data.end_date.substring(0,10))
                setBid(data.start_price)

            })
            .catch(err => console.log(err))

        fetch(`https://poke-bid-backend.onrender.com/bid/highest/${bid_id}`)
            .then(res => res.json())
            .then(data => { 
                
                if (data && data.bid_amount) {
                    setBid(data.bid_amount);
                    setBidUser(data.username);
                } else {
                   
                    setBidUser('---------'); 
                }
            })
            .catch(err => console.log(err))
       
    },[bid_id])

    useEffect(()=>{
        

        fetch(`https://poke-bid-backend.onrender.com/bid/highest/${bid_id}`)
            .then(res => res.json())
            .then(data => { 
                
                if (data && data.bid_amount) {
                    setBid(data.bid_amount);
                    setBidUser(data.username);
                } else {
                   
                    setBidUser('---------'); 
                }
            })
            .catch(err => console.log(err))
       
    },[poke_bid])

    useEffect(()=>{
        

        fetch(`https://poke-bid-backend.onrender.com/bid/highest/${bid_id}`)
            .then(res => res.json())
            .then(data => { 
                
                if (data && data.bid_amount) {
                    setBid(data.bid_amount);
                    setBidUser(data.username);
                } else {
                   
                    setBidUser('---------'); 
                }
            })
            .catch(err => console.log(err))
       
    },[poke_bid_user])

    function handleNewBid(event){

        event.preventDefault()
        const form = event.target
        setBidUser(form.biduser.value)
        setBid(poke_bid+5)
        
        const bid_date = new Date().toISOString();
        const username = form.biduser.value;
        const bid_amount = poke_bid+5;
       
        const bidData = {
            bid_id,
            poke_id,
            username,
            bid_date,
            bid_amount
        };

        console.log(JSON.stringify(bidData))

        fetch('https://poke-bid-backend.onrender.com/bid/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bidData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            form.biduser.value="";
            alert("Bid added succefully!")
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }

    function showHistory(e){
        e.preventDefault()
       
        if(e.target.value === "Show History"){
            setShowHistory(true);
        }else{
            setShowHistory(false);
        }
    }

    

    return(
        
        <div className={`card ${poke_type.toLowerCase()}`} >
            <form id={"form-"+poke_id} onSubmit={handleNewBid}>
                <h3 name="poke_name" id="poke_name">{poke_name}</h3>
                <p>Pokemon ID - {poke_id} | Type - {poke_type}</p>
                
                
                <h4>End Date: {bid_end_date}</h4>
                <h4>Highest Bidder : {poke_bid_user} (${poke_bid})</h4>
                <div class="card-info">
                    <img src={poke_img} width='200' height='200'></img>
                    <div class="card-stat">
                        <p>HP {poke_hp}<progress value={poke_hp} max="100"></progress></p>
                        <p>Attack {poke_atk}<progress value={poke_atk} max="100"></progress></p>
                        <p>Defense {poke_dfc}<progress value={poke_dfc} max="100"></progress> </p>
                    </div> 
                    {show_history && (
                    <div className="bid-history">
                        
                        <History bid_id = {bid_id}/>
                    </div>
                )}
                   
                </div>

                
                
                <p>BID ID : {bid_id}   <input type="button" id={"show-"+bid_id} value={show_history ? "Hide History" : "Show History"} onClick={showHistory}></input></p>
                
                <br></br>
                <br></br>
                
                <label for="biduser">username : </label>
                <input type="text" id="biduser" name="biduser" required></input>
                <br></br>
                <br></br>
                <input type="submit" value="+$5"></input>
                
            </form>
           
        </div>
        
    )
}

export default Cards;