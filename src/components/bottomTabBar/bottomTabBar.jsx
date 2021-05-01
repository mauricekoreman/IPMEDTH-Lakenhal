import React from "react";
import { Link, withRouter } from "react-router-dom";

const BottomTabBar = (props) => (
  <div
    style={{
      height: "10%",
      width: "100%",
      backgroundColor: "lightblue",
      position: "absolute",
      bottom: 0,
    }}
  >
    <Link to={"/"}>Naar home</Link>
    <Link to={"/chat"}>Naar chat</Link>
    <Link to={"/profile"}>Naar profile</Link>
  </div>
);

export default withRouter(BottomTabBar);
