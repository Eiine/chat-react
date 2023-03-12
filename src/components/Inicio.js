import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
export const Inicio = () => {
  
  useEffect(()=>{

    const createSala=async()=>{
      let {data}=await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/room`,
        data:{
            name_rom:"Sala chat comun", 
            category:"conversacion grupal"
        }
      })
      console.log(data);
      
    }
    createSala()
  },[])

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Bienvenido a la aplicación de chat</h1>
      <p className="welcome-subtitle">¡Únete a la conversación y comunícate con tus amigos!</p>
      <div className="welcome-image-container">
      </div>
      <Link to="/login" className="welcome-button">Iniciar sesión</Link>
    </div>
  );
}
