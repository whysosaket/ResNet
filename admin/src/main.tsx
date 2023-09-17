import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import Loading from "./components/Loading";

function Root() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <React.StrictMode>{isLoading ? <Loading /> : <App />}</React.StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
