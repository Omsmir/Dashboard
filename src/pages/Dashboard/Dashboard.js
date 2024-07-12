import { Box, Typography, useMediaQuery, Paper,Card ,CardMedia,CardContent } from "@mui/material";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, useEffect, useContext, useRef } from "react";
import { Avatar, Descriptions, Divider } from "antd";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { DrawerItem } from "../Profile/ListComponent";
import "../../css/userProfile.css";
const DashBoard = () => {

        return (
            <motion.section
              className="Account"
              id="Account"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 1 } }}
              variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
            >
              <DrawerItem Id={1} component={<DashboardComponet />} />
            </motion.section>
          );
     
}
 

const DashboardComponet = () => {
    const visible = {
        opacity: 1,
        y: 0,
        transition: { type: "spring", duration: 1 },
      };
    
    return (
        <motion.Box
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible,
        }}
      >
        </motion.Box>
    )
}
export default DashBoard;