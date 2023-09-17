import { useState } from 'react'

import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Chats from '../pages/Chats'
import Chat from '../pages/Chat'
function App() {


  return (
    <>
    <Router>
    <Routes>
    <Route path="/chats" element={<Chats />} />
          <Route path="/chat" element={<Chat />} />
    </Routes>
    </Router>
    
    </>
  )
}

export default App
