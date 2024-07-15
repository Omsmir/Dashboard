import { Container, Row, Nav, Col } from "react-bootstrap";

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import "../../css/shop.css";

const Sport = () => {
  const visible = {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 1 },
  };

  return (
    <motion.section
      id="shop"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ visible: { transition: { staggerChildren: 0.5 } } }}
    >
      <motion.div
        className="structure"
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible,
        }}
      >
     
      </motion.div>
    </motion.section>

    )}

export default Sport