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
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FuncContext } from "../../components/PrimaryPage";
import { PrivateCont } from "../../components/PrivateRoutes";
import "../../css/userProfile.css";
const ListComponent = ({ Id, parentId, state, Name, index }) => {
  const { open, setOpen,SetToggle } = useContext(FuncContext);
  const { elements, SetElements, Setting, SetSetting } =
    useContext(PrivateCont);

    const [liState,setLiState] = useState(false)
  const show = { display: "flex", opacity: 1, height: "50px" };
  const hide = { opacity: 0, height: 0, transitionEnd: { display: "none" } };



  const updateSecStates = (newState, id,index) => {
    setLiState(index === liState ? true : index)
    SetSetting(
      Setting.map((ele) =>
         ele.Id === id
          ? { ...ele, state: newState }
          : ele
      )
    );
  };

  const updateAllStates = (NewState) => {
    setActiveIndex(false)
    SetElements(elements.map((ele) => ({ ...ele, state: NewState })));
  };

  const [activeIndex, setActiveIndex] = useState(null);

  // Function to handle click on list item
  const handleItemClick = (index,Id,NewStateVar,SetElements,elements) => {
    setActiveIndex(index === activeIndex ? true : index);

    SetElements(
      elements.map((ele) =>
        ele.parentId === Id
          ? { ...ele, state: NewStateVar }
          : ele && ele.Id === Id
          ? { ...ele, state: NewStateVar }
          : ele
      )
    );
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
        style={{ background: index === activeIndex ? "#2c3448" : "none" }}
        className="MainToggle"
        onClick={() => handleItemClick(index,parentId,!state,SetElements,elements)}
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
                onClick={() => updateSecStates(true, ele.Id,index)}
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
                  to={`/${ele.Name}`}
                >
                  <ListItemText
                    primary={ele.Name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </motion.li>
            );
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

const DrawerItem = ({ component,Id }) => {
  const { CheckUser, open, setOpen } = useContext(FuncContext);
  const { elements } = useContext(PrivateCont);
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
    <Box sx={{ display: "flex" }}>
      {isSmallScreen && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdropOpen}
          onClick={handleBackdropClose}
        />
      )}
      <Drawer variant="permanent" open={open} className="Drawer">
        <List>
          {elements.map((value, index) => {
            if (CheckUser() || !value.IsPrivate) {
              return (
                <ListComponent Id={Id} key={value.Name} {...value} index={index} />
              );
            }
            return null;
          })}
        </List>
      </Drawer>
      {component}
    </Box>
  );
};

export { DrawerItem };
