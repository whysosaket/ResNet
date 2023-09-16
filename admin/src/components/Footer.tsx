import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Footer = () => {

  const [blocation, setBlocation] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setBlocation(location.pathname);
  }, [location]);

  return (
    <>{blocation !== "/login" && blocation !== "/signup" && blocation !== "/chat" &&
      <footer className="rounded-lg shadow m-4 relative bottom-0">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <hr className="my-6 border-gray-200 flex sm:mx-auto dark:border-gray-700 lg:my-8" />
          <h1 className="block mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
            © 2023 RescueNet™. All Rights Reserved.
          </h1>
        </div>
      </footer>
      }
    </>
  );
};

export default Footer;
