import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import { FaGithub, FaHome, FaPlusCircle, FaCarAlt } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Aside() {
  const headerStyle = {
    padding: "24px",
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: "1px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "noWrap",
  };

  return (
    <ProSidebar>
      <SidebarHeader style={headerStyle}>Car-Ads</SidebarHeader>
      <SidebarContent>
        <Menu>
          <MenuItem icon={<FaHome />}>
            <Link
              to="/homepage"
              style={{ textDecoration: "none", color: "whitesmoke" }}
            >
              HomePage
            </Link>
          </MenuItem>

          <MenuItem icon={<FaCarAlt />}>
            <Link
              to="/anuncios"
              style={{ textDecoration: "none", color: "whitesmoke" }}
            >
              Anúncios
            </Link>
          </MenuItem>

          <MenuItem icon={<FaPlusCircle />}>
            <Link
              to="/anuncios/adicionar"
              style={{ textDecoration: "none", color: "whitesmoke" }}
            >
              Novo Anúncio
            </Link>
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter style={{ textAlign: "center" }}>
        <div className="sidebar-btn-wrapper">
          <a
            href="https://www.github.com"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span>Github</span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
}
