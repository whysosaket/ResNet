import { motion } from "framer-motion";

const Analytics = () => {
  return (
    <motion.div
      initial={{ y: 30 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-2xl mx-auto py-6">
            <iframe src="/public/heatmap.html" className="w-full h-[580px]"></iframe>
      </div>
    </motion.div>
  );
};

export default Analytics;
