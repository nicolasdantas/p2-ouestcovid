/* eslint-disable */
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './style/Burger.scss';
import './style/Global.css';

const useStyles = makeStyles((theme) => ({
  burger: {
    color: 'white',
    fontSize: '30px',
    boxShadow: 'none',
    backgroundColor: 'var(--primary-color)',
    '&:hover, &:active, &:focus': {
      backgroundColor: 'var(--primary-color)',
      boxShadow: 'none',
      outline: 'none',
    },

    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
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
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
      >
        &#9776;
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <Link className="burger-lien" to="/">
            <ListItemText
              onClick={handleClose}
              className="boxBurger"
              primary="Statistiques"
            >
              Statistiques
            </ListItemText>
          </Link>
        </StyledMenuItem>

        <StyledMenuItem>
          <Link className="burger-lien" to="/ou-partir">
            <ListItemText
              onClick={handleClose}
              className="boxBurger"
              primary="Où partir?"
            >
              Où partir?
            </ListItemText>
          </Link>
        </StyledMenuItem>

        <StyledMenuItem>
          {useLocation().pathname === '/ou-partir' ? (
            <HashLink className="burger-lien" to="/#news">
              <ListItemText
                onClick={handleClose}
                className="boxBurger"
                primary="News"
              >
                News
              </ListItemText>
            </HashLink>
          ) : (
            <HashLink className="burger-lien" smooth to="/#news">
              <ListItemText
                onClick={handleClose}
                className="boxBurger"
                primary="News"
              >
                News
              </ListItemText>
            </HashLink>
          )}
        </StyledMenuItem>
        <StyledMenuItem>
        {useLocation().pathname === '/ou-partir' ? (
            <HashLink className="burger-lien" to="/#contact">
              <ListItemText
                onClick={handleClose}
                className="boxBurger"
                primary="Contact"
              >
                Contact
              </ListItemText>
            </HashLink>
          ) : (
            <HashLink className="burger-lien" smooth to="/#contact">
              <ListItemText
                onClick={handleClose}
                className="boxBurger"
                primary="Contact"
              >
                Contact
              </ListItemText>
            </HashLink>
          )}
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}

export default CustomizedMenus;
