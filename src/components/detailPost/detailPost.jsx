import React from 'react'
import CloseIcon from '@material-ui/icons/Close';
import Image from "material-ui-image";
import lakenhal_sw from "../../assets/img/lakenhal_sw.png";
import pf from "../../assets/img/placeholders/profile_picture_placeholder.jpg";
import detailPost_img_placeholder from "../../assets/img/placeholders/detailPost_placeholder.png";
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

import {
    Typography,
    makeStyles,
    Box,
    Avatar,
    AppBar,
    Toolbar,
    IconButton,
    Slide,
    Dialog,
    Button,
    Chip
  } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    headerDetail: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginTop: '10%'
    },
    profilePicture: {
        width: theme.spacing(8),
        height: theme.spacing(8),      
    },
    opdracht: {
        marginLeft: theme.spacing(),    
    },
    opdrachtSubtitle: {
        opacity: 0.6,
    },
    detailContainer: {
        width: '87%',
        margin: '0 auto',
    },
    detailsOpdracht: {
        opacity: 0.7,
        fontSize: theme.spacing(1.7),
        marginTop: '5%'
    },
    lakenhalLogo: {
        width: theme.spacing(5),
        height: theme.spacing(6),
        right: '5%',
        position: 'absolute'
      },
    detailsOpdrachtBottom: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '5%'
    },
    detailsDatumText: {
        opacity: 0.7,
        fontSize: theme.spacing(1.7),
    },
    detailsDatum:{
        display: 'flex'
    },
    detailsDatumIcon: {
        opacity: 0.7
    }
})); 

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


const DetailPost = ({open, closeScreen}) => {
    const classes = useStyles();
    
    return (
    <div>
        <Dialog fullScreen open={open} onClose={()=> closeScreen()} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={()=> closeScreen()} aria-label="close">
                <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                Detail Post
                </Typography>
            </Toolbar>
            </AppBar>
            <img src={detailPost_img_placeholder}/>
            <Box className={classes.detailContainer}>
                <img src={lakenhal_sw} className={classes.lakenhalLogo}/>
                <Box className={classes.headerDetail}>
                    <Avatar
                        alt="Profiel foto"
                        className={classes.profilePicture}
                        src={pf}
                    />
                    <Box className={classes.opdracht}>
                        <Typography variant='h6' component='h3' className={classes.opdrachtTitle}>3D Vilten</Typography>
                        <Typography variant='caption' className={classes.opdrachtSubtitle}>Thuisatelier opdracht</Typography>
                    </Box>
                </Box>
                <Typography variant='body1' component='p' className={classes.detailsOpdracht}>
                Vilt ontstaat als de schubben van wol aan elkaar gaan haken. Dat doe je met warm water en zeep. Door deze combinatie door je handen te wrijven, ontstaat er een stevig lapje stof. Deze stof, die heel warm, stevig en waterdicht is, wordt laken genoemd. De techniek is eeuwenoud en wordt ook vandaag de dag  nog gebruikt. Dit lijkt mij een leuke opdracht om mee bezig te zijn, maar ik zoek wat mensen om dit mee samen te doen.
                </Typography>
                <Box className={classes.detailsOpdrachtBottom}>
                    <Chip label='Thuis atelier'/>
                    <Box className={classes.detailsDatum}>
                        <QueryBuilderIcon className={classes.detailsDatumIcon}/>
                        <Typography className={classes.detailsDatumText} variant='subtitle1' component='p'>29 maart 2021</Typography>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    </div>
    )
}

export default DetailPost
