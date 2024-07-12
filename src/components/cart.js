import { Row, Col,  } from "react-bootstrap";
import { useState, useContext } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import { FuncContext } from "./PrimaryPage";
import { motion } from "framer-motion";
import {
  Typography,
  Button,
  Grid,
  Paper,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  useMediaQuery,
  Backdrop,
} from "@mui/material";

const ShoppingCart = (item) => {
  const { value, toggleState } = useContext(FuncContext);
  const show = {
    display: "flex",
    opacity: 1,
  };

  const hide = {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  };

  return (
    <>
      {item.state ? (
        <motion.div
          className={`outer-div CartMobileOut position-relative container-fluid `}>
          <PartOfCart />
        </motion.div>
      ) : (
        <motion.div
          transition={{ duration: 1 }}
          animate={value ? show : hide}
          style={{ display: value ? "flex" : "none" }}
          className="checkit">
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer }}
            open={value}
            onClick={() => {
              toggleState(!value);
            }}></Backdrop>
          <div className={`outer-div CartMobileIn position-fixed container `}>
            <PartOfCart />
          </div>
        </motion.div>
      )}
    </>
  );
};

const PartOfCart = () => {
  const [x, setX] = useState(1);

  const Increment = () => {
    if (x > 9) {
      setX(10);
    } else {
      setX((x) => x + 1);
    }
  };

  const Decrement = () => {
    if (x < 2) {
      setX(1);
    } else {
      setX((x) => x - 1);
    }
  };
  return (
    <Box className="cart">
      <Row style={{ overflow: "hidden" }} className="CartOuterRow">
        <Product />
        <Product />
        <Product />
        <Product />
      </Row>
    </Box>
  );
};

const Product = (props) => {
  const mediaMed = useMediaQuery("(max-width:767px)");

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ flexGrow: 1, padding: 0 }} className="SelfProduct">
      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 0 }}>
        <Grid item xs={3} className="CartColumn">
          <Item className="CartRow">
            <Box className="Product ProductImage">
              <Card
                sx={{
                  minWidth: mediaMed ? "85px" : "auto",
                  width: mediaMed ? "auto" : "100px",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="90"
                    image={require("../imgs/shirts/white.jpg")}
                    alt="green iguana"
                  />
                </CardActionArea>
              </Card>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6} className="CartColumn">
          <Item className="CartRow">
            <Box
              sx={{ maxHeight: "140px" }}
              className="Product ProductDescription"
            >
              <Div>
                <Typography
                  component={"h6"}
                  align="left"
                  className="ProductName"
                >
                  T-Shirt
                </Typography>
                <Typography paragraph align="left" className="ProductColor">
                  Mint
                </Typography>
                <Typography paragraph align="left" className="ProductSize">
                  Medium
                </Typography>
                <Typography paragraph align="left" className="ProductCount">
                  x1
                </Typography>
              </Div>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={3} className="CartColumn">
          <Item className="CartRow">
            <Box className="Product ProductAmendements">
              <Row>
                <Col>
                  <Typography className="ProductPrice" paragraph>
                    $32.00
                  </Typography>
                </Col>
                <Col>
                  <Button size="small" className="ProductRemove">
                    Remove
                  </Button>
                </Col>
              </Row>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShoppingCart;
