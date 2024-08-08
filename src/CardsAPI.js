import {useState, useEffect} from 'react';


const CardsAPI = props => { 

    const poke_id = props.pid;
    const [poke_name, setName] =  useState('');
    const [poke_img, setImg] =  useState('');
    const [poke_hp, setHP] =  useState('');
    const [poke_atk, setAT] =  useState('');
    const [poke_dfc, setDF] =  useState('');
    const [poke_type, setType] =  useState('');
    const [poke_bid, setBid] = useState(50);
    const [poke_bid_user, setBidUser] = useState('--------');
    const [bid_end_date, setEndDate] = useState('');

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
                const today = new Date().toDateString();
                setEndDate(today)

            })
            .catch(err => console.log(err))
    },[])

    function handleNewBid(event){
        event.preventDefault()
        const form = event.target
        setBidUser(form.biduser.value)
        setBid(poke_bid+5);
        form.biduser.value="";

        // add here to connect mongodb and insert bidding history
    }

    return(
        
        <div className={`card ${poke_type.toLowerCase()}`} >
            <h3>{poke_name}</h3>
            <p>ID - {poke_id} | TYPE - {poke_type}</p>
            <h4>End Date: {bid_end_date}</h4>
            <h4>Highest Bidder : {poke_bid_user} (${poke_bid})</h4>
            <div class="card-info">
                <img src={poke_img} width='200' height='200'></img>
                <div class="card-stat">
                    <p>HP {poke_hp}<progress value={poke_hp} max="100"></progress></p>
                    <p>Attack {poke_atk}<progress value={poke_atk} max="100"></progress></p>
                    <p>Defense {poke_dfc}<progress value={poke_dfc} max="100"></progress> </p>
                </div>  
            </div>
            <form id={"form-"+poke_id} onSubmit={handleNewBid}>
                <label for="biduser">username : </label>
                <input type="text" id="biduser" name="biduser" required></input>
                <br></br>
                <br></br>
                <input type="submit" id={"btn-"+poke_id} value="+$5"></input>
            </form>
           
        </div>
        
    )
}

export default CardsAPI;