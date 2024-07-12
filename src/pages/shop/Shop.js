import { Container, Row, Nav, Col } from "react-bootstrap";
import {
  Breadcrumbs,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import "../../css/shop.css";

const Shop = () => {
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
        <Container fluid className="categories">
          <Row>
            <ul className="ShopCatog">        
              <Nav.Link className="text-light" as={NavLink} to={"/Women"}>
               
                Women
              </Nav.Link>
              <Nav.Link className="text-light" as={NavLink} to={"/Men"}>
                Men
              </Nav.Link>
              <Nav.Link className="text-light" as={NavLink} to={"/Sports"}>
                
                Sports
              </Nav.Link>
              </ul>   
          </Row>
        </Container>
        <Container fluid className="breadcrumb">
          <Row>
            <Breadcrumbs maxItems={3} aria-label="breadcrumb">
              <Nav.Link className="text-light" as={NavLink} to={"/"}>
                {" "}
                Home
              </Nav.Link>
              <Nav.Link className="text-light" as={NavLink} to={"/shop"}>
                Shop
              </Nav.Link>
            </Breadcrumbs>
          </Row>
        </Container>
      </motion.div>
    </motion.section>
  );
};

export default Shop;
