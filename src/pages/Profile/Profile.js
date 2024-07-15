import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  List,
  Backdrop,
  useMediaQuery,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { Dashboard, Person } from "@mui/icons-material";
import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navigate, NavLink, Outlet ,useLoaderData} from "react-router-dom";
import { FuncContext } from "../../components/PrimaryPage";
import "../../css/userProfile.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth,db } from "../../config/firebase";
import {
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
export const ProfileContext = createContext();


const Profile = () => {



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

  const [user] = useAuthState(auth)
  const { CheckUser, open, setOpen } = useContext(FuncContext);
  const isSmallScreen = useMediaQuery("(max-width:576px)");
  const [backdropOpen, setBackdropOpen] = useState(false);

  const handleBackdropClose = () => {
    setBackdropOpen(false);
    setOpen(false);
  };

  const handleBackdropOpen = () => {
    setBackdropOpen(true);
  };

  useEffect(() => {
    if (open) {
      handleBackdropOpen();
    } else {
      handleBackdropClose();
    }
  }, [open]);

  return (
    <ProfileContext.Provider value={{elements,SetElements,Setting,SetSetting}}>
    <Box sx={{ display: "flex" }}>
      {isSmallScreen && (
        <Backdrop
          sx={{ color: "#fff", zIndex: 1000 }}
          open={backdropOpen}
          onClick={handleBackdropClose}
        />
      )}
      <Drawer variant="permanent" open={open} className="Drawer">
        <List>
          {elements.map((value, index) => {
            if (CheckUser() || !value.IsPrivate) {
              return (
                <ListComponent  key={value.Name} {...value} index={index} />
              );
            }
            return null;
          })}
        </List>
      </Drawer>
      {user ? <Outlet /> : <Navigate to={"/login"} />}
    </Box>
    </ProfileContext.Provider>
  );
}
const ListComponent = ({  parentId, state, Name, index }) => {

 const {elements,SetElements,Setting,SetSetting} = useContext(ProfileContext)

  const { open, setOpen,SetToggle} = useContext(FuncContext);
 

    const [liState,setLiState] = useState(null)
  const show = { display: "flex", opacity: 1, height: "50px" };
  const hide = { opacity: 0, height: 0, transitionEnd: { display: "none" } };



  const updateSecStates = (index,newStateVar) => {
    setLiState(index === liState ? null : index)

    SetSetting(Setting.map((ele) => ele.Id === index ? {...ele,state:newStateVar} : {...ele,state:false}))

  };

  const updateAllStates = (NewState) => {
    SetElements(elements.map((ele) => ({ ...ele, state: NewState })));
  };


  // Function to handle click on list item
  const handleItemClick = (Id,NewStateVar) => {
    SetElements(  elements.map((ele) =>  ele.parentId === Id   ? { ...ele, state: NewStateVar }  : ele ));
  };

  useEffect(() => {
    if (!open) {
      updateAllStates(false)
    }
  }, [open]);

  useEffect(() => {
    SetToggle(true)

    return() => {
      SetToggle(false)
    }
  },[])
  return (
    <ListItem
      key={Name}
      sx={{ display: "block", padding: 0 }}
      className="NavMainToggle"
      onClick={() => setOpen(true)}
    >
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
        style={{ background: state ?  "#2c3448" : "none" }}
        className="MainToggle"
        onClick={() => handleItemClick(parentId,!state)}
      >
        <ListItemIcon
          sx={{ minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center" }}
        >
          {index % 2 === 0 ? <Dashboard /> : <Person />}
        </ListItemIcon>
        <ListItemText primary={Name} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: state ? 1 : 0 }}
        className="SecToggleUl"
      >
        {Setting.map((ele,index) => {
          if (ele.parentId === parentId) {
            return (
 <motion.li
    key={ele.Name}
    animate={state ? show : hide}
    transition={{ duration: 0.5 }}
    className="SecToggle"
    onClick={() => updateSecStates(ele.Id,true)}

    style={{
      background: ele.state ? "#2c3448" : "none",
      padding: 0,
    }}
  >
    <ListItemButton
    

      sx={{
        minHeight: 48,
        justifyContent: open ? "initial" : "center",
        px: 2.5,
      }}
      as={NavLink}
      to={`${ele.Name}`}
    >
      <ListItemText
        primary={ele.Name}
        sx={{ opacity: open ? 1 : 0 }}
      />
    </ListItemButton>
  </motion.li>            );
          }
          return null;
        })}
      </motion.ul>
    </ListItem>
  );
};



const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
;

export default Profile;
