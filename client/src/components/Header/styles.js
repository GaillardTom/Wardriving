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

      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
        marginRight: '-30%',
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',

      },
      searchIcon: {
        padding: theme.spacing(0, 2), height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '120%',
        '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        borderRadius: theme.shape.borderRadius,

      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0), paddingLeft: `calc(1em + ${theme.spacing(4)}px)`, transition: theme.transitions.create('width'), width: '100%', [theme.breakpoints.up('md')]: { width: '20ch' }, justifyContent: 'center', alignItems: 'center', display: 'flex', 
      },
      toolbar: {
        display: 'flex', justifyContent: 'space-between',
      },
}))