import React from "react";
import { Layout, Menu } from "antd";
import logo from "../../assets/images/logoSDK.svg";
import { Link, Outlet } from "react-router-dom";
import styles from "./Head.module.scss";
function Head() {
  const { Header } = Layout;

  return (
    <div className={styles.header__wrap}>
      <Layout className={styles.layoutStyle}>
        <Header className={styles.headerStyle}>
          <div className={styles.logoWrap}>
            <Link to={"./products"}>
              <img src={logo} alt={"А тут у нас логотип должен быть"} />
            </Link>
            <Link to={"./products"}>
              <h3>Страница карточек</h3>
            </Link>
          </div>
        </Header>
        <Outlet />
      </Layout>
    </div>
  );
}

export default Head;
