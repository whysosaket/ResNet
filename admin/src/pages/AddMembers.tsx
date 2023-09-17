import { useState, useRef, useContext } from "react";
import {motion} from 'framer-motion';
import AuthContext from "@/context/Auth/authContext";

const AddMembers = () => {

  const [logging, setLogging] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);

  const {addAgent} = useContext(AuthContext);

  const handleClick = async ()=>{
    let ans = await addAgent(nameRef.current!.value, emailRef.current!.value, mobileRef.current!.value, passwordRef.current!.value);
    if(ans===true) {
      nameRef.current!.value = "";
      emailRef.current!.value = "";
      passwordRef.current!.value = "";
      mobileRef.current!.value = "";
    }
    setLogging(!logging);
  }

  return (
    <>
      <motion.div initial={{y: 40, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.5}} className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 dark:text-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className={`${logging&&"animate-spin"} mx-auto h-12 w-auto`}
            src="./dark-logo.png"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white text-gray-900">
            Add Agents
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
          <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 dark:text-white text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="email"
                  autoComplete="name"
                  ref={nameRef}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 dark:text-white text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  ref={emailRef}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 dark:text-white text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  ref={passwordRef}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 dark:text-white text-gray-900"
              >
                Mobile
              </label>
              <div className="mt-2">
                <input
                  id="mobile"
                  name="mobile"
                  type="mobile"
                  autoComplete="mobile"
                  ref={mobileRef}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                onClick={handleClick}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Agent
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AddMembers;
