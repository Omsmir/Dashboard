import { Container, Row, Col, Button, Image, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShoppingCart from "../../components/cart";
import { AcUnit, ShoppingCartOutlined } from "@mui/icons-material";
import { useMediaQuery, Typography, Box } from "@mui/material";
import { useState, useEffect, useRef, useContext } from "react";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Typed from "typed.js";
import { motion } from "framer-motion";
import { FuncContext } from "../../components/PrimaryPage";

const HomeBanner = () => {
  const mediaLarge = useMediaQuery("(max-width:993px)");
  const mediaMed = useMediaQuery("(max-width:767px)");
  const MediaSmall = useMediaQuery("(max-width:367px)");

  const visible = {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 1 },
  };

  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  const [user] = useAuthState(auth);

  const { value, toggleState } = useContext(FuncContext);

  // console.clear();

  // Create Ref element.
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Infinite <br/> Chances  <br/> For You",
        "Infinite <br/> Choices <br/> One Agency",
        "Infinite <br/> Possibilites<br/> Means Us",
      ],
      startDelay: 300,
      typeSpeed: 200,
      backSpeed: 200,
      backDelay: 200,
      loop: true,
      showCursor: false,
    });

    // Destropying
    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <>
      {user ? <ShoppingCart /> : ""}
      <motion.section
        className="HomeBanner pt-5"
        id="HomeBanner"
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.5 } } }}
      >
        {user ? (
          <div className="cart cartMobile">
            <Button onClick={() => toggleState(!value)} className="btn-1">
              <ShoppingCartOutlined className="me-0" />
            </Button>
          </div>
        ) : (
          ""
        )}
        <Container fluid className="pt-5">
          <motion.div
            className="structure position-relative"
            variants={{
              hidden: { opacity: 0, y: -50 },
              visible,
            }}
          >
            <Box className="IceGroup">
              <AcUnit className="AcUnit" />
              <AcUnit className="AcUnit" />
              <AcUnit className="AcUnit" />
              <AcUnit className="AcUnit" />
            </Box>
            <Row>
              <Col className="col-lg-6 col-md-12 col-sm-12 col-12">
                <Box className="row">
                  <Box className="first">
                    <Row className="px-5">
                      <Col className="col-12">
                        <Typography
                          ref={el}
                          component={"h4"}
                          style={{
                            maxWidth: MediaSmall ? "220px" : "",
                          }}
                        >
                          Infinite <br /> Possibilites
                          <br /> One Agency
                        </Typography>
                      </Col>
                    </Row>
                    <Row className={MediaSmall ? "" : "px-5"}>
                      <Typography>
                        Dagen is a full-service marketing agency for the
                        furniture <br /> industry. Bring more customers to your
                        business
                      </Typography>
                    </Row>
                    <Box className="px-5 pb-3">
                      <Button
                        className="btn-1 fw-bold"
                        as={Link}
                        to={"../Shop"}
                      >
                        Get Started
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Col>
              <Col className="col-lg-6 col-md-12 col-sm-12 col-12 position-relative">
                <Toast show={showA} onClick={toggleShowA}>
                  <Toast.Header>
                    <span className="badge"></span>
                    <strong className="me-auto text-capitalize">
                      suggestion
                    </strong>
                  </Toast.Header>
                  <Toast.Body>Explore Our Services</Toast.Body>
                </Toast>
                <Box className="image">
                  <Image src={require("../../imgs/Head.png")} fluid />
                </Box>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </motion.section>
    </>
  );
};

export default HomeBanner;
