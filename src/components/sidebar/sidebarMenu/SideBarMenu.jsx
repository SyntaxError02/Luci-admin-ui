import SidebarListItem from "../sidebarListItem/SidebarListItem";
import classes from "./SideBarMenu.module.scss";
const SideBarMenu = ({ menuTitle, listItems }) => {
  const path = window.location.pathname;

  return (
    <div className={classes.SideBarMenu}>
      <h3 className={classes.SideBarMenu__title}>{menuTitle}</h3>
      <ul className={classes.SideBarMenu__list}>
        {listItems.map((item, index) => (
          <SidebarListItem
            key={index}
            Icon={item.icon}
            menuTitle={item.title}
            isActive={path === item.link}
            toLink={item.link}
          />
        ))}
      </ul>
    </div>
  );
};

export default SideBarMenu;
