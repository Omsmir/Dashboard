import { Outlet, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { createContext, useContext, useState } from "react";
import { FuncContext } from "./PrimaryPage";
export const PrivateCont = createContext();
const PrivateRoutes = () => {

  
  const [user] = useAuthState(auth);

  // Dashboard Setting
  const [elements, SetElements] = useState([
    { Name: "Dashboard", parentId: 1, IsPrivate: true, state: false },
    { Name: "Profile", parentId: 2, IsPrivate: false, state: false },
  ]);
  const [Setting, SetSetting] = useState([
    { Name: "Manage users", Id: 1, parentId: 1, state: false },
    { Name: "Manage Posts", Id: 2, parentId: 1, state: false },
    { Name: "Account", Id: 3, parentId: 2, state: false },
    { Name: "Settings", Id: 4, parentId: 2, state: false },
    { Name: "Invoice", Id: 5, parentId: 2, state: false },
  ]);

  return (
    <PrivateCont.Provider
      value={{  elements, SetElements, Setting, SetSetting }}
    >
      {user ? <Outlet /> : <Navigate to={"/login"} />}
    </PrivateCont.Provider>
  );
};

const LoginRoute = () => {
  const [user] = useAuthState(auth);

  

  return !user ? <Outlet /> : <Navigate to={"/"} />;
};
export { PrivateRoutes, LoginRoute };
