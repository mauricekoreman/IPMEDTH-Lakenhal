import DeleteIcon from '@material-ui/icons/Delete';

import {
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

const CategorieCard = ({categorie, deleteCategorie, lakenhal, categorie_ID}) => {

  return (
    <div>
    <ListItem>
      <ListItemText primary={categorie}/>
      <ListItemIcon>
        <DeleteIcon onClick={() => deleteCategorie(categorie_ID)} />
      </ListItemIcon>
    </ListItem>
    </div>

    // <FormGroup>
    //     <FormControlLabel
    //         control={<Checkbox icon={<DeleteOutlineIcon />} checkedIcon={<DeleteIcon />} checked={state.checked} onChange={handleChange} name="checked"/>}
    //         label={categorie}
    //         labelPlacement="start"
    //      />
    // </FormGroup>

  );
}

export default CategorieCard;



