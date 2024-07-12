import {Container,Row,Nav,Col} from 'react-bootstrap';
import {Card,CardActionArea,CardContent,CardMedia, Breadcrumbs,Typography ,useMediaQuery,Button} from '@mui/material';
import { useContext,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCart from "../../components/cart";
import { FuncContext } from '../../components/PrimaryPage';
import { motion } from "framer-motion";
import '../../css/CartSection.css'


const CartSection = () => {

  const {StateOfCart} = useContext(FuncContext)


  const AddActive= () => {

    const li = document.querySelectorAll(".breadcrumb nav ol li a")

    li.forEach((ele) => {
        ele.addEventListener("click" ,() => {
         if(!ele.classList.contains("active")){   
          li.forEach((ele) => {
            ele.classList.remove("active")
          })
             ele.classList.add("active")
         }
        })
      })
}
    useEffect(() => {
        AddActive()
    },[])


  const MediaLarge = useMediaQuery("(max-width:1178px)")
  const MediaMinLarge = useMediaQuery("(min-width:1178px)")

  const MediaMed = useMediaQuery("(max-width:576px)")

    const visible = { opacity: 1, y: 0, transition: {type: "spring", duration: 1 } };

const MediaText =() =>{
  if(MediaMinLarge){
    return "Back To Shop"
  }else if(MediaMed){
    return "Back To Shop"
  }else {
    return "Back"
  }
}
   
    return ( 
        <motion.section id="CartSection"  initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.5 } } }}
      >
            <motion.div className="structure" variants={{
          hidden: { opacity: 0, y: -50 },
          visible
        }}>
                <Container fluid className='breadcrumb'>
                    <Row>
                    <Breadcrumbs maxItems={3} aria-label="breadcrumb">
                    <Nav.Link className='text-light' as={NavLink} to={"/"}> Home</Nav.Link>
                   <Nav.Link className='text-light' as={NavLink} to={"/CartSection"}  >Cart</Nav.Link>
                      <Nav.Link className='text-light' as={NavLink} to={"/checkout"}> Checkout</Nav.Link>
</Breadcrumbs>
                    </Row>
                </Container>
                <Container fluid>
                <Row>
                       <Col className='col-lg-9 col-md-9 col-sm-8 col-12'>
                       <ShoppingCart state={StateOfCart} />
                       </Col>
                       <Col className='col-lg-3 col-md-3 col-sm-4 col-12'>
                        <Row>
                        <Card className='checkOutCard'>
      <CardActionArea>
        <CardContent>
                          <Typography variant='h6' className='fw-bold mb-3'>
                            Summary
                          </Typography>
                          <Typography component={"div"} className='CheckOutOrder'>
                            <Typography variant='p'>Total Price:</Typography>
                            <Typography variant='p'>$189</Typography>
                          </Typography>

                          <Typography component={"div"} className='CheckOutOrder'>
                            <Typography variant='p'>Shipping Cost:</Typography>
                            <Typography variant='p'>$189</Typography>
                          </Typography>
                          <Typography component={"div"} className='CheckOutOrder'>
                            <Typography variant='p' className='fw-bold'>Total:</Typography>
                            <Typography variant='p' className='fw-bold'>$189</Typography>
                          </Typography>
                       
                          </CardContent>
      </CardActionArea>
    </Card>
    <Typography component={"div"} className='CheckOutOrder'>
                            <Button variant="contained" color="error"  as={NavLink} to={"/shop"} 
                            sx={{whiteSpace:"nowrap"}}>{<MediaText />}</Button>     
                            <Button variant="contained" color="success"  as={NavLink} to={"/checkout"}>Checkout</Button>                  
                          </Typography>
                        </Row>
                       </Col>
                    </Row>
                    </Container>
            </motion.div>
        </motion.section>
 
     );
}
 
export default CartSection;