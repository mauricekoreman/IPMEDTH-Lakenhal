import { Box, makeStyles, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DetailPost from "../../components/detailPost/detailPost";
import PostsTabCard from "./postsTabCard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  titlePosts: {
    textAlign: "center",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  removeZero: {
    marginTop: theme.spacing(80),
  },
  container: {
    margin: "0 auto",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(7),
    width: "90%",
    [theme.breakpoints.up("xl")]: {
      width: "80%",
    },
  },
  gridItem: {
    display: "flex",
    margin: "0 auto",
    marginTop: '20px',
    transition: '0.5s linear',
    '&:hover': {
      transform: 'scale(1.05)',
      animation: "$groeiEffect 0.5s linear",
    },
  },
}));

const PostsTab = ({ user }) => {
  const classes = useStyles();
  const TEST_URL = "http://127.0.0.1:8000/api/";
  const [detailPostOpen, setDetailPostOpen] = useState(false);
  const [detailPost, setDetailPost] = useState([]);
  const [postList, setPostList] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch(
      TEST_URL + "activiteitenUsersProfiel/" + user.user_ID
    );
    const data = res.json();
    return data;
  };

  useEffect(() => {
    const getPosts = async () => {
      const profielListServer = await fetchPosts();
      setPostList(profielListServer);
    };
    getPosts();
    console.log(postList);
  }, []);

  const detailPostClick = (profielPost) => {
    setDetailPostOpen(!detailPostOpen);
    console.log(profielPost);
    setDetailPost(profielPost);
  };

  return (
    <Box className={classes.root}>
      {postList.length ? (
        <Typography className={classes.titlePosts} variant="h4">
          Zie uw posts & aanmeldingen
        </Typography>
      ) : (
        <Typography className={classes.titlePosts} variant="h4">
          U heeft nog geen activiteiten gepost!
        </Typography>
      )}
      <Box>
        <Grid container spacing={3} className={classes.container}>
          {Object.keys(postList).map((post, key) => {
            return (
              <Grid
                item
                xs={12} sm={8} md={6} lg={4} 
                className={classes.gridItem}
                key={key}
                onClick={() => detailPostClick(postList[post])}
              >
                <PostsTabCard 
                  titel={postList[post].titel}
                  categorie={postList[post].categorie}
                  profielfoto={postList[post].profiel_foto}
                  lakenhal={postList[post].lakenhal_activiteit}
                  activiteit={postList[post].activiteit_ID}
                  beschrijving={postList[post].beschrijving}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <DetailPost
        open={detailPostOpen}
        closeScreen={detailPostClick}
        activiteit={detailPost}
      />

      {/* dirty bug fix, blijft een random 0 staan, ik denk door de vergelijking die word gedaan bij extraTabsHeader.jsx, door deze div is de 0 niet te zien op de page. */}
      <div className={classes.removeZero}></div>
    </Box>
  );
};
export default PostsTab;
