import { useState } from 'react'

import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import ChatBot from './pages/ChatBot'
import Navbar from './components/Navbar'
import GlobalState from './context/GlobalState'
import Agencies from './pages/Agencies'
import Login from './pages/Login'
import Chat from './pages/Chat'
function App() {


  return (
    <>
    <GlobalState>
    <Router>
      <Navbar />
    <Routes>
      <Route path="/chatbot" element={<ChatBot />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/agencies" element={<Agencies />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    </Router>
    </GlobalState>
    
    </>
  )
}

export default App
