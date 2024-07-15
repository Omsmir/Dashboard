import { Container, Row, Nav, Col } from "react-bootstrap";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Breadcrumbs,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import ShoppingCart from "./Cart";
import { motion } from "framer-motion";
import { FuncContext } from "../../components/PrimaryPage";
import "../../css/CartSection.css";

const Checkout = () => {
  const MediaMinLarge = useMediaQuery("(min-width:1178px)");

  const MediaMed = useMediaQuery("(max-width:576px)");

  const visible = {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 1 },
  };

  return (
    <motion.section
      id="checkout"
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
  );
};

export default Checkout;
