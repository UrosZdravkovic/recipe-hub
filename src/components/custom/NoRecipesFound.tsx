import { motion } from "framer-motion";

export default function NoRecipesFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-full py-20"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
      </motion.div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        No recipes found with your selected ingredients
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Try adding or removing ingredients to get more results.<br /> We couldn't find any recipes matching your current selection.
      </p>
    </motion.div>
  );
}