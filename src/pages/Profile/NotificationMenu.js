import {
  Box,
  MenuItem,
  Typography,
  Paper,
  Backdrop,
  Card,
  CardMedia,
} from "@mui/material";
import {
  BellOutlined,
  ClockCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, useContext, createContext, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { FuncContext } from "../../components/PrimaryPage";
import { Badge } from "antd";
import "../../css/profile.css";

const NotificationContext = createContext();
const NotificationsMenu = () => {
  const [anchorEluser, setAnchorElUser] = useState(false);

  const { notifications, getNotificationsFromCollection } = useContext(FuncContext);

  useEffect(() => {
    getNotificationsFromCollection();
  }, []);

  // console.log(Notifications);

  const handleOpenUserMenu = () => {
    setAnchorElUser(!anchorEluser);
  };

  return (
    <NotificationContext.Provider value={{ anchorEluser, setAnchorElUser }}>
      <Box className="StackLink">
        <Box className="Notifications">
          <Box id="NotificationBadge">
            <Badge
              count={notifications.length}
              size="small"
              className="NotificationBadge"
            />
            <BellOutlined onClick={handleOpenUserMenu} />
          </Box>
          <MenuList />
        </Box>
      </Box>
    </NotificationContext.Provider>
  );
};

const MenuList = () => {
  const { anchorEluser, setAnchorElUser } = useContext(NotificationContext);
  const { notifications } = useContext(FuncContext);

  const show = {
    display: "flex",
    opacity: 1,
  };

  const hide = {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  };

  return (
    <motion.div
      className="Menu"
      transition={{ duration: 0.5 }}
      animate={anchorEluser ? show : hide}
      style={{ display: anchorEluser ? "flex" : "none" }}
    >
      <Backdrop
        sx={{
          color: "#fff",
          background: "transparent",
          cursor: "context-menu",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={anchorEluser}
        onClick={() => setAnchorElUser(false)}
      />
      <Paper elevation={3} sx={{ zIndex: 1202 }}>
        <Card className="NotificationMenu">
          <Box>
            <CardMedia
              component="div"
              className="UserNotificationArea"
              children={
                <Typography className="userNotificationInputs" component={"h1"}>
                  Notifications
                  <br />
                  <Typography paragraph>
                    {notifications.length} Messages
                  </Typography>
                </Typography>
              }
            />
          </Box>
        </Card>
        <Box>
          <GenerateNotifications />
        </Box>
      </Paper>
    </motion.div>
  );
};

const GenerateNotifications = () => {
  const {  setAnchorElUser } = useContext(NotificationContext);
  const { notifications } = useContext(FuncContext);

  return (
    <>
      {notifications.map((ele) => {
        return (
          <MenuItem
            key={ele.id}
            as={NavLink}
            to={"/Settings"}
            onClick={() => setAnchorElUser(false)}
          >
            <Box className="Notifictionbar">
              <Typography component={"h4"} color={"black"}>
                {ele.completed ? "Finished" : "in progress"}
                <Badge
                  className="BadgeSvg"
                  count={
                    !ele.completed ? (
                      <ClockCircleOutlined style={{ color: "#f5222d" }} />
                    ) : (
                      <CheckOutlined style={{ color: "#139313" }} />
                    )
                  }
                />
              </Typography>
              <Typography paragraph>{ele.title}</Typography>
            </Box>
          </MenuItem>
        );
      })}
    </>
  );
};

export default NotificationsMenu;
