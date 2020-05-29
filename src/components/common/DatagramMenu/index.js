import React, {useState} from 'react';
import { withStyles } from "@material-ui/core/styles";
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
import Help from "@material-ui/icons/Help";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListSubheader from "@material-ui/core/ListSubheader";
import { Link } from "react-router-dom";
import RouteLinks from './RouteLinks';

import './DatagramMenu.scss';

const styles = theme => ({
  drawerPaper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    whiteSpace: "nowrap",
    width: 220,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: 68
  },
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
  },
  menuButton: {},
  hide: {
    display: "none"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
  }
});

const DatagramMenu = ({menu, profile, classes, toogleOpen, open, removeToken}) => {
  const [anchorElProfile, setAnchorElProfile] = useState(null)
  const [anchorElHelp, setAnchorElHelp] = useState(null)

  
  const {menuItem :{ price, promotion, assortment, products, stores, media, sales, view, rating, report, alert }} = menu
 
  const POSITIONING = {
    [price]: [<EuroSymbol className="style-icon" />, '/price',  profile.price],
    [promotion]: [<LocalOffer className="style-icon" />, '/promotion',  profile.promotion],
    [assortment]: [<ViewModule className="style-icon"/>, '/assortment',  profile.assortment],
    [products]: [<VerifiedUser className="style-icon"/>, '/product', profile.product],
    [stores]: [<PinDrop className="style-icon"/>, '/geolocation',  profile.geo],
    [media]: [<OndemandVideo className="style-icon"/>, '/media',  profile.media],
  };

  const PERFORMANCE = {
    [sales]: [<ShowChart className="style-icon" />, '/sales', profile.price],
    [view]: [<Visibility className="style-icon" />, '/viewability', profile.ranking],
    [rating]: [<Grade className="style-icon"/>, '/rating', profile.reviews],
  }

  const PIM = {
    'PIM': [<InsertChart className="style-icon" />, '/pim', profile.pim ],
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
    removeToken()
  };

  const toggleAlertMenu = () => {
    console.log('alert')
  }

  const toggleDownloadsSection = () => {
    console.log('download')
  }

  const handleClickProfile = event => {
    setAnchorElProfile(anchorElProfile ? null : event.currentTarget)
  }

  const handleClickHelp = event => {
    setAnchorElHelp(anchorElHelp ? null : event.currentTarget)
  };

  const toogleDrawer = () => {toogleOpen()}


  return (
    <div className={`dg-menu ${!open ? "closed" : ""}`}>
      <Drawer
        variant="permanent"
        open={open}
        className={`${classes.drawerPaper} ${!open ? classes.drawerPaperClose : ''} drawer-style`}
       
      >
        <div className="alert-menu" style={{ height: 60 }}>
          <IconButton
            style={{ marginLeft: 2, marginRight: 12 }}
            color="inherit"
            aria-label="Open drawer"
            onClick={toogleDrawer}
            className={`${classes.menuButton} ${open ? classes.hide : ''}`}
          >
            <MenuIcon className="menu-icon" />
          </IconButton>
          {open && (
            <div className={classes.toolbar}>
              <IconButton onClick={toogleDrawer}>
                <ChevronLeftIcon className="menu-icon" />
              </IconButton>
            </div>
          )}
        </div>
        <Divider className="grey" />
        <RouteLinks
          separator={menu.separator.positionnement}
          menuItems={POSITIONING}
          open={open}
        />

        <Divider className="grey" />
        <RouteLinks
          separator={menu.separator.performance}
          menuItems={PERFORMANCE}
          open={open}
        />

        <Divider className="grey" />
        <RouteLinks
          separator={menu.separator.custom}
          open={open}
        />
        {
          profile.reports && profile.reports.length && <RouteLinks
          childItems={profile.reports}
          route='report'
        >
          <div className='alert-menu'>
            {!open ? (
              <IconButton
                onClick={toogleDrawer}
                className={classes.iconBTN}
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

        </RouteLinks>
        }
        
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

        {profile.pim && 
          <RouteLinks
            menuItems={PIM}
            childItems={PIMCHILD}
            route='pim'
          />
        }

      </Drawer>
 
      <IconButton onClick={handleClickHelp} className="help-button">
        <Help style={{ fontSize: "28px" }} />
      </IconButton>
      <Chip
        onClick={handleClickProfile}
        avatar={
          <Avatar
            src={profile.avatar}
            style={{ backgroundColor: "#e8e8e8" }}
          />
        }
        className={`${classes.chip} chip-size`}
      />

      <Menu
        style={{ top: 0, left: "30px", zIndex: "1000000" }}
        anchorEl={anchorElHelp}
        open={Boolean(anchorElHelp)}
        onClose={handleClickHelp}
      >
        <ListSubheader
          className="subheader-style"
          style={{ outline: "none" }}
        >
          Aide
        </ListSubheader>
        <MenuItem className="profile-menuitem">
          <Link
            to={"https://datagram.zendesk.com/hc/fr"}
            target="_blank"
            className="link-style"
          >
            Centre d'aide
          </Link>
        </MenuItem>
        <ListSubheader
          className="subheader-style"
          style={{ outline: "none" }}
        >
          Information
        </ListSubheader>
        <MenuItem className="profile-menuitem">
            <Link
              to={"https://blog.datagram.ai/"}
              target="_blank"
              className="link-style"
            >
              Blog
            </Link>
          </MenuItem>
      </Menu>
      <Menu
        style={{ top: 0, left: "30px", zIndex: "1000000" }}
        anchorEl={anchorElProfile}
        open={Boolean(anchorElProfile)}
        onClose={handleClickProfile}
      >
        <MenuItem
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

export default withStyles(styles, { withTheme: true })(DatagramMenu)


