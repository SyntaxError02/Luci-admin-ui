import {
  PermIdentity
} from '@material-ui/icons'
import SideBarMenu from './sidebarMenu/SideBarMenu'
import classes from './Sidebar.module.scss';

const dashboardItems = [
  { icon: PermIdentity, isActive: true, title: 'home', link: '/dashboard' },
]


const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__wrapper}>
        <SideBarMenu
          menuTitle="dashboard"
          listItems={dashboardItems}
        />
      </div>
    </div>
  )
}

export default Sidebar;
