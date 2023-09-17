import { useContext } from "react";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import GlobalContext from "../../context/globalContext";

const AllMessages = () => {
  const { rtmessages } = useContext(GlobalContext);

  return (
    <>
      <div className={`relative w-full px-4 flex flex-col justify-end`}>
        {rtmessages.map((message, index) => {
          return message.by == "Me" ? (
            <OutgoingMessage key={index} message={message.text} by="Me" />
          ) : (
            <IncomingMessage key={index} message={message.text} by="Joh" />
          );
        })}
      </div>
    </>
  );
};

export default AllMessages;
