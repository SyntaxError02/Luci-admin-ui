import { Link } from 'react-router-dom';
import classes from './SidebarListItem.module.scss';

const SidebarListItem = ({ Icon, menuTitle, isActive, toLink }) => {
  return (
    <Link
      to={toLink}
      className={`${isActive && classes.Active} ${classes.SidebarListItem}`}
    >
      <Icon className={classes.icon} />
      {menuTitle}
    </Link>
  )
}

export default SidebarListItem;
