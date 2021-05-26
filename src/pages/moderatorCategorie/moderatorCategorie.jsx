import { useState, useEffect, setState } from "react";
import Typography from "@material-ui/core/Typography";
import CategorieList from "../../components/categorie/categorieList";
import { Box, makeStyles } from "@material-ui/core";
import { useAuth } from '../../contexts/authContext'
import CategorieForm from "../../components/categorie/categorieForm";
import isJson from '../../contexts/isJson'

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(6),
    width: '80%',
    margin: '0 auto',
  },
}));

const ModeratorCategorie = () => {
  const TEST_URL = "http://127.0.0.1:8000/api/";
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [categorieList, setCategorie] = useState([]);
  const [categorieError, setCategorieError] = useState(false);
  const [nieuweCategorie, setNieuweCategorie] = useState(false);
  const [showList, setShowList] = useState(false);

  let user = currentUser;
  if(isJson(currentUser)){
    user = JSON.parse(currentUser);
  }
  const fetchCategorie = async () =>{
    const res = await fetch(TEST_URL+"categorie")
    const data = await res.json()
    return data
  }

  useEffect(() => {
    const getCategorie = async () =>{
      const categorieListVanServer = await fetchCategorie()
      setCategorie(categorieListVanServer)
    }
    getCategorie()
  }, []);

  const deleteCategorie = async (categorie_ID) => {
    await fetch(TEST_URL + 'categorie/delete/' + categorie_ID, {
      method: 'DELETE'
    })
    setCategorie(categorieList.filter((categorie) => categorie.categorie_ID !== categorie_ID))
  };

  const addCategorie = async (categorie) =>{
    console.log(categorie)
    if(categorie.categorie && categorie.categorie !== ""){
      try{
        const res = await fetch(TEST_URL+'categorie/store', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
          body: JSON.stringify(categorie)
        })
        if(!res.ok){
          throw new Error(res.statusText)
        }
        setCategorieError(false)
        let data = await res.json()
        data.categorie_ID = data.id
        setCategorie([...categorieList, data])
        setNieuweCategorie(true)
        setShowList(true)
      }catch(e){
        setCategorieError(true)
      }
    }
    else{
      return setCategorieError(true)
    }
  }

  const setTheShowList = (show) => {
    setShowList(show)
  }

  return (
    <div>
      {user.admin ? 
      (<Box className={classes.pageContainer}>
        <CategorieForm categorieError={categorieError} addCategorie={addCategorie}/>
        <CategorieList nieuweCategorie={nieuweCategorie} categorieList={categorieList} deleteCategorie={deleteCategorie} showList={showList} setTheShowList={setTheShowList}/>
      </Box>)
      :
      (<div>404</div>)}
    </div>
  );
};

export default ModeratorCategorie;