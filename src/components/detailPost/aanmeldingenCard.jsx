import {makeStyles, Accordion, AccordionSummary, AccordionDetails, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({

}));

const AanmeldingenCard = ({aangemeldeUser}) => {
  const classes = useStyles();
  console.log(aangemeldeUser);
  return (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
        >
            <Typography>{aangemeldeUser.naam}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>
                {aangemeldeUser.bericht != null ? aangemeldeUser.bericht : "De aangemelde persoon heeft geen tekst ingestuurd"}
            </Typography>
        </AccordionDetails>
    </Accordion>
  );
}

export default AanmeldingenCard;



