import { Container, Row, Col, Image, Nav } from "react-bootstrap";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Button, Form, Input, Select } from "antd";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import MotionComponent from "../../components/Motion";
import "../../css/login.css";

const CreateAccount = () => {
  return (
    <MotionComponent
      componet={<CreateComponent />}
      id={"login"}
      className={"login"}
    />
  );
};

const CreateComponent = () => {
  const auth = getAuth();

  const { Option } = Select;

  const UsersCreatedUsingEmailAndPasswordReference = collection(
    db,
    "UsersCreatedUsingEmailAndPasswordReference"
  );

  const [form] = Form.useForm();

  // To disable submit button at the beginning.

  const onFinish = async (values) => {
    const arr = [];
    arr.push(values);
    const email = arr
      .map((ele) => {
        return ele.email;
      })
      .join("");
    const password = arr
      .map((ele) => {
        return ele.password;
      })
      .join("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: "success",
        title: "Account created successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      await addDoc(UsersCreatedUsingEmailAndPasswordReference, {
        ...values,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.code,
      });
    }
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="20">+20</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
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
        <Col className="col-lg-6 col-md-12 col-sm-12" id="FormColumn">
          <Card className="login-card w-100">
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
                Create an account
              </Typography>
            </CardContent>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              clearOnDestroy
              style={{width:"100%",padding:15}}
              initialValues={{
                prefix: "20",
              }}
        
              scrollToFirstError
            >
              <Form.Item
                name="email"
                label="E-mail"
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
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                    min: 10,
                    max: 18,
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="nickname"
                label="Nickname"
                tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: "Please select gender!",
                  },
                ]}
              >
                <Select placeholder="select your gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
            <Box>
              <Typography
                component={"div"}
                className="mt-3 d-flex create-account"
              >
                <p className="text-secondary m-0">Already have account?</p>
                <Nav.Link
                  as={NavLink}
                  to={"/login"}
                  className="login-forget text-primary text-capitalize"
                >
                  return to login
                </Nav.Link>
              </Typography>
            </Box>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateAccount;
