import React, { useState } from "react";
import { AppBar, makeStyles, Tab, Tabs, withWidth } from "@material-ui/core";
import Poststab from "../postsTab/postsTab";
import ProfileTab from "../profileTab/profileTab";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  shadow: {
    boxShadow: "0 5px 6px rgba(0, 0, 0, .15)",
  },
});

const Profilepage = ({ width }) => {
  // this is equivalent to theme.breakpoints.down("sm")
  const isSmallScreen = /xs|sm/.test(width);

  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} className={classes.shadow}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="Profile tabs"
          centered
          variant={isSmallScreen ? "fullWidth" : "standard"}
        >
          <Tab label="PROFIEL" />
          <Tab label="POSTS" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && <ProfileTab />}
      {selectedTab === 1 && <Poststab />}
    </div>
  );
};

export default withWidth()(Profilepage);
