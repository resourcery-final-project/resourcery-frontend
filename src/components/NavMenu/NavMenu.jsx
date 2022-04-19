import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';

export default function NavMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img src='./assets.hamburger-icon.png'></img>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><NavLink to="/">Home</NavLink></MenuItem>
        <hr />
        <MenuItem onClick={handleClose}><NavLink to="/list">Resource List</NavLink></MenuItem>
        <hr />
        <MenuItem onClick={handleClose}><NavLink to="/user">My Profile</NavLink></MenuItem>
        <hr />
        <MenuItem onClick={handleClose}>About Us</MenuItem>
        <hr />
        <MenuItem onClick={handleClose}>Log Out</MenuItem>
        <hr />

        {/* <input type="checkbox">Food Boxes</input> */}
        {/* <input type="checkbox">Fruit Trees</input>
        <input type="checkbox">Ready to Eat</input> */}
      </Menu>
    </div>
  );
}