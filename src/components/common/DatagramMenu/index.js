import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import EuroSymbol from "@material-ui/icons/EuroSymbol";
import LocalOffer from "@material-ui/icons/LocalOffer";
import ViewModule from "@material-ui/icons/ViewModule";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import PinDrop from "@material-ui/icons/PinDrop";
import OndemandVideo from "@material-ui/icons/OndemandVideo";
import ShowChart from "@material-ui/icons/ShowChart";
import Visibility from "@material-ui/icons/Visibility";
import Grade from "@material-ui/icons/Grade";
import InsertChart from "@material-ui/icons/InsertChart";
import NotificationsActive from "@material-ui/icons/NotificationsActive";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";


import Separate from './Separate'
import './DatagramMenu.scss'

const datagramStyles = makeStyles({
  iconBTN: {
    paddingLeft: "9px",
    top: "3px",
    marginRight: "10px"
  },
  chip: {
    position: "absolute",
    left: "44px",
    bottom: "80px",
    width: 0
  }
});

const DatagramMenu = ({menu, profile}) => {
  const [open, setOpen] = useState(true);
  const [anchorElProfile, setAnchorElProfile] = useState(null)
  const {menuItem :{ price, promotion, assortment, products, stores, media, sales, view, rating, report, alert }} = menu
 
  const datagramStyle = datagramStyles();
 
  const POSITIONING = {
    [price]: [<EuroSymbol className="style-icon" />, '/price' ],
    [promotion]: [<LocalOffer className="style-icon" />, '/promotion'],
    [assortment]: [<ViewModule className="style-icon"/>, '/assortment'],
    [products]: [<VerifiedUser className="style-icon"/>, '/products'],
    [stores]: [<PinDrop className="style-icon"/>, '/geolocation'],
    [media]: [<OndemandVideo className="style-icon"/>, '/media'],
  };

  const PERFORMANCE = {
    [sales]: [<ShowChart className="style-icon" />, '/sales' ],
    [view]: [<Visibility className="style-icon" />, '/viewability'],
    [rating]: [<Grade className="style-icon"/>, '/rating'],
  }

  const PIM = {
    'PIM': [<InsertChart className="style-icon" />, '/pim' ],
  }
  
  const PIMCHILD = [
    {id: 'products', name: 'Produits'},
    {id: 'lists', name: 'Listes'},
    {id: 'categories', name: 'Catégories'},
    {id: 'assortments', name: 'Assortiments'},
    {id: 'sectors', name: 'Secteurs'},
  ]
  const logout = () => {
    localStorage.removeItem("datagramToken");
    localStorage.removeItem("selected-filters");
    window.location.href = "/login";
  };

  const toggleAlertMenu = () => {
    console.log('alert')
  }

  const toggleDownloadsSection = () => {
    console.log('download')
  }

  const handleClickProfile = event => {
    setAnchorElProfile(event.currentTarget)
  }

  const handleCloseProfile = () => {
    setAnchorElProfile(false)
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={`dg-menu ${!open ? "closed" : ""}`}>
      <Drawer
        variant="permanent"
        open={open}
        className="drawer-style"
      >
        <h1>search</h1>
        <Divider className="grey" />
        <Separate
          separator={menu.separator.positionnement}
          menuItem={POSITIONING}
        />

        <Divider className="grey" />
        <Separate
          separator={menu.separator.performance}
          menuItem={PERFORMANCE}
        />

        <Divider className="grey" />
        <Separate
          childItems={profile.reports && profile.reports}
          separator={menu.separator.custom}
          route='report'
        >
          <div className='alert-menu'>
            {!open ? (
              <IconButton
                onClick={handleDrawerOpen}
                className={datagramStyle.iconBTN}
              >
                <InsertChart className="style-icon" />
              </IconButton>
            ) : (
              <InsertChart
                className="style-icon"
                style={{
                  fill: profile.reports && profile.reports.length ? "#757575" : "#aaa"
                }}
              />
            )}
            {report}
          </div>

        </Separate>
        
        <div>
          <MenuItem
            className={"menu-style"}
            onClick={toggleAlertMenu}
          >
            <div className="link-style menu">
              <NotificationsActive className="style-icon" />
              {alert}
            </div>
          </MenuItem>

          <MenuItem
            className="menu-style"
            onClick={toggleDownloadsSection}
          >
            <div className="link-style menu">
              <VerticalAlignBottomIcon className="style-icon" />
              {"Téléchargements"}
            </div>
          </MenuItem>
        </div>

        <Separate
          menuItem={PIM}
          childItems={PIMCHILD}
          route='pim'
        />
      </Drawer>
 
       <Chip
          onClick={handleClickProfile}
          avatar={
            <Avatar
              src={profile.avatar}
              style={{ backgroundColor: "#e8e8e8" }}
            />
          }
          className={`${datagramStyle.chip} chip-size`}
        />
      <Menu
        style={{ top: 0, left: "30px", zIndex: "1000000" }}
        anchorEl={anchorElProfile}
        open={Boolean(anchorElProfile)}
        onClose={handleCloseProfile}
      >
        <MenuItem
          // onClick={this.toggleDrawer(true)}
          className="profile-menuitem"
        >
          {menu.profile.profile}
        </MenuItem>
        <MenuItem onClick={logout} className="profile-menuitem">
          {menu.profile.logout}
        </MenuItem>
      </Menu>
    </div>
  )
}

export default DatagramMenu


