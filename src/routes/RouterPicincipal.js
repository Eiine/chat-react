import React from 'react'
import {Route,Routes, BrowserRouter, Link, Navigate} from "react-router-dom"
import {Inicio} from "../components/Inicio"
import {Login} from "../components/Login"
import {Register} from "../components/Register"
import {Chat} from "../components/chat/Chat"
export const RouterPrincipal  = () => {
  return (
    <BrowserRouter>
    
    <Routes>
        <Route path='/' element={<Inicio/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/chat' element={<Chat/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
    </Routes>
    
    </BrowserRouter>
  )
}
