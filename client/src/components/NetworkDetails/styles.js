import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  
  formControl: {
    margin: theme.spacing(1), minWidth: 120, marginBottom: '30px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  container: {
    padding: '25px',
    borderRadius: '45px',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    marginBottom: '30px',
    
  },
  closeIcon: {
    
    padding: '5px',
    cursor: 'pointer',
    
  },
  list: {
    height: '75vh', overflow: 'auto',
  },
  column: {
    float: 'left',
    width: '50%',
  },
  
  /* Clear floats after the columns */
  row:{
    content: "",
    display: 'table',
    clear: 'both'
  }


}));