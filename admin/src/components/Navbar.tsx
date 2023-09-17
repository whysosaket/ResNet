import { useEffect, useState } from "react";
import superheroes from "superheroes";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [blocation, setBlocation] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setBlocation(location.pathname);
  }, [location]);

  const handleTravel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <img className="w-8 mr-1" src="./dark-logo.png" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              RescueNet
            </span>
          </Link>
          <div className="flex items-center md:order-2">
            <button
              type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
              onClick={() => setDropdown(!dropdown)}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={`https://avatars.dicebear.com/api/micah/${superheroes.random()}.svg`}
                alt="user photo"
              />
            </button>
            {/* Dropdown menu */}
            <div
              className={`${
                dropdown ? "block" : "hidden"
              } absolute top-10 right-5 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  Saket Aryan
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  saket@email.com
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    to="/addmembers"
                    onClick={() => setDropdown(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Add Agents
                  </Link>
                </li>
                {localStorage.getItem("auth-token") ? (
                  <li>
                    <button
                      onClick={() => {
                        localStorage.removeItem("auth-token");
                        setDropdown(false);
                        navigate("/login");
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/login"
                      onClick={() => setDropdown(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  onClick={handleTravel}
                  className={`block py-2 pl-3 pr-4 text-white ${
                    (blocation === "/" || blocation === "/home") &&
                    "bg-blue-700"
                  } rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/chats"
                  onClick={handleTravel}
                  className={`${
                    blocation === "/chats" &&
                    "bg-blue-700 md:bg-transparent text-blue-700"
                  } block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                >
                  Chats
                </Link>
              </li>
              <li>
                <Link
                  to="/agencies"
                  onClick={handleTravel}
                  className={`${
                    blocation === "/agencies" &&
                    "bg-blue-700 md:bg-transparent text-blue-700"
                  } block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                >
                  Agencies
                </Link>
              </li>
              <li>
                <Link
                  to="/track"
                  onClick={handleTravel}
                  className={`${
                    blocation === "/track" &&
                    "bg-blue-700 md:bg-transparent text-blue-700"
                  } block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                >
                  Track
                </Link>
              </li>
              <li>
                <Link
                  to="/members"
                  onClick={handleTravel}
                  className={`${
                    blocation === "/members" &&
                    "bg-blue-700 md:bg-transparent text-blue-700"
                  } block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                >
                  Members
                </Link>
              </li>
              <li>
                <Link
                  to="/analytics"
                  onClick={handleTravel}
                  className={`${
                    blocation === "/analytics" &&
                    "bg-blue-700 md:bg-transparent text-blue-700"
                  } block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                >
                  Analytics
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
