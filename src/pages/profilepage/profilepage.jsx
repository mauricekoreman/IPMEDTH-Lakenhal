import React, { useState } from "react";
import {
  AppBar,
  Container,
  Box,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  useTheme,
  withWidth,
} from "@material-ui/core";
import Poststab from "../postsTab/postsTab";
import ProfileTab from "../profileTab/profileTab";
import ProfileEditTab from "../profileTab/profileEditTab";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    flexGrow: 1,
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(6),
  },
  shadow: {
    boxShadow: "0 5px 6px rgba(0, 0, 0, .15)",
  },
}));

const Profilepage = ({ width }) => {
  // this is equivalent to theme.breakpoints.down("sm")
  const isSmallScreen = /xs|sm/.test(width);
  const theme = useTheme();

  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={classes.pageContainer}>
      <AppBar
        position="fixed"
        style={{ top: isSmallScreen ? theme.spacing(7) : theme.spacing(8) }}
        elevation={0}
        className={classes.shadow}
      >
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="Profile tabs"
          centered
          variant={isSmallScreen ? "fullWidth" : "standard"}
        >
          <Tab label="PROFIEL" />
          <Tab label="POSTS" />
          <Box display="none">
            <Tab label="EDIT" disabled />
          </Box>
        </Tabs>
      </AppBar>
      {selectedTab === 0 && <ProfileTab selectedTab={()=>setSelectedTab(2)} />}
      {selectedTab === 1 && <Poststab />}
      {selectedTab === 2 && <ProfileEditTab selectedTab={()=>setSelectedTab(0)} />}
    </div>
  );
};

export default withWidth()(Profilepage);
