import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './Burger.css';

const useStyles = makeStyles((theme)=>({
  burger: {
    fontSize:"20px",
    boxShadow:"none",
    backgroundColor: '#A68C70',
    '&:hover, &:active, &:focus':{
      backgroundColor: '#A68C70',
      boxShadow:"none",
    },
    
    [theme.breakpoints.up('sm')]:{
      display:'none',
    }
  },
}));


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <div>
      <Button
        className={classes.burger}
        aria-controls='customized-menu'
        aria-haspopup='true'
        variant='contained'
        onClick={handleClick}
      >
        &#9776;
      </Button>
      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <Link className="burger-lien" to={{ pathname: `/` }}>
            <ListItemText primary='Accueil'>Accueil</ListItemText>
          </Link>
        </StyledMenuItem>

        <StyledMenuItem>
          <Link className="burger-lien" to={'/ou-partir'}>
            <ListItemText primary='Où partir?'>Où partir?</ListItemText>
          </Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary='Statistiques' />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}

export default CustomizedMenus;
