import React from 'react'
import {
    Button,
    makeStyles,
  } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    rapporteerButton: {
        display: 'block',
        width: '80%',
        margin: '0 auto',
        marginTop: theme.spacing(2),
        fontSize: theme.spacing(2),
    },
    rapporteerButtonImportant: {
        display: 'block',
        width: '80%',
        margin: '0 auto',
        marginTop: theme.spacing(2),
        fontSize: theme.spacing(2),
        backgroundColor: 'red',
        color: 'white'
    },
    buttonContainers: {
        marginTop: theme.spacing(4)
    },
}))

function ActieButtons({closed, activiteit, user}) {
    const TEST_URL = "http://127.0.0.1:8000/api/";
    const verwijderPost = async (activiteit) =>{
        await fetch(TEST_URL + 'activiteit/' + activiteit, {
            method: 'DELETE'
        })
        closed('none', true)
    }

    const verwijderRapportage = async (activiteit) =>{
        await fetch(TEST_URL + 'activiteit/verwijderRapportage/' + activiteit, {
            method: 'PATCH'
        })
        closed('none', true)
    }

    const classes = useStyles();
    return (
        <div className={classes.buttonContainers}>
            <Button onClick={(() =>{verwijderRapportage(activiteit)})}className={classes.rapporteerButton} variant="contained" color="primary"> 
                Keur post goed
            </Button>
            <Button onClick={(() => {verwijderPost(activiteit)})} className={classes.rapporteerButtonImportant} variant="contained" color="primary"> 
                Verwijder post 
            </Button>
        </div>
    )
}

export default ActieButtons
