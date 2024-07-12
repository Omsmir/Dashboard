import {Container,Row,Col,Image} from 'react-bootstrap';
import { useContext,useRef } from 'react';
import { FuncContext } from '../../components/PrimaryPage';
const Sponsors = () => {

    const {setToggle} = useContext(FuncContext)



    return ( 
        <section className="sponsors pt-5 pb-3 " id='sponsors' >
            <Container fluid>
            <div className='structure'>
                <Row>
                    <div className="sponsor-line position-relative">
                        <strong className='text-uppercase px-3'>Over 45k top class brands working with our Agent</strong>
                    </div>
                </Row> 
                <div className='sponsor-images py-4 overflow-hidden'>
                   <div className='ticker-tape-container'>
                   <div className='ticker '>
                   <Col><Image src={require("../../imgs/sponsors/welmart.png")} fluid/></Col>
                    <Col><Image src={require("../../imgs/sponsors/fedex.png")} fluid/></Col>
                    <Col><Image src={require("../../imgs/sponsors/Kanbanize_logo.png")} fluid/></Col>
                    <Col><Image src={require("../../imgs/sponsors/ebay.png")} fluid/></Col>
                    <Col><Image src={require("../../imgs/sponsors/merck.png")} fluid/></Col>
                    <Col><Image src={require("../../imgs/sponsors/amazon.png")} fluid/></Col>
                   </div>
                   <div className='ticker' aria-hidden="true">
                   <Col><Image src={require("../../imgs/sponsors/welmart.png")} fluid/></Col>
                    <Col><Image src={require("../../imgs/sponsors/fedex.png")} fluid/></Col>
                    <Col><Image src={require("../../imgs/sponsors/Kanbanize_logo.png")} fluid/></Col>
                    <Col><Image src={require("../../imgs/sponsors/ebay.png")} fluid/></Col>
                    <Col><Image src={require("../../imgs/sponsors/merck.png")} fluid/></Col>
                    <Col><Image src={require("../../imgs/sponsors/amazon.png")} fluid/></Col>
                   </div>
                   </div>
                </div>
            </div>
            </Container>
        </section>
     );
}
 
export default Sponsors;