import { NavLink } from 'react-router-dom';
import { signOut } from '../../services/users';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styles from './Header.css';
import { useHistory } from 'react-router-dom';

export default function Header() {
  const { nav_burger, nav_button, headerheader, header } = styles;
  const history = useHistory();
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
      <h1 className={headerheader}>resourcery</h1>
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
        <MenuItem
          onClick={() => {
            history.push('/');
            setAnchorEl(null);
          }}
        >
          <h4 className={header}>Home</h4>
        </MenuItem>
        <hr />
        <MenuItem
          onClick={() => {
            history.push('/list');
            setAnchorEl(null);
          }}
        >
          <h4 className={header}>Resource List</h4>
        </MenuItem>
        <hr />
        <MenuItem
          onClick={() => {
            history.push('/user');
            setAnchorEl(null);
          }}
        >
          <h4 className={header}>My Profile</h4>
        </MenuItem>
        <hr />
        <MenuItem
          onClick={async () => {
            await signOut();
            location.replace('/signin');
          }}
        >
          <h4 className={header}>Log Out</h4>
        </MenuItem>
      </Menu>
    </header>
  );
}
