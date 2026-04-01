import React from "react";
import { Outlet } from "react-router-dom";
import CustomCursor from "components/CustomCursor";

const Layout = () => {
  return (
    <>
      <CustomCursor />
      <div className="App">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
