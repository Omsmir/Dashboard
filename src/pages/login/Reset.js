import { Container, Row, Col, Image,Nav } from "react-bootstrap";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  useMediaQuery
} from "@mui/material";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import {  UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import {sendPasswordResetEmail  } from "firebase/auth";
import "../../css/login.css";





const ResetPassword = () => {
    const mediaLarge = useMediaQuery("(max-width:993px)");


    const [user] = useAuthState(auth);

    const Navigate = useNavigate(); 
  
    const [form] = Form.useForm();
  
    const [clientReady, setClientReady] = useState(false);
  
    const[ForgetedPass,collectForgetedPass] = useState([])
  
    const visible = { opacity: 1, scale: 1, transition: { duration: 0.6 } };
  
  
   
    // To disable submit button at the beginning.
    useEffect(() => {
      setClientReady(true);
    }, []);

      const onvaluesChange = async (value) => {
       
        try{
            
            await sendPasswordResetEmail(auth,value.email)
            Swal.fire({
              icon: "success",
              title: "Email sent successfully",
              showConfirmButton: false,
              timer: 1500
            });

            Navigate("/login")
        }

        catch(err){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.code,
              });
        }


      }

    return (   
          <motion.section className="login pt-5" id="login"  initial="hidden"
    animate="visible"
    exit={{ opacity: 0, transition: { duration: 1 } }}
    variants={{ visible: { transition: { staggerChildren: 0.3 } } }}>
      <motion.div className="structure "  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible,
                  }}>
        <Container fluid>
          <Row>
            <Col className="col-lg-6 col-md-12 col-sm-12" id="ImageColumn">
              <div className="layout py-2 px-2 ">
                <Image
                  src={require("../../imgs/security (1).jpg")}
                  className="login-img"
                  style={{
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                  }}
                  fluid
                />
              </div>
            </Col>
            <Col className="col-lg-6 col-md-12 col-sm-12 formColumn" id="FormColumn">
              <div className={`${mediaLarge ? "MuiBox-root css-8atqhb" : "layout py-2 px-2"}` }              
              >
                <div className="frame">
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
                      <Box sx={{width:"100%"}}>
                        <Form
                          form={form}
                          name="horizontal_login"
                          layout="inline"
                          onFinish={onvaluesChange}                         
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
                              prefix={
                                <UserOutlined className="site-form-item-icon" />
                              }
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
                                    .filter(({ errors }) => errors.length)
                                    .length
                                }
                              >
                             Reset password
                              </Button>
                            )}
                          </Form.Item>
      <Form.Item className="Forget"> 
      <Nav.Link as={NavLink} to={"/login"} className="login-forget text-primary">Back to login
</Nav.Link>

      </Form.Item>
                          </div>
                          
                        </Form>
                     
                      </Box>                      
                    </Card>
                  ) 
                  }
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </motion.div>
    </motion.section> );
}
 
export default ResetPassword;