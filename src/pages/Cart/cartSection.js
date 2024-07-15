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
import { NavLink } from "react-router-dom";
import ShoppingCart from "./Cart";
import { FuncContext } from "../../components/PrimaryPage";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import "../../css/CartSection.css";

const CartSection = () => {
    const { StateOfCart } = useContext(FuncContext);

    const MediaMinLarge = useMediaQuery("(min-width:1178px)");
  
    const MediaMed = useMediaQuery("(max-width:576px)");

    const visible = {
        opacity: 1,
        y: 0,
        transition: { type: "spring", duration: 1 },
      };
    
    const MediaText = () => {
      if (MediaMinLarge) {
        return "Back To Shop";
      } else if (MediaMed) {
        return "Back To Shop";
      } else {
        return "Back";
      }
    };
    return ( 

        <motion.Container variants={{
          hidden: { opacity: 0, y: -50 },
          visible,
        }} fluid>
        <Row>
          <Col className="col-lg-9 col-md-9 col-sm-8 col-12">
            <ShoppingCart state={StateOfCart} />
          </Col>
          <Col className="col-lg-3 col-md-3 col-sm-4 col-12">
            <Row>
              <Card className="checkOutCard">
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h6" className="fw-bold mb-3">
                      Summary
                    </Typography>
                    <Typography component={"div"} className="CheckOutOrder">
                      <Typography variant="p">Total Price:</Typography>
                      <Typography variant="p">$189</Typography>
                    </Typography>

                    <Typography component={"div"} className="CheckOutOrder">
                      <Typography variant="p">Shipping Cost:</Typography>
                      <Typography variant="p">$189</Typography>
                    </Typography>
                    <Typography component={"div"} className="CheckOutOrder">
                      <Typography variant="p" className="fw-bold">
                        Total:
                      </Typography>
                      <Typography variant="p" className="fw-bold">
                        $189
                      </Typography>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Typography component={"div"} className="CheckOutOrder">
                <Button
                  variant="contained"
                  color="error"
                  as={NavLink}
                  to={"/shop"}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  {<MediaText />}
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  as={NavLink}
                  to={"/Cart/checkout"}
                >
                  Checkout
                </Button>
              </Typography>
            </Row>
          </Col>
        </Row>
      </motion.Container>
     );
}
 
export default CartSection;