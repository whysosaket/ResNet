import { useContext, useEffect } from "react"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import _404 from "./pages/_404";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Active from "./pages/Active";
import Track from "./pages/Track";
import Members from "./pages/Members";
import Chats from "./pages/Chats";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";

import GlobalState from "./context/Global/GlobalState";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthState from "./context/Auth/AuthState";
import Agencies from "./pages/Agencies";
import AddMembers from "./pages/AddMembers";

function App() {
  useEffect(() => {
    document.title = "RescueNet"
  }, []);

  return (
    <>
    <GlobalState>
      <AuthState>
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/active" element={<Active />} />
          <Route path="/track" element={<Track />} />
          <Route path="/members" element={<Members />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/agencies" element={<Agencies />} />
          <Route path="/addmembers" element={<AddMembers />} />
          <Route path="*" element={<_404 />} />
        </Routes>
        <Footer />
      </Router>
      </AuthState>
      </GlobalState>
    </>
  )
}

export default App
