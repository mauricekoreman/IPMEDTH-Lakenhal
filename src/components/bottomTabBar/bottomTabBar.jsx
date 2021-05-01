import React from "react";
import { Link, withRouter } from "react-router-dom";

const BottomTabBar = (props) => (
  <div style={{ height: "10%", width: "100%", backgroundColor: "lightblue" }}>
    <ul>
      <li>
        <Link to={"/"}>Naar home</Link>
      </li>
      <li>
        <Link to={"/chat"}>Naar chat</Link>
      </li>
      <li>
        <Link to={"/profile"}>Naar profile</Link>
      </li>
    </ul>
  </div>
);

export default withRouter(BottomTabBar);
