import { Container, Row, Col, Image } from "react-bootstrap";
import { Typography, Button, Paper, useMediaQuery, Box } from "@mui/material";
import { useState, useRef } from "react";

const About = () => {
  const mediaLarge = useMediaQuery("(max-width:993px)");
  const mediaMed = useMediaQuery("(max-width:767px)");

  return (
    <section id="about" className="about pt-2">
      <Container fluid>
        <div className="structure">
          <Row>
            <Col
              className="col-lg-6 col-md-12 col-12"
              style={{
                paddingTop: mediaLarge ? 25 : 0,
              }}
            >
              <Row>
                <div className="sponsor-line position-relative">
                  <strong className="text-uppercase px-3">About Company</strong>
                </div>
                <Row className="pt-5">
                  <Typography
                    variant="h3"
                    align="left"
                    component={"h3"}
                    sx={{
                      fontWeight: "bold",
                      textTransform: "capitailize",
                    }}
                  >
                    Promoting furniture <br /> with social media is one of the
                    best ways to drive sales
                  </Typography>
                  <Typography
                    variant="p"
                    className="text-secondary pt-4 text-capitailize"
                    align="left"
                    paragraph
                  >
                    Our well-thought-out furniture marketing will reach the
                    target audience, generate more leads, and help you blow past
                    the competition. You’ll have your vision brought to life
                    through strategies and direction for your brand...
                  </Typography>

                  <Paper>
                    <Typography
                      align="center"
                      sx={{
                        fontSize: 20,
                        fontFamily: "'Secular One', sans-serif",
                        fontWeight: 400,
                        paddingTop: 1,
                      }}
                      variant="h5"
                      component={"h5"}
                    >
                      New Arrival
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: '"Abel", sans-serif',
                        textTransform: "uppercase",
                        letterSpacing: "0.5rem",
                        fontSize: mediaLarge ? 20 : 35,
                        fontWeight: "lighter",
                        paddingTop: 2,
                      }}
                      align="center"
                    >
                      Portland collection
                      <Typography className="text-secondary text-capitalize pt-3">
                        Natural Meets contemporary <br /> for your bedroom and
                        dining room
                      </Typography>
                    </Typography>
                    <Row className="d-flex justify-content-center align-items-center py-4">
                      <Button
                        variant="outlined"
                        sx={{
                          border: "1px solid black",
                        }}
                        className="w-50 text-center  text-black"
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        Shop Now
                      </Button>
                    </Row>
                  </Paper>
                </Row>
              </Row>
            </Col>
            <Col
              className={
                mediaLarge
                  ? " pt-3 ps-0 col-lg-6 col-12 box-parent"
                  : "pt-0 ps-5 col-lg-6 col-12 box-parent"
              }
            >
              <Box component="div" className="position-relative box">
                <Image
                  src={require("../../imgs/about.jpg")}
                  className="z-2 position-relative"
                  fluid
                ></Image>
              </Box>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default About;
