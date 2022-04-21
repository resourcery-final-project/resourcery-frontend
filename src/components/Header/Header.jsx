import { NavLink } from 'react-router-dom';
import { signOut } from '../../services/users';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styles from './Header.css';

export default function Header() {
  const { nav_burger, nav_button } = styles;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      <h1>resourcery</h1>
      <Button
        className={nav_button}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <h3 className={nav_burger}>|||</h3>
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
        <MenuItem onClick={handleClose}>
          <NavLink to="/">Home</NavLink>
        </MenuItem>
        <hr />
        <MenuItem onClick={handleClose}>
          <NavLink to="/list">Resource List</NavLink>
        </MenuItem>
        <hr />
        <MenuItem onClick={handleClose}>
          <NavLink to="/user">My Profile</NavLink>
        </MenuItem>
        <hr />
        <MenuItem
          onClick={async () => {
            console.log('click');
            await signOut();
          }}
        >
          Log Out
        </MenuItem>
        <hr />
      </Menu>
    </header>
  );
}
