import React, {useState, useEffect, Component} from "react";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from "axios";
import isJson from '../../contexts/isJson'
import FlatList from 'flatlist-react';
import { Button } from '@material-ui/core/';
import DetailPost from "../detailPost/detailPost";

import {
  Menu,
  MenuItem
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 1000,
    },
    media: {
      height: 140,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
    container: {
        // maxHeight: "500px",
        paddingTop: "60px",
        // overflow: "auto",
    },
    appBar: {
      position: 'relative',
    },
    content: {
      marginBottom: theme.spacing(0),
    },
  }));

const TEST_URL = "http://127.0.0.1:8000/api/";
const activiteitData = [];
 
const PostList = () => {
    const classes = useStyles();
    const [values, setValues] = useState(activiteitData);
    const [detailActiviteitOpen, setDetailActiviteitOpen] = useState(false)
    const [detailActiviteit, setDetailActiviteit] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        axios.get(TEST_URL+'activiteitenUsers')
                .then(response => {
                    console.log(response.data)
                    setValues(response.data)             
                })
                .catch(error => {
                    console.log(error.response)
                })
      }, []);
    const activiteitClick = (activiteit) =>{
      setDetailActiviteitOpen(!detailActiviteitOpen)
      setDetailActiviteit(activiteit)
    }

    const handleClose = (gerapporteerd = false) => {
      if(gerapporteerd){
        
      }
      setAnchorEl(null);
    };

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  

    const renderPost = (value, idx) => {
        return (  
            <div className={classes.container} key={idx}>
              <Card className={classes.root}>
                <CardHeader
                    avatar={
                    <Avatar 
                      alt="Profiel foto"
                      className={classes.profilePicture}
                      src={`data:image/png;base64, ${value.profiel_foto}`}>
    
                    </Avatar>
                    }
                    action={
                    <div>
                      <IconButton onClick={handleClick} aria-label="settings">
                          <MoreVertIcon />
                      </IconButton>
                      <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose(true)}>Rapporteer</MenuItem>
                        <MenuItem onClick={handleClose}>sluit menu</MenuItem>
                      </Menu>
                    </div>
                    }
                    title={value.titel}
                    subheader={value.categorie}
                />
                <CardMedia
                    className={classes.media}
                    image={`data:image/png;base64, ${value.afbeelding}`}
                    title=""
                />
                <CardContent className={classes.content}>
                    <Typography className={classes.contentText} variant="body2" color="textSecondary" component="p" >
                        {value.beschrijving.substring(0, 200) + "..."}
                    </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() =>{activiteitClick(value)}} size="small" color="primary">
                    Meer informatie
                  </Button>
                </CardActions>
              </Card>
            </div>
        );
      }

    return (
      <div>
        <FlatList
            list={values}
            renderItem={renderPost}
            renderWhenEmpty={() => <div>List is empty!</div>}
            renderOnScroll
        />
        <DetailPost open={detailActiviteitOpen} closeScreen={activiteitClick} activiteit={detailActiviteit}/>    
      </div>
    )
  } 

export default PostList;