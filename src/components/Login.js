import React, { useState, useRef, useEffect } from 'react';
import axios from"axios"
import { Link, useNavigate } from "react-router-dom";
import { guardarEnStorage } from '../helpers/guardarStorage';
import { Rejister } from './Register';
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputWidth, setInputWidth] = useState(0);
  const inputRef = useRef(null);
  let navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Solicitud de acceso
    console.log(`Email: ${email}, Contraseña: ${password}`);
    let {data}=await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/login`,
      data: {
        email,
        password
      }
      
    });

    if(data !== Error)
    navigate("/chat")
    setEmail('');
    setPassword('');
    
    //cargar mensajes de sala
    const datos=async()=>{
      let {data}= await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/room`
      }
      )
      localStorage.setItem("inicialChat",JSON.stringify(data[0].other))
    }
    
    datos()

    //capturar el usuario
    localStorage.setItem("user", JSON.stringify(data[0]))
    guardarEnStorage("conectados",data[0])
      localStorage.removeItem("chat")
    
  };
  
  useEffect(() => {
    setInputWidth(inputRef.current.offsetWidth);
  }, []);
 
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <label className="login-label">
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="login-input"
            ref={inputRef}
          />
        </label>
        <br />
        <label className="login-label">
          Contraseña:<br></br>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="login-input"
            style={{ width: inputWidth }}
          />
        </label>
        <br />
        <button type="submit" className="login-button">
          Iniciar sesión
        </button>
        <br></br>
        <Link className='link' to="/Register">Si aun no estas registrado hace click.</Link>
      </form>
      
      
    </div>
  );
};

