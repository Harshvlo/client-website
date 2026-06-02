import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col" style={{ minHeight:"100vh" }}>
      <Navbar />
      <motion.main
        className="flex-1 flex flex-col"
        style={{ minHeight:"calc(100vh - 72px)" }}
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ duration:0.35 }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
