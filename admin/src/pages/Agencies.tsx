import AgenciesCard from "@/components/Agency/AgencyCard";
import { useState } from "react";
import { motion } from "framer-motion";
import AgencyMap from "@/components/Agency/AgencyMap";

const membersSample = [
  { name: "Shiv", userid: "FF0881" },
  { name: "Kumar", userid: "FK0101" },
  { name: "Rahul", userid: "FF0101" },
  { name: "Shakib", userid: "HG8172" },
  { name: "Roman", userid: "KJ9129" },
];

const Agencies = () => {
  const [members, setMembers] = useState<any[]>(membersSample);
  const [showMap, setShowMap] = useState<boolean>(false);

  return (
    <div className="w-full md:px-6">
      <h1 className="my-2 text-center font-bold text-2xl">Agencies</h1>
      <hr className="my-2 mx-8 border-gray-200 flex sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="flex justify-center">
        <button
          onClick={() => setShowMap(!showMap)}
          className="mx-auto my-2 px-4 py-2 w-1/2 rounded-lg bg-blue-500 bg-opacity-10 text-white font-bold"
        >
          {showMap ? "Hide Map" : "Show Map"}
        </button>
      </div>
      {showMap && <AgencyMap />}
      {members.map((member, index) => {
        return (
          <AgenciesCard
            key={index}
            delay={index}
            name={member.name}
            userid={member.userid}
          />
        );
      })}
    </div>
  );
};

export default Agencies;
