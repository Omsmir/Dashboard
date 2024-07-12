import { Container, Row, Col } from "react-bootstrap";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Paper,
  useMediaQuery,
} from "@mui/material";
import {
  Article,
  Chair,
  BarChart,
  Polyline,
  ThumbUpOffAlt,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Services = () => {
  const mediaLarge = useMediaQuery("(max-width:993px)");
  const mediaMed = useMediaQuery("(max-width:767px)");

  const Div = (props) => {
    return <div>{props.icon}</div>;
  };

  return (
    <section className="services py-5" id="services">
      <Container fluid>
        <div className="structure">
          <Row>
            <Col
              className={`d-flex col-lg-6 col-12 ${
                mediaMed ? "flex-column" : "flex-row"
              }`}
              data-aos={mediaLarge ? "fade-up" : ""}
              data-aos-duration="1000"
            >
              <Col className="col-lg-6 col-md-6 col-12 me-3">
                <Row
                  className="Card"
                  data-aos={mediaMed ? "fade-up" : ""}
                  data-aos-duration="1000"
                >
                  <Card
                    className="card-content"
                    sx={{ maxWidth: 345, background: "#c44444c9" }}
                  >
                    <CardMedia
                      children={<Div icon={<Article />} />}
                      className="card-img pt-4"
                      component="div"
                      height="140"
                    />
                    <CardActionArea className="mt-2">
                      <CardContent>
                        <Typography
                          gutterBottom
                          id="main-head"
                          className="fw-bold fs-4"
                          variant="h5"
                          component="div"
                        >
                          Product Design
                        </Typography>
                        <Typography
                          variant="body2"
                          id="card-para"
                          color="white"
                        >
                          Lizards are a widespread group of squamate reptiles,
                          with over 6,000 species, ranging across all continents
                          except Antarctica
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button id="services-like" size="small" color="primary">
                        <ThumbUpOffAlt />
                      </Button>
                    </CardActions>
                  </Card>
                </Row>
                <Row
                  className="Card mt-3"
                  data-aos={mediaMed ? "fade-up" : ""}
                  data-aos-duration="1000"
                >
                  <Card
                    className="card-content"
                    sx={{ maxWidth: 345, background: "#318973" }}
                  >
                    <CardMedia
                      children={<Div icon={<Polyline />} />}
                      className="card-img pt-4"
                      component="div"
                      height="140"
                    />
                    <CardActionArea className="mt-2">
                      <CardContent>
                        <Typography
                          gutterBottom
                          id="main-head"
                          className="fw-bold fs-4"
                          variant="h5"
                          component="div"
                        >
                          Visual Design
                        </Typography>
                        <Typography
                          variant="body2"
                          id="card-para"
                          color="white"
                          className="text-capitalize"
                        >
                          aims to improve a design's/product's aesthetic appeal
                          and usability with suitable images, typography.
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button id="services-like" size="small" color="primary">
                        <ThumbUpOffAlt />
                      </Button>
                    </CardActions>
                  </Card>
                </Row>
              </Col>
              <Col
                className={`col-lg-6 col-md-6 col-12 ${
                  mediaMed ? "mt-0" : "mt-5"
                }`}
              >
                <Row
                  className="Card"
                  data-aos={mediaMed ? "fade-up" : ""}
                  data-aos-duration="1000"
                >
                  <Card
                    className="card-content"
                    sx={{ maxWidth: 345, background: "#b4d8b6" }}
                  >
                    <CardMedia
                      children={<Div icon={<BarChart />} />}
                      className="card-img pt-4"
                      component="div"
                      height="140"
                    />
                    <CardActionArea className="mt-2">
                      <CardContent>
                        <Typography
                          gutterBottom
                          id="main-head"
                          className="fw-bold fs-4"
                          variant="h5"
                          component="div"
                        >
                          Business analytics
                        </Typography>
                        <Typography
                          variant="body2"
                          id="card-para"
                          color="white"
                        >
                          the process of transforming data into insights to
                          improve business decisions. data visualization
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button id="services-like" size="small" color="primary">
                        <ThumbUpOffAlt />
                      </Button>
                    </CardActions>
                  </Card>
                </Row>
                <Row
                  className="Card mt-3"
                  data-aos={mediaMed ? "fade-up" : ""}
                  data-aos-duration="1000"
                >
                  <Card
                    className="card-content"
                    sx={{ maxWidth: 345, background: "#6d0a28e5" }}
                  >
                    <CardMedia
                      children={<Div icon={<Chair />} />}
                      className="card-img pt-4"
                      component="div"
                      height="140"
                    />
                    <CardActionArea className="mt-2">
                      <CardContent>
                        <Typography
                          gutterBottom
                          id="main-head"
                          className="fw-bold fs-4"
                          variant="h5"
                          component="div"
                        >
                          Product Design
                        </Typography>
                        <Typography
                          variant="body2"
                          id="card-para"
                          color="white"
                        >
                          Lizards are a widespread group of squamate reptiles,
                          with over 6,000 species.
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        id="services-like"
                        children={<ThumbUpOffAlt />}
                        size="small"
                        color="primary"
                      ></Button>
                    </CardActions>
                  </Card>
                </Row>
              </Col>
            </Col>
            <Col
              className="col-lg-6 col-12"
              style={{
                paddingTop: mediaLarge ? 25 : 0,
              }}
              data-aos={mediaLarge ? "fade-up" : ""}
              data-aos-duration="1000"
            >
              <Row>
                <div className="sponsor-line position-relative">
                  <strong className="text-uppercase px-3">Services</strong>
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
                    We can help you solve <br /> your problem through <br />
                    our services.
                  </Typography>
                  <Typography
                    variant="p"
                    className="text-secondary pt-4 text-capitailize"
                    align="left"
                    paragraph
                  >
                    A vital part of people’s lifestyles is furniture. When
                    purchasing it, customers expect an omnichannel experience.
                    We help our customers to meet this need, delivering digital
                    marketing for furniture businesses. As a result, our clients
                    find their footing in this hyper-competitive industry and
                    enjoy increased market share and profitability..
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
                        as={Link}
                        to={"/shop"}
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
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Services;
