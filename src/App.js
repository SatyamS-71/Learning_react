import { React, useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import Home from "./Components/PublicPages/Home";
const { Header, Content, Footer, Sider } = Layout;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/styles.css";
import {
  DesktopOutlined,
  HomeOutlined,
  FormOutlined,
  UserOutlined,
} from "@ant-design/icons";
import TopBar from "./Components/Global/TopBar";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const App = () => {
  const items = [
    getItem("Home", "1", <HomeOutlined />),
    getItem("Posts", "2", <DesktopOutlined />),
    getItem("Profile", "3", <UserOutlined />),
    getItem("Todo", "4", <FormOutlined />),
  ];
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Check if the screen width is less than or equal to 768px (typical mobile width)
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check and add resize event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile === false ? (
    <Layout theme="white" style={{ overflowX: "hidden" }}>
      <Sider
        theme="light" //this changes theme of the sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light" //this changes theme of the menu items in the sidebar
          defaultSelectedKeys={["1"]}
          mode="vertical"
          items={items}
        />
      </Sider>
      <Layout
        theme="white"
        className={collapsed ? "sider-collapsed" : "sider-not-collapsed"}
      >
        {/* Header GOES HERE*/}
        <Header
          style={{
            marginInline: "-100vw",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            // will be used with theme provider
          }}
        >
          <TopBar />
          <div style={{ width: "75vw" }}></div>
        </Header>

        <Content>
          {" "}
          <BrowserRouter>
            <Routes>
              <Route path="/" Component={Home}></Route>
              {/* <Route path="/post/:id" element={}></Route> */}
            </Routes>
          </BrowserRouter>
        </Content>

        {/* Footer GOES HERE */}
      </Layout>
    </Layout>
  ) : (
    <Layout theme="light">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Header>

      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Home}></Route>
            {/* <Route path="/post/:id" element={}></Route> */}
          </Routes>
        </BrowserRouter>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        {/* {FOOTER GOES HERE....} */}
      </Footer>
    </Layout>
  );
};
export default App;
