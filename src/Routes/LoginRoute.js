import { useAuthState } from 'react-firebase-hooks/auth';
import {  Outlet,Navigate  } from 'react-router-dom';
import { auth } from '../config/firebase';

const LoginRoute = () => {
    const [user] = useAuthState(auth)


    return ( 
       !user ? <Outlet /> :   <Navigate to={"/"} />
     );
}
 
export default LoginRoute;