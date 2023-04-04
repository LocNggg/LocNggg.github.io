import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import axios from "axios";
import { BASE_URL_USER } from "../../utils/api";
import { headers } from "../../utils/headers";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "#e0e0e0",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

export const Sidebar = () => {
  const id = localStorage.getItem("userId");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [currentUser, setCurrentUser] = useState({});
  // get current user
  const handleGetCurrentUser = async () => {
    try {
      const { data: res } = await axios.get(`${BASE_URL_USER}/user/${id}`, {
        headers,
      });
      setCurrentUser(res);
    } catch (error) { }
  };
  useEffect(() => {
    handleGetCurrentUser();
  }, [id]);
  return (
    <Box
      sx={{
        display: 'flex', height: '100%', left: 0,
        position: 'absolute', top: 0,
        "& .pro-sidebar-inner": {
          background: "#1F2A40!important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent!important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa!important",
        },

      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: "#e0e0e0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} color="#FFFFFF">
                  <MenuOutlinedIcon sx={{
                    color: "white",
                  }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                  src={`https://cdn-icons-png.flaticon.com/512/219/219983.png`}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color="#e0e0e0"
                  fontWeight="bold"
                  fontSize="30px"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Hi, {currentUser.firstname + ' ' + currentUser.lastname}
                </Typography>
                <p>{currentUser.email}</p>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {/* <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            <Typography
              variant="h6"
              color="#a3a3a3"
              sx={{ m: "15px 0 5px 20px", fontSize: "16px" }}
            >
              Data
            </Typography>
            <Item
              title="Manage Users"
              to="/home"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Info"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Your Profile"
              to="/user"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
