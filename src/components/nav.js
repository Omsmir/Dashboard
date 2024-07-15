import React, { useEffect, useContext, useState } from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { ShoppingOutlined, HeartOutlined } from "@ant-design/icons";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FuncContext } from "./PrimaryPage";
import { Box, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import NotificationsMenu from "../pages/Profile/NotificationMenu";
import { ProfileImg } from "../pages/Profile/ProfileMenu";
import { useMediaQuery, IconButton } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";

const NavbarNav = () => {
  const mediaLarge = useMediaQuery("(max-width:993px)");

  const { users, open, setOpen, ToggleStateOfDash } = useContext(FuncContext);

  const [user] = useAuthState(auth);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const NavItems = [
    { id: 1, text: "Home" },
    { id: 2, text: "Shop" },
    { id: 3, text: "Contact" },
  ];

  const LiItem = (props) => (
    <li
      class="nav-item"
      key={props.id}
    >
      <Nav.Link
        as={NavLink}
        to={`/${props.name}`}
      >
        {props.text}
      </Nav.Link>
    </li>
  );


  const DashToggle = () => {
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className="DashboardToggler"
        sx={{
          marginLeft: mediaLarge ? "0" : 5,
        }}
      >
        <Menu />
      </IconButton>
    );
  };
  useEffect(() => {
    AOS.init();
  }, []);

  return (
  <>
    <Navbar expand="lg" fixed="top" className={`${mediaLarge ? "" : "px-6"}`}>
      <Container fluid>
        {ToggleStateOfDash && mediaLarge ? (
          <DashToggle />
        ) : (
          <Navbar.Brand href="#" className="">
            <Typography>Xs</Typography>
            {ToggleStateOfDash ? <DashToggle /> : ""}
          </Navbar.Brand>
        )}
        <Box className="links">
          {user && mediaLarge ? (
            <>
              {" "}
              <NotificationsMenu />
              <ProfileImg />
            </>
          ) : (
            ""
          )}
          <Navbar.Toggle aria-controls="navbarScroll"  />
        </Box>
        <Navbar.Collapse id="navbarScroll">
          <Nav className="w-50">
            {NavItems.map((value, index) => {
              if (value.id === 1) {
                return (
                  <LiItem
                    id={value.id}
                    text={value.text}
                    name={""}
                  />
                );
              } else {
                return (
                  <LiItem
                    id={value.id}
                    text={value.text}
                    name={value.text}
                  />
                );
              }
            })}
          </Nav>

          {user ? (
            <Box className="left">
              <Box className="links">
                <Box className="stackLink">
                  <Nav.Link
                    className="cart cartSection"
                    as={NavLink}
                    to={"/Cart/CartSection"}
                  >
                    <ShoppingOutlined />
                  </Nav.Link>
                </Box>
                <Box className="stackLink">
                  <Nav.Link className="likes" as={NavLink} to={"/LikeSection"}>
                    <span>
                      <HeartOutlined />
                    </span>
                  </Nav.Link>
                </Box>

                {mediaLarge ? (
                  ""
                ) : (
                  <>
                    <NotificationsMenu />

                    <ProfileImg />
                    <Box className="UserInformationFromNav">
                      <Typography component="h4" noWrap>
                        omar samir
                      </Typography>
                      <Typography noWrap paragraph className="text-secondary">
                        {users.map((user) => {
                          return user.role;
                        })}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          ) : (
            <Box className="left">
              <Typography className="links" component={"div"}>
                <Button variant="dark">
                  <Nav.Link as={NavLink} to={"/"}>
                    Login
                  </Nav.Link>
                </Button>
              </Typography>
            </Box>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />
    </>
  );
};

export default NavbarNav;
