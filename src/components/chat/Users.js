import React,{useEffect, useState} from 'react'
export const Users = ({user}) => { 
  const [users, setUsers]=useState([])
  
  useEffect(()=>{
      
        
        let conectados=JSON.parse(localStorage.getItem("conectados"))
        setUsers(conectados)        
        setUsers(user)
        
      
      
  },[user])


  
  return (
    <div>
    <div><h1> Online Users</h1></div>
    <ul>
        
       {users? users.map((name)=>{
        return <li key={name._id}>{name.name}</li>
       }):<h1>Cargando</h1>}
       
        
          
    </ul>
    
    </div>
  )
}
