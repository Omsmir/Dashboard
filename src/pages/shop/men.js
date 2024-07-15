import { motion } from "framer-motion";
import "../../css/shop.css";
import { Container } from "react-bootstrap";
import { ShopContext } from "./Shop";
import { useContext } from "react";
const Men = () => {
  const visible = {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 1 },
  };

  const {omar} = useContext(ShopContext)
  return (
    <motion.section
      id="shop"
      initial="hidden"
      animate="visible"
      className="Men"
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
       <Container fluid>
Hello 
       </Container>
      </motion.div>
    </motion.section>

    )}

export default Men