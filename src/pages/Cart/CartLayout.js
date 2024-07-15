import { Container, Row, Nav, Col } from "react-bootstrap";
import {
  Card,
  CardActionArea,
  CardContent,
  Breadcrumbs,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { Navigate, NavLink } from "react-router-dom";
import ShoppingCart from "./Cart";
import { FuncContext } from "../../components/PrimaryPage";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import "../../css/CartSection.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

const CartLayout = () => {
  const [user] = useAuthState(auth)
   
  const visible = {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 1 },
  };

  return (
    <motion.section
      id="CartSection"
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
        <Container fluid className="breadcrumb">
          <Row>
            <Breadcrumbs maxItems={4} aria-label="breadcrumb">
              <Nav.Link className="text-light" as={NavLink} to={"/"}>
                {" "}
                Home
              </Nav.Link>
              <Nav.Link className="text-light" as={NavLink} to={"Cartsection"}>
                Cart
              </Nav.Link>
              <Nav.Link className="text-light" as={NavLink} to={"checkout"}>
                {" "}
                Checkout
              </Nav.Link>
            </Breadcrumbs>
          </Row>
        </Container>
      
        {user ? <Outlet /> : <Navigate to={"/Login"} /> }
      </motion.div>
    </motion.section>
  );
};

export default CartLayout;
