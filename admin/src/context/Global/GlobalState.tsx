import GlobalContext from "./globalContext";
import { toast } from 'react-toastify';
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://192.168.29.73:9001");

const GlobalState = (props:any) => {

  const notify = () => toast("Wow so easy!");

  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    const handleIncomingMessage = (message: any) => {
      const myMessage = {
        text: message,
        by: "Joh",
      };
      setMessages((prevMessages: any) => [...prevMessages, myMessage]);
      console.log(message);
    };

    socket.on("Remessage", handleIncomingMessage);

    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("Remessage", handleIncomingMessage);
    };
  }, []);

  const sendMessage = (message: any) => {
    const myMessage = {
      text: message,
      by: "Me",
    };
    setMessages((prevMessages: any) => [...prevMessages, myMessage]);
    socket.emit("message", message, () => {
      console.log("Message Delivered");
    });
  }





  return (
    <GlobalContext.Provider value={{notify, sendMessage, messages, setMessages}}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;