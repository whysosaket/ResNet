import GlobalContext from "./globalContext";
import { toast } from 'react-toastify';

const GlobalState = (props:any) => {

  const notify = () => toast("Wow so easy!");



  return (
    <GlobalContext.Provider value={{notify}}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;