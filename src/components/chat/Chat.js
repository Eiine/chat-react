import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import{ guardarEnStorage } from "../../helpers/guardarStorage"
import { Users } from './Users';
import axios from 'axios';
const socket = io(process.env.REACT_APP_API_URL);

export const Chat = () => {
  
  const [mensaje, setMensaje] = useState('');
  const[chat, setChat]=useState([])
  const[user, setUser]=useState("")
  const[style,setStyle]=useState("")
  const[inicialChat,setInicialChat]=useState([])
  const handleChange = (e) => {
    setMensaje(e.target.value);
  }
 
  const handleSubmit = (e) => {
    e.preventDefault();
    let user=JSON.parse(localStorage.getItem("user"))
    let sala= JSON.parse(localStorage.getItem("sala"))
    const now = new Date(); 
    const hora = now.getHours(); 
    const minutos = now.getMinutes();

    let message={user:user,message:mensaje, id:new Date().getMilliseconds(),hora:`${hora}:${minutos}`,idSala:sala[0]._id}
    socket.emit("chat",message)
    setMensaje('');
  }

  
  

  useEffect(()=>{
    const idSala=async()=>{
      let {data}= await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/room`
      }
      )
    localStorage.setItem("sala",JSON.stringify(data))
    }
    idSala()
    let user=JSON.parse(localStorage.getItem("user"))
     setStyle(user)  
    socket.emit("usuarios",user)
    socket.on("usuarios",(connectedUsers)=>{
        console.log(connectedUsers);
        setUser(connectedUsers)    
      
  
    })
   },[])

  //pre cargar mensajes
 useEffect(()=>{
  let men=localStorage.getItem("chat")
  let enviar=JSON.parse(men)
  setChat(enviar)
 },[user])


 useEffect(()=>{
  let chat=JSON.parse(localStorage.getItem("inicialChat"))
  
  setInicialChat(chat)
 },[])
  
 
 
 useEffect(()=>{
    socket.on("mensaje",(user)=>{
      //mensaje recuperado
        guardarEnStorage("chat",user)
       let guardados=localStorage.getItem("chat")
      setChat(JSON.parse(guardados))
      
    })

  },[])

  return (
    <div className="chatroom-container">
      <div className="chat-container">
        <h2>Chat</h2>
        <p>Escribe tu munsaje.</p>
          
        {(inicialChat && inicialChat.length === 0) ? (
                <div></div>) : (
          inicialChat?.map((item1)=>{
            return(
              <>
              <div className={item1.user === style.name ? 'local' : 'user2'} key={item1.id}>
              <h3 className='nombre'>{item1.user}</h3>
              <h1 className='mensaje' >{item1.message} </h1>
              <h1 className='hora'>{item1.hora}</h1>
              </div>
              <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
              </>
            )})
          )}
        
          {
          chat?.map((item)=>{
            return(
              <>
            
            <div className={item.user.name === style.name ? 'local' : 'user2'} key={item.id}>
                   {/*dependera del usuaio que estilos se agregaran al mensaje comrpobacion sobre author y cambio con ternaria */}
                  <h3 className='nombre'>{item.user.name}</h3>
                  <h1 className='mensaje' >{item.message} </h1>
                  <h1 className='hora'>{item.hora}</h1>
                  
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            </>
            )
          })}
        
      </div>
      <div className="users-container">
        <Users user={user}/>
      
      </div>
      <div className="input-container">
        <form onSubmit={(e) => handleSubmit(e, socket)} className="input-container">
          <input type="text" value={mensaje} onChange={handleChange} placeholder="Type your message here" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}
