import { makeStyles } from '@material-ui/core/styles'
import { Collapse } from '@mui/material'
import { border, width } from '@mui/system'

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: '30px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: '25px',
    borderRadius: '45px',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    marginBottom: '30px',
    width: '315%',
  },
  closeIcon: {
    padding: '5px',
    cursor: 'pointer',
    justifyContent: 'right',
    marginLeft: '95%',
    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
  },
  list: {
    height: '75vh',
    overflow: 'auto',
  },
  column: {
    float: 'left',
    width: '50%',
  },

  /* Clear floats after the columns */
  row: {
    content: '',
    display: 'table',
    clear: 'both',
  },
  clientButton: {
    marginRight: '10px',
    marginLeft: '50%',
  },
  options: {
    padding: '10px',
  },
  title: {
    padding: '20px',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    border: '2px solid rgba(0, 0, 0, 0.08)',
  },
  table: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '10px',
    width: '100%',
  },
}))
