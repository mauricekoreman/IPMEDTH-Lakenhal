import {makeStyles, Accordion, AccordionSummary, AccordionDetails, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({

}));

const AanmeldingenCard = ({AangemeldeUser}) => {
  const classes = useStyles();
  console.log(AangemeldeUser);
  return (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
        >
            <Typography>gebruiker</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>
                ingezonde tekst
            </Typography>
        </AccordionDetails>
    </Accordion>
  );
}

export default AanmeldingenCard;



