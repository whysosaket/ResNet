import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const dataD = {
  "data": [
      "ITER Road & Khandagiri Marg, Khandagiri, Bhubaneswar 751030, Odisha",
      "Bhubaneswar",
      "\n\nOfficial Incident Report\n\nDate: 16th September, 2020\n\nTime: 9:16 AM\n\nLocation: ITER Road & Khandagiri Marg, Khandagiri, Bhubaneswar 751030, Odisha\n\nIncident: Fire\n\nDetails:\n\nAt 9:16 AM on 16th September, 2020, a fire was reported at ITER Road & Khandagiri Marg, Khandagiri, Bhubaneswar 751030, Odisha. The ITER Fire Station was immediately contacted and responded to the scene. Upon arrival, the fire was quickly contained and extinguished.\n\nNo casualties were reported and the situation was brought under control. However, two vehicles were destroyed in the fire.\n\nConclusion:\n\nThe fire at ITER Road & Khandagiri Marg, Khandagiri, Bhubaneswar 751030, Odisha was successfully extinguished by the ITER Fire Station at 9:29 AM on 16th September, 2020. The situation was brought under control and no casualties were reported. However, two vehicles were destroyed in the fire."
  ]
}

const Analytics = () => {
  const [generating, setGenerating] = useState(false);
  const [data, setData] = useState<any>([]);

  return (
    <motion.div
      initial={{ y: 30 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-2xl mx-auto py-6">
        <iframe src="/heatmap.html" className="w-full h-[580px]"></iframe>
        <button
          onClick={() => {setTimeout(()=> setData(dataD.data), 1500);}}
          className="my-5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={generating}
        >
          {generating ? "Generating " : "Generate "}report
        </button>

        {data.map((item: string, i: number) => (
          <p className="block my-2" key={i}>{item}</p>
        ))}
      </div>
    </motion.div>
  );
};

export default Analytics;
