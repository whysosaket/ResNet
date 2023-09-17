import { useState } from "react";
import AuthContext from "./authContext";
import { toast } from "react-toastify";

const HOST = import.meta.env.VITE_HOST;

const AuthState = (props: any) => {
  const notify = (message: string) => toast(message);
  const [agents, setAgents] = useState<any>([]);
  const [agentInfo, setAgentInfo] = useState<any>({name: "", email: "", agentID: "", mobile: "", agency: "", date: ""});

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

  const getMembers = async () => {
    try {
      let response = await fetch(`${HOST}/api/agent/fetchagents`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token")!,
        },
      });
      let data = await response.json();
      if (data.success) {
        setAgents(data.agents);
        return data;
      } else {
        return data;
      }
    } catch (e) {
      return { success: false };
    }
  }

  const getAgentInfo = async (agentID: string) => {
    try {
      let response = await fetch(`${HOST}/api/agent/fetchagent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token")!,
        },
        body: JSON.stringify({ agentID: agentID }),
      });
      let data = await response.json();
      console.log(data);
      if (data.success) {
        setAgentInfo(data.agent);
        return data;
      } else {
        return data;
      }
    } catch (e) {
      return { success: false };
    }
  }

  return (
    <AuthContext.Provider value={{ login, getMembers, agents, getAgentInfo, agentInfo }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
