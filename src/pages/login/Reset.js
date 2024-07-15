import { Container, Row, Col, Image, Nav } from "react-bootstrap";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { sendPasswordResetEmail } from "firebase/auth";
import "../../css/login.css";
import MotionComponent from "../../components/Motion";

const ResetPassword = () => {
  return (
    <MotionComponent
      componet={<ResetPasswordComponent />}
      id={"login"}
      className={"login"}
    />
  );
};

const ResetPasswordComponent = () => {
  const mediaLarge = useMediaQuery("(max-width:993px)");

  const [user] = useAuthState(auth);

  const Navigate = useNavigate();

  const [form] = Form.useForm();

  const [clientReady, setClientReady] = useState(false);

  // To disable submit button at the beginning.
  useEffect(() => {
    setClientReady(true);
  }, []);

  const onvaluesChange = async (value) => {
    try {
      await sendPasswordResetEmail(auth, value.email);
      Swal.fire({
        icon: "success",
        title: "Email sent successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      Navigate("/login");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.code,
      });
    }
  };

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
          className="col-lg-6 col-md-12 col-sm-12 FormColumn"
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
                  Reset your password
                </Typography>
              </CardContent>

              <Form
                form={form}
                name="horizontal_login"
                layout="inline"
                onFinish={onvaluesChange}
                style={{width:mediaLarge?"100%" : ""}}
              >
                <Form.Item
                  name="email"
                  className="email"
                  rules={[
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
                        Reset password
                      </Button>
                    )}
                  </Form.Item>
                  <Form.Item className="Forget">
                    <Nav.Link
                      as={NavLink}
                      to={"/"}
                      className="login-forget text-primary"
                    >
                      Back to login
                    </Nav.Link>
                  </Form.Item>
                </div>
              </Form>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default ResetPassword;
