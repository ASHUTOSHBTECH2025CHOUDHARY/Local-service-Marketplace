import React from 'react'
import {loadStripe} from '@stripe/stripe-js';

const Payment = () => {

    const cart = [{
        price:100,
        name:"Shray",
        qty:1,
    }]

    const customerInfo = {
        name: "shray",
        address: {
            line1:'sdsdssdsd' ,
            city: 'mathura',
            state: 'UP',
           postal_code: 281006,
            country: 'IN'
        }
    };

    const handlePayment =async () => {
        try {
            const stripe = await loadStripe('pk_test_51PWuNoSDtSTagWPeEcInkemagrC5J2W1WH2zrCvAAUDjWp4FQfGMM3baZjtA8p9aODklPwIxRttj0jBjbKncAXcF00I2lQ0wGM');


const response = await fetch("http://localhost:5000/payment",{
    method:"POST",
    headers:{
        "Content-Type": "application/json"
        },
        // body: JSON.stringify({products:cart})
        body: JSON.stringify({products:cart,customerInfo:customerInfo})
}) 
console.log(response)
if (!response.ok) {
    throw new Error('Failed to create checkout session');

  }

const session = await response.json();
    const res = stripe.redirectToCheckout({
        sessionId: session.id
    })
    if(res.error){
        console.log(result.error)
    }
    
        } catch (error) {
            console.log(error)

        }
    }


  return (
    <div style={{display:"flex",width:"100vw",justifyContent:"center",alignItems:"center",marginTop:"30px"}}>
        <button className='btn btn-success' onClick={handlePayment} >Pay Now</button>
    </div>
  )
}

export default Payment