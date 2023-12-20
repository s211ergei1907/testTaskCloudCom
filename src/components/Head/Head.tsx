import React from "react";
import { Layout, Menu } from "antd";
import logo from "../../assets/images/logoSDK.svg";
import { Outlet } from "react-router-dom";

function Head() {
  const { Header } = Layout;

  const headerStyle: React.CSSProperties = {
    color: "#fff",
    height: 64,
    paddingInline: 48,
    backgroundColor: "#3a6abd",
    marginBottom: "70px",
  };

  const layoutStyle = {
    borderRadius: 5,
    overflow: "hidden",
    width: "100%",
    maxWidth: "100%",
  };

  return (
    <div style={{ marginBottom: "30px", height: "calc(100vh - 64px )" }}>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <img src={logo} alt={"А тут у нас логотип"} />
        </Header>
        <Outlet />
      </Layout>
    </div>
  );
}

export default Head;
