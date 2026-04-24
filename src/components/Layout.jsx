import React from "react";
import Navbar from "./Navbar";
import "../styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="app-background">
      <Navbar />
      <div className="page-content">{children}</div>
    </div>
  );
};

export default Layout;