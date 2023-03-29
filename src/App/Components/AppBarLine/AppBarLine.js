import React from "react";
import { Layout } from "antd";
const { Header } = Layout;

const AppBarLine = (props) => {
  const { title } = props;
  return <Header style={headerStyle}>{title}</Header>;
};

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#565656",
};
export default AppBarLine;
