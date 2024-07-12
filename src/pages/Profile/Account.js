import { Box, Typography, useMediaQuery, Paper,Switch  } from "@mui/material";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, useEffect, useContext } from "react";
import { Avatar, Card, Skeleton, Descriptions,Divider,  } from "antd";
import { updateProfile } from "firebase/auth";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { FuncContext } from "../../components/PrimaryPage";
import { DrawerItem } from "./ListComponent";
import { DataTable,Column } from 'primereact';
import { styled } from "@mui/material/styles";
import "../../css/userProfile.css";



const Account = () => {
  return (
    <motion.section
      className="Account"
      id="Account"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
    >
      <DrawerItem Id={3} component={<AccountComponent />} />
    </motion.section>
  );
};

const MySwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));
const SwitchBtn = (props) => {
  return (
    <>{props.state ? <MySwitch defaultChecked /> : <MySwitch /> }
    </>
  )
}


const AccountComponent = () => {
  const isMediumScreen = useMediaQuery("(max-width:998px)")
  const { Meta } = Card;
  const [loading, setLoading] = useState(true);
  const onChange = () => {
    setLoading(false);
  };

  const { userEmail,userImage } = useContext(FuncContext);

  const ProductService =  {

    getProductsData(){
      return [
        {
          id:"1",
          Id: (user?.uid).slice(0,8),
          Role: 'Admin',
          status:<SwitchBtn />,
          state:false,
        },
        {
          id:"2",
          Id: user?.uid.slice(0,8),
          Role: 'User',
          status:<SwitchBtn state={true}/>,
          state:false,
        }
      ]
    },
  
    getProductsMini() {
      return Promise.resolve(this.getProductsData().slice(0, 5));
  },
  
  }
  
  const [user] = useAuthState(auth);

  const visible = {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 1 },
  };

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const isSelectable = (data) => data.state === true;

  const isRowSelectable = (event) => (event.data ? isSelectable(event.data) : true);

  const rowClassName = (data) => (isSelectable(data) ? '' : 'p-disabled');


  useEffect(() => {
    onChange();
  }, [user]);

  useEffect(() => {
    ProductService.getProductsMini().then((data) => setProducts(data));
}, []);

  return (
    <motion.div variants={{ hidden: { opacity: 0, y: -50 }, visible }}>
    <Container fluid>
      <Row className="my-3">
        <Col xs={12}>
          <Typography component="h4">Welcome back {user?.displayName}</Typography>
        </Col>
      </Row>
      <Row>
        <Col lg={6} sm={12} xs={12} style={{ marginBottom: isMediumScreen ? "1rem" : 0 }}>
          <Paper className="UserDetails">
            <Card className="UserCard" style={{ marginTop: 16 }}>
              <Skeleton loading={loading} avatar active>
                <Meta
                  className="UserInnerCard"
                  avatar={<Avatar src={userImage.join("")} />}
                  title="Hello"
                  description={userEmail}
                />
              </Skeleton>
            </Card>
            <Divider />
            <Box className="UserAdditional">
              <Descriptions title="User Info">
                <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                <Descriptions.Item label="Role">User</Descriptions.Item>
                <Descriptions.Item label="Address">
                  No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                </Descriptions.Item>
              </Descriptions>
            </Box>
          </Paper>
        </Col>
        <Col lg={6} sm={12} xs={12}>
          <Paper className="UserDetails">
            <div className="card" style={{ border: 0 }}>
              <DataTable
                value={products}
                selectionMode="single"
                selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)}
                dataKey="id"
                isDataSelectable={isRowSelectable}
                rowClassName={rowClassName}
              >
                <Column field="Id" header="Id" />
                <Column field="Role" header="Role" />
                <Column field="status" header="Status" />
              </DataTable>
            </div>
          </Paper>
        </Col>
      </Row>
    </Container>
  </motion.div>
  );
};

export { Account };
