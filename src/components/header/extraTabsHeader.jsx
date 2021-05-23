import React, { useState } from "react";
import {
  AppBar,
  Container,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  useTheme,
  withWidth,
} from "@material-ui/core";
import PostsTab from "../../pages/postsTab/postsTab";
import ProfileTab from "../../pages/profileTab/profileTab";
import ModeratorRapportage from "../../pages/moderatorRapportage/moderatorRapportage";
import ModeratorCategorie from "../../pages/moderatorCategorie/moderatorCategorie";

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

const ExtraTabsHeader = ({ width, tabs}) => {
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
          <Tab label={tabs[0]} />
          <Tab label={tabs[1]} />
        </Tabs>
      </AppBar>
      {window.location.pathname === '/profiel' && selectedTab === 0 && <ProfileTab/>}
      {window.location.pathname === '/profiel' && selectedTab === 1 && <PostsTab/>}
      {window.location.pathname === '/moderator' && selectedTab === 0 && <ModeratorRapportage/>}
      {window.location.pathname === '/moderator' && selectedTab === 1 && <ModeratorCategorie/>}
    </div>
  );
};

export default withWidth()(ExtraTabsHeader);