import React, {useState} from 'react'
import {connect} from 'react-redux'
import {getTranslates} from 'utils/getTranslate'
import Drawer from "@material-ui/core/Drawer";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";

import './DatagramMenu.scss'

const DatagramMenu = ({profile}) => {
  const [open, setOpen] = useState(true)
  const translates = getTranslates(profile.locale);
  console.log(translates)
  return (
    <div className={`dg-menu ${!open ? "closed" : ""}`}>
      <Drawer
        variant="permanent"
        open={open}
        className="drawer-style"
      >
        <ListSubheader className="subheader-style">
          TEST
        </ListSubheader>
        <MenuItem className={`menu-style`}>
          asdasdasasdas
        </MenuItem>
      </Drawer>
    </div>
  )
}

const mapStateToProps = store => ({
  profile: store.profile.profile
})

export default connect(mapStateToProps,null)(DatagramMenu)
