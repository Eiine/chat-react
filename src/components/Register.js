import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mostrar, setMostrar]=useState(true)
    let navigate = useNavigate();
    const handleSubmit = async(event) => {
      event.preventDefault();
      let {data}=await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/user/register`,
        data: {
          name,
          email,
          password
        }
        
      });
      
       if(data.message == "El email existe en la base de datos"){
        setMostrar(false)
        return console.log("Email ya existe en el sistema");
    }
       localStorage.setItem("user", JSON.stringify(data.user))
       navigate("/chat")
      
      
    }
  
    return (
        <div className="container">
      <div className="registro">
        <h2>Registro de usuarios</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          <br />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />
          <label htmlFor="contrasena">Contraseña:</label>
          <input type="password" id="contrasena" name="contrasena" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button type="submit">Registrar</button>
          {mostrar? "":<p>El email ya existe en la base de datos</p> }
        </form>
      </div>
      </div>
    );
}
