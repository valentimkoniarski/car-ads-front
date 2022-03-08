import React, { useState } from "react";

import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { isAuthenticated } from "../services/auth";

const pages = ["Products"];

const settingsLogged = ["Anúncios", "Dashboard", "Logout"];

const settings = ["Login"];

function removeAccentsAndLowercase(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      <AppBar
        style={{
          backgroundColor: "#4287f5",
          boxShadow: "none",
        }}
      >
        <Container>
          <Toolbar
            disableGutters
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Link to="/">
                <Button color="inherit">CAR-ADS</Button>
              </Link>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Abrir Configurações">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {isAuthenticated() ? (
                  <div>
                    {settingsLogged.map((item) => (
                      <MenuItem
                        key={item}
                        onClick={handleCloseUserMenu}
                        component={Link}
                        to={`/${removeAccentsAndLowercase(item)}`}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </div>
                ) : (
                  <div>
                    {settings.map((item) => (
                      <MenuItem
                        key={item}
                        onClick={handleCloseUserMenu}
                        component={Link}
                        to={`/${item.toLowerCase()}`}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </div>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Navbar;
