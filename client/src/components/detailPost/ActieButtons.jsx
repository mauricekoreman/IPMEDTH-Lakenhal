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
        '&:focus': {
            backgroundColor: 'red'
        },
        backgroundColor: 'red',
        color: 'white',
        '&:last-child' : {
            marginBottom: theme.spacing(5)
        }
    },
    buttonContainers: {
        marginTop: theme.spacing(4)
    },
}))

function ActieButtons({closed, activiteit, user, rapporteerPost = false, openSnackBar}) {
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

    const handleRapportage = (gerapporteerd = false) => {
        if (gerapporteerd === true) {
          let userActiviteit = {
            user_ID: user,
            activiteit_ID: activiteit,
          };
          const setRapportage = async () => {
            const res = await fetch(TEST_URL + "activiteit/rapporteer", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify(userActiviteit),
            });
            if (res.status === 201) {
              openSnackBar(true);
              console.log("rapportage succesvol");
            }
            if (res.status === 200) {
              openSnackBar(false);
              console.log("al gerapporteerd!");
            }
          };
          setRapportage();
        }
        // setAnchorEl(null);
      };

    const classes = useStyles();
    return (
        <div className={classes.buttonContainers}>
            {rapporteerPost ? 
            <div>
            <Button  onClick={(() => {handleRapportage(true)})} className={classes.rapporteerButtonImportant} variant="contained" color="primary"> 
                Activiteit is beledigend
            </Button>
            <Button  onClick={(() => {handleRapportage(true)})} className={classes.rapporteerButtonImportant} variant="contained" color="primary"> 
                Activiteit is spam 
            </Button>
            <Button onClick={(() => {handleRapportage(true)})} className={classes.rapporteerButtonImportant} variant="contained" color="primary"> 
                Activiteit is om een andere reden ongepast 
            </Button>
            </div> 
            : 
            <div>
                <Button onClick={(() =>{verwijderRapportage(activiteit)})}className={classes.rapporteerButton} variant="contained" color="primary"> 
                    Keur post goed
                </Button>
                <Button onClick={(() => {verwijderPost(activiteit)})} className={classes.rapporteerButtonImportant} variant="contained" color="primary"> 
                    Verwijder post 
                </Button>    
            </div>}
        </div>
    )
}

export default ActieButtons
