import {useState, useEffect} from 'react';


const History = props => { 

    const bid_id = props.bid_id;
    const [bidData, setBidData] = useState([]);
    
   
   
    useEffect(()=>{
        fetch(`https://poke-bid-backend.onrender.com/bid/${bid_id}`)
            .then(res => res.json())
            .then(data => {
                setBidData(data)
            })
            .catch(err => console.log(err))
    },[])

    
    

    return(
        <>    
            {bidData.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Bid Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bidData.map((bid, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{bid.username}</td>
                                <td>${bid.bid_amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No bids found for this item.</div>
            )}
        </>
        
    )
}

export default History;