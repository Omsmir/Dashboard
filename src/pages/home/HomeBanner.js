import { Container, Row, Col, Image,Toast as MUToast ,Button as MuButton} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import ShoppingCart from "../Cart/Cart";
import { AcUnit, ShoppingCartOutlined } from "@mui/icons-material";
import { useMediaQuery, Typography, Box } from "@mui/material";
import { useState, useEffect, useRef, useContext } from "react";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Toast ,Button} from 'primereact';
import Typed from "typed.js";
import { FuncContext } from "../../components/PrimaryPage";
import MotionComponent from "../../components/Motion";

const HomeBanner = () => {
  const [user] = useAuthState(auth)

  return (
    <>
      {user ? <ShoppingCart /> : ""}

<MotionComponent componet={<HomeComponent />} id={"HomeBanner"} className={"HomeBanner"} />
       
     
    </>
  );
};


const HomeComponent = () => {
  
  const MediaSmall = useMediaQuery("(max-width:367px)");

  const toast = useRef(null);

  const show = () => {
      toast.current.show({severity: 'contrast', summary: 'Contrast', detail: 'Log in First To Start Shopping' });
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
    
    <Container fluid className="position-relative">
          <Box className="IceGroup">
      <AcUnit className="AcUnit" />
      <AcUnit className="AcUnit" />
      <AcUnit className="AcUnit" />
      <AcUnit className="AcUnit" />
    </Box>
{user ? (
      <div className="cart cartMobile">
        <Button onClick={() => toggleState(!value)} className="btn-1">
          <ShoppingCartOutlined className="me-0" />
        </Button>
      </div>
    ) : (
      ""
    )}

    <Row>
      <Col className="col-lg-6 col-md-12 col-sm-12 col-12">
        <Box className="row">
          <Box className="first">         
                <Typography
                  ref={el}
                  component={"h3"}
                  style={{
                    maxWidth: MediaSmall ? "220px" : "",
                  }}
                >
                  Infinite <br /> Possibilites
                  <br /> One Agency
                </Typography>  
              <Typography paragraph >
               we believe that fashion is not just about clothing, but about expressing your unique personality and style. We are dedicated to providing you with the latest trends
              </Typography>
            
            <Box className="pb-3">
            <Toast ref={toast} />
             {user ?  <MuButton
                className="shopBtn"
                as={NavLink}
                to={"../Shop"}
              >Start Shopping</MuButton>
            : <Button
                className="shopBtn"
                onClick={show} 
                label="Start Shopping"
              >
              </Button> }
            </Box>
          </Box>
        </Box>
      </Col>
      <Col className="col-lg-6 col-md-12 col-sm-12 col-12 position-relative">
        <MUToast show={showA} onClick={toggleShowA}>
          <MUToast.Header>
            <span className="badge"></span>
            <strong className="me-auto text-capitalize">
              suggestion
            </strong>
          </MUToast.Header>
          <MUToast.Body>Explore Our Services</MUToast.Body>
        </MUToast>
        <Box className="image">
          <Image src={require("../../imgs/Head.png")} fluid />
        </Box>
      </Col>
    </Row>
</Container>
  )
}
export default HomeBanner;
