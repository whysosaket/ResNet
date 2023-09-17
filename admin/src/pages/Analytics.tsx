import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Analytics = () => {
  const [generating, setGenerating] = useState(false);
  const [data, setData] = useState([]);

  return (
    <motion.div
      initial={{ y: 30 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-2xl mx-auto py-6">
        <iframe src="/heatmap.html" className="w-full h-[580px]"></iframe>
        <button
          onClick={() => {
            const req = {
              lat: "20.252065238866486",
              long: "85.80047207006123",
              incident_type: "Fire",
              time: "1694916148",
              authority_comments:
                "No casualties,Situation under control, 2 vehicles were destoryed in the fire",
              time_of_arrival: "1694916928",
              responding_dept: "ITER Fire Station",
            };

            setGenerating(true);
            axios
              .post("http://192.168.29.73:5002/generate_report", {
                ...req,
              })
              .then((res) => {
                console.log(res.data);
                setData(res.data.data);
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                setGenerating(false);
              });
          }}
          className="my-5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={generating}
        >
          {generating ? "Generating " : "Generate "}report
        </button>

        {data.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
    </motion.div>
  );
};

export default Analytics;
