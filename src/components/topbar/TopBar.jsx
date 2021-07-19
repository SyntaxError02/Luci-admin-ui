import { ExitToApp, Menu, Settings } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { Logout } from '../../utils/handleLogout';
import classes from './TopBar.module.scss';

const TopBar = ({ onOpen }) => {
  const history = useHistory();

  return (
    <div className={classes.TopBar}>
      <div className={classes.TopBar__wrapper}>
        <div className={classes.TopBar__topLeft}>
          <Menu onClick={onOpen} className={classes.TopBar__menuIcons}  />
          <Link to="/" className={classes.TopBar__logo}>Luci Admin</Link>
        </div>
        <div className={classes.TopBar__topRight}>
          <div className={classes.TopBar__icons}>
            <ExitToApp onClick={() => Logout(history)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar;
