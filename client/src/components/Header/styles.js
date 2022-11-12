import {alpha, makeStyles }from '@material-ui/core/styles'
export default makeStyles((theme) => ({ 
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        display: 'flex',
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'inherit',
        backgroundColor: 'inherit',
       '& hover': { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
      },
     
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        
        marginRight: 0,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
        alignItems: 'center',
        justifyContent: 'right',
        display: 'flex',
        "min-height": '70px',
        textAlign: 'right',
  
      },
      searchIcon: {
        padding: theme.spacing(0, 2), height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', 
        '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        borderRadius: theme.shape.borderRadius,
        justifyContent: 'right',
       
      },
      inputRoot: {
        color: 'inherit',
      },
      dropdown: {
        "min-width": '100px',
        marginLeft: "1em",
        "max-height": '55px',
        
      },
      inputRoot: {

      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0), paddingLeft: `calc(1em + ${theme.spacing(4)}px)`, transition: theme.transitions.create('width'), width: '100%', [theme.breakpoints.up('md')]: { width: '20ch' }, justifyContent: 'center', alignItems: 'center', display: 'flex', 
        '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        borderRadius: theme.shape.borderRadius,
        "min-height": '45px',
        
      },
      toolbar: {
        display: 'flex', justifyContent: 'space-between',
      },
      subtitle: {
        marginLeft: '20%',
      },
      searchTitle:{
        
      },
}))