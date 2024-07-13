import { Container, Row, Col, Image, Nav } from "react-bootstrap";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CardActions,
  useMediaQuery,
} from "@mui/material";
import { Facebook, Google } from "@mui/icons-material";
import { auth, provider, fbProvider } from "../../config/firebase";
import { signInWithPopup,signInWithRedirect,getRedirectResult } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined ,GoogleOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword } from "firebase/auth";
import MotionComponent from "../../components/Motion";
import "../../css/login.css";
const Login = () => {
  return (
    <MotionComponent
      componet={<LoginComponent />}
      id={"login"}
      className={"login"}
    />
  );
};

const LoginComponent = () => {
  const mediaLarge = useMediaQuery("(max-width:993px)");

  const [user] = useAuthState(auth);
  const Navigate = useNavigate();

  const [form] = Form.useForm();

  const [clientReady, setClientReady] = useState(false);

  const [userInfo, getuserInfo] = useState([]);
  const [ForgetedPass, collectForgetedPass] = useState([]);

  // To disable submit button at the beginning.

  const onFinish = async (values) => {
    getuserInfo([values]);

    const email = [values.email].join("");
    const password = [values.password].join("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      Swal.fire({
        icon: "success",
        title: "Logged in successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.code,
      });
    }
  };




  const SignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);

      Swal.fire({
        icon: "success",
        title: "Logged in successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      Navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.code,
      });
    }
  };

  const signInWithFacebook =   () => {
      signInWithRedirect(auth,fbProvider).then((Result) => {
        getRedirectResult(auth);

      })

      
    
  }
  

  const SignInWithFacebook = async () => {
    try {
      await signInWithPopup(auth, fbProvider);

      Swal.fire({
        icon: "success",
        title: "Logged in successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      Navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.code,
      });
    }
  };

  const onvaluesChange = (value) => {
    const arr = [];
    arr.push(value);
    collectForgetedPass(arr);
  };

  const CustomeIcon = (props) => {
    return <div>{props.icon}</div>;
  };

  useEffect(() => {
    setClientReady(true);

   
  }, []);
  return (
    <Container fluid>
      <Row>
        <Col className="col-lg-6 col-md-12 col-sm-12" id="ImageColumn">
          <Image
            src={require("../../imgs/security.png")}
            className="login-img"
           
            fluid
          />
        </Col>
        <Col
          className={`col-lg-6 col-md-12 col-sm-12 FormColumn ${mediaLarge ? "py-6" : ""}`}
          id="FormColumn"
        >
          {!user && (
            <Card className="login-card">
              <CardMedia />
              <CardContent>
                <Typography
                  className="login-brand"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  XS
                </Typography>
                <Typography
                  component={"h1"}
                  sx={{
                    textAlign: "left",
                    marginBottom: "10px",
                    fontWeight: "700",
                    fontSize: "33px",
                  }}
                  noWrap
                >
                  Log in to your account
                </Typography>
              </CardContent>
              <Box className="MobileLogin">
                <Form
                  form={form}
                  name="horizontal_login"
                  layout="inline"
                  onFinish={onFinish}
                  onValuesChange={onvaluesChange}
                  clearOnDestroy
                >
                  <Form.Item
                    name="email"
                    className="email"
                    hasFeedback
                    rules={[
                      {
                        whitespace: false,
                      },
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                      {
                        required: true,
                        message: "Please input your E-mail!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Username"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    className="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>

                  <div className="Stack">
                    <Form.Item shouldUpdate className="loginButton">
                      {() => (
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={
                            !clientReady ||
                            !form.isFieldsTouched(true) ||
                            !!form
                              .getFieldsError()
                              .filter(({ errors }) => errors.length).length
                          }
                        >
                          Log in
                        </Button>
                      )}
                    </Form.Item>
                    <Form.Item className="Forget">
                      <Nav.Link
                        as={NavLink}
                        to={"/Reset"}
                        className="login-forget text-primary"
                      >
                        Forgot password
                      </Nav.Link>
                    </Form.Item>
                  </div>
                </Form>
                <Typography
                  component={"div"}
                  sx={{
                    width: "100%",
                    marginBottom: "10px",
                    marginTop: "20px",
                  }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <span className="login-line">
                    <p className="m-0 text-secondary">
                      select a method to log in
                    </p>
                  </span>
                </Typography>
                <CardActions className="login-methods">
                  <Button
                    onClick={SignInWithGoogle}
                    icon={
                      <CustomeIcon
                        icon={
                          <Google sx={{background:"fff"}} />
                        }
                      />
                    }
                    size="large"
                  >
                    Google
                  </Button>
                  {mediaLarge ? <Button
                    onClick={signInWithFacebook}
                    icon={<CustomeIcon icon={<Facebook />} />}
                    size="large"
                  >
               
                    Facebook
                  </Button> : <Button
                    onClick={SignInWithFacebook}
                    icon={<CustomeIcon icon={<Facebook />} />}
                    size="large"
                  >
               
                    Facebook
                  </Button>}
                </CardActions>
                <Typography
                  component={"div"}
                  className="mt-3 d-flex create-account"
                >
                  <p className="text-secondary m-0">Don't have an account?</p>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Nav.Link
                      as={NavLink}
                      to={"/create"}
                      className="login-forget text-primary"
                    >
                      Create one
                    </Nav.Link>
                  </Form.Item>
                </Typography>
              </Box>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
