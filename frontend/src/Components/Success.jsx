import React from 'react'
import {NavLink} from 'react-router-dom'
const Success = () => {
  return (
    <div className='container' style={{display:"flex",width:"100vw",justifyContent:"center",alignItems:"center",margin:"30px 0 30px 200px ",flexDirection:"column"}}> 
        <div style={{fontSize:"50px"}}>Payment Successful</div>
        <NavLink to='/dashboard'> <button className='btn btn-success' >Go Home</button></NavLink>
    </div>
  )
}

export default Success