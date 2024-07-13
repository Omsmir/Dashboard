import {  Result } from 'antd';
import { Container ,Row} from 'react-bootstrap';
import MotionComponent from '../components/Motion';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Error404 = () => {
    return ( 
      <MotionComponent componet={<Result404 />} p={"pt-5"} />
     );
}
 
const Result404 = () => {
    return (
        <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" as={NavLink} to={"/"} className='Btn404'>Back Home</Button>}
      />
    )
}
export default Error404;