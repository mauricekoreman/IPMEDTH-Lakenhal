import React, {forwardRef, useState, useEffect} from 'react'
import CloseIcon from '@material-ui/icons/Close';
// import Image from 'material-ui-image';
import lakenhal_sw from "../../assets/img/lakenhal_sw.png";
import pf from "../../assets/img/placeholders/profile_picture_placeholder.jpg";
import detailPost_img_placeholder from "../../assets/img/placeholders/detailPost_placeholder.png";
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import AanmeldingenList from './aanmeldingenList.jsx';
import { useAuth } from '../../contexts/authContext';
import isJson from '../../contexts/isJson';
import InschrijvenActiviteit from "../activiteit/inschrijvenActiviteit";

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
        display: 'flex',
    },
    detailsDatumIcon: {
        opacity: 0.7,
    },
    topImage: {
        width: '100%',
        height: theme.spacing(22),
    }
})); 

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

//zie detailrapportageclick functie van moderatorRapportage hoe je open en close
//screen moet implementeren als parent variabelen
//geef ook het activiteit mee waarop is gedrukt en je krijgt de juiste detail post te zien
const DetailPost = ({open, closeScreen, activiteit}) => {
    const classes = useStyles();

    console.log(activiteit);
    return ( 
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
            {open &&
                <div>
                    <img className={classes.topImage} src= {`data:image/png;base64, ${activiteit.afbeelding}`} />
                    <Box className={classes.detailContainer}>
                        {activiteit.lakenhal_activiteit ? (<img src={lakenhal_sw} className={classes.lakenhalLogo}/>) : <div></div>}
                        <Box className={classes.headerDetail}>
                            <Avatar
                                alt="Profiel foto"
                                className={classes.profilePicture}
                                src={`data:image/png;base64, ${activiteit.profiel_foto}`}
                            />
                            <Box className={classes.opdracht}>
                                <Typography variant='h6' component='h3' className={classes.opdrachtTitle}>{activiteit.titel}</Typography>
                                <Typography variant='caption' className={classes.opdrachtSubtitle}>{activiteit.categorie}</Typography>
                            </Box>
                        </Box>
                        <Typography variant='body1' component='p' className={classes.detailsOpdracht}>
                            {activiteit.beschrijving}
                        </Typography>
                        <Box className={classes.detailsOpdrachtBottom}>
                            <Chip label={activiteit.categorie}/>
                            <Box className={classes.detailsDatum}>
                                <QueryBuilderIcon className={classes.detailsDatumIcon}/>
                                {/* De datum is voor nu een placeholder, kan later worden aangepast wanneer activiteiten terplekke gemaakt worden. */}
                                <Typography className={classes.detailsDatumText} variant='subtitle1' component='p'>29 maart 2021</Typography>
                            </Box>
                        </Box>
                    </Box>
                    
                    <InschrijvenActiviteit user={activiteit} activiteit={activiteit.activiteit_ID}/>
                    <AanmeldingenList activiteit_ID={activiteit.activiteit_ID}/>
                </div>
            }
        </Dialog>
    )
}

export default DetailPost
