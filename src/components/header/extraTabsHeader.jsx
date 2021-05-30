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
import PostsTab from "../../pages/postsTab/postsTab";
import ProfileTab from "../../pages/profileTab/profileTab";
import ModeratorRapportage from "../../pages/moderatorRapportage/moderatorRapportage";
import ModeratorCategorie from "../../pages/moderatorCategorie/moderatorCategorie";
import ProfileEditTab from "../../pages/profileTab/profileEditTab";
import isJson from "../../contexts/isJson";

import { useAuth } from "../../contexts/authContext";

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

const ExtraTabsHeader = ({ width, tabs, onProfile, onModerator }) => {
  // this is equivalent to theme.breakpoints.down("sm")
  const isSmallScreen = /xs|sm/.test(width);
  const theme = useTheme();

  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const { currentUser } = useAuth();

  let user = currentUser;
  if (isJson(currentUser)) {
    user = JSON.parse(currentUser);
  }

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
          <Box hidden>
            <Tab label={tabs[2]} />
          </Box>
        </Tabs>
      </AppBar>
      {onProfile && selectedTab === 0 && (
        <ProfileTab user={user} selectedTab={() => setSelectedTab(2)} />
      )}
      {onProfile && selectedTab === 2 && (
        <ProfileEditTab user={user} selectedTab={() => setSelectedTab(0)} />
      )}
      {onProfile && selectedTab === 1 && <PostsTab />}
      {onModerator && selectedTab === 0 && <ModeratorRapportage />}
      {onModerator && selectedTab === 1 && <ModeratorCategorie />}
    </div>
  );
};

export default withWidth()(ExtraTabsHeader);
