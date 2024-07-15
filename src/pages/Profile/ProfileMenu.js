import {
  styled,
  Avatar,
  Badge,
  Box,
  IconButton,
  Tooltip,
  MenuItem,
  Typography,
  Paper,
  Backdrop,
  Card,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, createContext, useContext } from "react";
import {
  collection, 
  getDocs,
  where,

  query,
} from "firebase/firestore";
import { useEffect } from "react";
import { motion } from "framer-motion";
import "../../css/profile.css";
import { NavLink } from "react-router-dom";
import { Nav,Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FuncContext } from "../../components/PrimaryPage";

export const ProfileContext = createContext();

const ProfileImg = () => {
  const [user] = useAuthState(auth);
  const [usersFromEmailAndPassword, setAddedUsers] = useState([]);
  const [anchorElUser, setAnchorElUser] = useState(false);
  const { users, getUsersFromCollection, userImage } = useContext(FuncContext);

  const show = { display: "flex", opacity: 1 };
  const hide = { opacity: 0, transitionEnd: { display: "none" } };

  useEffect(() => {
    getUsersFromCollection();
  }, [user]);

  const updateInformation = async () => {
    try {
      const usersRef = collection(db, "UsersCreatedUsingEmailAndPasswordReference");
      const userQuery = query(usersRef, where("email", "==", user?.email));
      const userInfo = await getDocs(userQuery);
      setAddedUsers(userInfo.docs.map((doc) => ({ ...doc.data() })));
    } catch (err) {
      console.log(`Error updating information: ${err}`);
    }
  };

  const handleOpenUserMenu = () => {
    setAnchorElUser(!anchorElUser);
  };

  return (
    <ProfileContext.Provider value={{ anchorElUser, setAnchorElUser, users, show, hide }}>
      <div className="profileImage">
        <Box sx={{ flexGrow: 0, display: "flex", position: "relative" }}>
          <Tooltip title="Settings" followCursor>
            <IconButton className="profileButton" onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <AvatarProfile displayName={user?.displayName} photoURL={userImage[0]} />
            </IconButton>
          </Tooltip>
          <MenuList item={<GenerateOptions />} />
        </Box>
      </div>
    </ProfileContext.Provider>
  );
};

const MenuList = ({ item }) => {
  const { anchorElUser, setAnchorElUser, users, show, hide } = useContext(ProfileContext);

  return (
    <motion.div
      className="Menu"
      transition={{ duration: 0.5 }}
      animate={anchorElUser ? show : hide}
      style={{ display: anchorElUser ? "flex" : "none" }}
    >
      <Backdrop
        sx={{
          color: "#fff",
          background: "transparent",
          cursor: "context-menu",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={anchorElUser}
        onClick={() => setAnchorElUser(false)}
      />
      <Paper elevation={3} sx={{ zIndex: 1201, width: "200px !important" }}>
        <Card className="UserInformationCard">
          <CardActionArea>
            <CardMedia
              component="div"
              className="UserInformationArea"
              children={
                <Typography className="userInformtionInputs" component="h1">
                  {users.map((user) => (user.name ? user.name : "Undefined"))}
                  <br />
                  <Typography paragraph>{users.map((user) => user.role)}</Typography>
                </Typography>
              }
            />
          </CardActionArea>
        </Card>
        <Box className="MenuBar">{item}</Box>
      </Paper>
    </motion.div>
  );
};

const GenerateOptions = () => {
  const { setAnchorElUser } = useContext(ProfileContext);
  const { CheckUser} = useContext(FuncContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      Swal.fire({
        title: "Do you want to log out?",
        showCancelButton: true,
        confirmButtonText: "Logout",
        confirmButtonColor: "#b02a37",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Logged out Successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          });
          await signOut(auth);
          navigate("/");
        }
      });
    } catch (err) {
      console.log(`Error logging out: ${err}`);
    }
  };

  const settings = [
    { name: "Profile", url: "profile/Account", isPrivate: false },
    { name: "Dashboard", url: "Dashboard", isPrivate: true},
    { name: "Logout", isPrivate: false },
  ];

  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };

  const renderMenuItem = (ele) => {
    if (ele.name === "Logout") {
      return (
        <MenuItem key={ele.name} onClick={handleCloseUserMenu}>
          <Box className="w-100">
            <Button variant="danger" onClick={handleLogout} style={{ width: "100%" }}>
              {ele.name}
            </Button>
          </Box>
        </MenuItem>
      );
    } else {
      return (
        <MenuItem key={ele.name} onClick={handleCloseUserMenu} as={NavLink} to={`/${ele.url}`}>
          <Typography textAlign="center">
            <Nav className="text-black">{ele.name}</Nav>
          </Typography>
        </MenuItem>
      );
    }
  };

  return settings.map((ele) => {
    if (!ele.isPrivate || CheckUser()) {
      return renderMenuItem(ele);
    }
    return null;
  });
};

const AvatarProfile = (user) => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      <Avatar alt={user?.displayName} src={user?.photoURL} />
    </StyledBadge>
  );
};


export { ProfileImg };
