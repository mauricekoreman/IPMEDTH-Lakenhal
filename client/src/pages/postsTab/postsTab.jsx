import { Box, makeStyles, Grid, Typography } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import DetailPost from "../../components/detailPost/detailPost";
import PostsTabCard from "./postsTabCard";

const useStyles = makeStyles((theme) => ({
  titlePosts: {
    textAlign: 'center',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  }
}));

const PostsTab = ({user}) => {
  const classes = useStyles();
  const TEST_URL = "http://127.0.0.1:8000/api/";
  const [detailPostOpen, setDetailPostOpen] = useState(false);
  const [detailPost, setDetailPost] = useState([]);
  const [postList, setPostList] = useState([]);

  const fetchPosts = async () =>{
    const res = await fetch(TEST_URL + 'activiteitenUsersProfiel/'+user.user_ID);
    const data = res.json();
    return data;
  }

  useEffect(()=>{
    const getPosts = async () => {
      const profielListServer = await fetchPosts()
      setPostList(profielListServer)
    }
    getPosts()
    console.log(postList)
  }, [])

  const detailPostClick = (profielPost) =>{
    setDetailPostOpen(!detailPostOpen)
    console.log(profielPost)
    setDetailPost(profielPost)
  }
  console.log(detailPost);

  return (
    <div>
      {postList.length ? 
        <Typography className={classes.titlePosts} variant='h4'>Zie uw posts & aanmeldingen</Typography>
        :
        <Typography className={classes.titlePosts} variant='h4'>U heeft nog geen activiteiten gepost!</Typography>
      }
      <Box >
        <Grid container spacing={2}>
          {Object.keys(postList).map((post, key) =>{
            return(
              <Grid item xs={12} key={key} onClick={()=>detailPostClick(postList[post])}>
                <PostsTabCard titel={postList[post].titel} categorie={postList[post].categorie} profielfoto={postList[post].profiel_foto} lakenhal={postList[post].lakenhal_activiteit} activiteit={postList[post].activiteit_ID} beschrijving={postList[post].beschrijving}/>
              </Grid>
            )
          })}
        </Grid>
      </Box> 
      <DetailPost open={detailPostOpen} closeScreen={detailPostClick} activiteit={detailPost}/>
    </div>
  );
};
export default PostsTab;
