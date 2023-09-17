import { useState } from 'react'

import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import ChatBot from './pages/ChatBot'
import Navbar from './components/Navbar'
import GlobalState from './context/GlobalState'
import Agencies from './pages/Agencies'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Sc from './pages/Sc'
function App() {


  return (
    <>
    <GlobalState>
      <ToastContainer />
    <Router>
      <Navbar />
    <Routes>
      <Route path="/chatbot" element={<ChatBot />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/" element={<Home />} />
      <Route path="/agencies" element={<Agencies />} />
      <Route path="/success" element={<Sc />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    </Router>
    </GlobalState>
    
    </>
  )
}

export default App
