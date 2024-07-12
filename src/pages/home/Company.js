import {Container,Row,Col} from 'react-bootstrap';
import {Card,CardActionArea,CardContent,CardMedia,Typography,Button,CardActions,Paper,useMediaQuery} from '@mui/material';
import { Article } from '@mui/icons-material';
const Company = () => {


    const Div = (props) => {
        return (
          <div>
            {props.icon}
          </div>
        )
    }
    return ( 
        <section className="company py-4" id="company">
            <Container fluid>
                <div className='structure d-flex justify-content-center align-items-center'>
                    <Row>

                    </Row>
                </div>
            </Container>
        </section>
     );
}
 
export default Company;