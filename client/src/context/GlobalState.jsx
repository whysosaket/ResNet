import GlobalContext from "./globalContext";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import io from "socket.io-client";

// suppress warning
//@ts-ignore
const socket = io.connect("http://192.168.29.73:9001");

const HOST = import.meta.env.VITE_HOST;

// suppress warning
//@ts-ignore

const GlobalState = (props) => {

  const [messages, setMessages] = useState([{message: "", reply: "Hi, I'm DisasterBot. How can I help you?"}]);
  const [allAgencies, setAllAgencies] = useState([]);
  const [rtmessages, setRTMessages] = useState([]);
  const notify = (message) => toast(message);
  useEffect(() => {
    const handleIncomingMessage = (message) => {
      const myMessage = {
        text: message,
        by: "Joh",
      };
      setRTMessages((prevMessages) => [...prevMessages, myMessage]);
      console.log(message);
    };

    socket.on("Remessage", handleIncomingMessage);

    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("Remessage", handleIncomingMessage);
    };
  }, []);

  const login = async (email, password) => {
    try {
      let response = await fetch(`${HOST}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      let data = await response.json();
      if (data.success) {
        notify("Login Successful");
        return data;
      } else {
        notify("Login Failed");
        return data;
      }
    } catch (e) {
      notify("Login Failed");
      return { success: false };
    }
  };

  const sendMessage = async (disaster, message) => {

    const response = await fetch("http://192.168.29.73:3001/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({disaster_type: disaster, input_message: message }),
    });

    const json = await response.json();
    let reply = json.response.split("***")[1];
    setMessages([...messages, {message: message, reply: reply}]);
  }

  const fetchAgencies = async () => {
    try {
      let response = await fetch(`${HOST}/api/auth/fetchallagency`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("user-auth-token"),
        },
        body: JSON.stringify({ location: [12.9716, 77.5946] }),
      });
      let data = await response.json();
      console.log(data);
      if (data.success) {
        setAllAgencies(data.agencies);
        return data;
      } else {
        return data;
      }
    } catch (e) {
      return { success: false };
    }
  }


  const sendRTMessage = (message) => {
    const myMessage = {
      text: message,
      by: "Me",
    };
    setRTMessages((prevMessages) => [...prevMessages, myMessage]);
    socket.emit("message", message, () => {
      console.log("Message Delivered");
    });
  }



  
  return (
    <GlobalContext.Provider value={{sendMessage, messages, fetchAgencies, allAgencies, login, sendRTMessage, rtmessages}}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;