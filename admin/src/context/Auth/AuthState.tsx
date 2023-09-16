import AuthContext from "./authContext";
import { toast } from "react-toastify";

const HOST = import.meta.env.VITE_HOST;

const AuthState = (props: any) => {
  const notify = (message: string) => toast(message);

  const login = async (email: string, password: string) => {
    try {
      let response = await fetch(`${HOST}/api/agency/login`, {
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

  return (
    <AuthContext.Provider value={{ login }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
