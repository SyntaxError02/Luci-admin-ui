import BackDrop from "../BackDrop/BackDrop";
import classes from "./SideDrawer.module.scss";
import { PermIdentity } from "@material-ui/icons";
import SideBarMenu from "../sidebar/sidebarMenu/SideBarMenu";

const dashboardItems = [
  { icon: PermIdentity, isActive: true, title: "home", link: "/dashboard" },
];

const SideDrawer = ({ show, onClose }) => {
  return (
    <>
      <BackDrop show={show} close={onClose} />
      <div
        className={`${classes.SideDrawer} ${
          show ? classes.SideDrawerOpen : classes.SideDrawerHide
        }`}
      >
        <SideBarMenu menuTitle="dashboard" listItems={dashboardItems} />
      </div>
    </>
  );
};

export default SideDrawer;
