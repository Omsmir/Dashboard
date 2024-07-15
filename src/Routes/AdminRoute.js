import { Outlet, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { createContext, useContext, useState } from "react";
import { FuncContext } from "../components/PrimaryPage";
const AdminRoute = () => {

    const {CheckUser} = useContext(FuncContext)
    const [user] = useAuthState(auth)

    const State = CheckUser()
    return ( 
 State ? <Outlet /> : <Navigate to={"/"} />
     );
}
 
export default AdminRoute;