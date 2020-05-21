import React from 'react'
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';

const Separate = ({separator, menuItem, location: { pathname }, childItems, route, children}) => {
  const renderChild = () => {
    if(!childItems) return null
    return(
      <div>
        {children}
        {
          childItems && childItems.map((row, index) => (
            <MenuItem
              key={index}
              className={`menu-style sub ${pathname === `/${route}/${row.id}` && "selected"}`}
              style={{ marginLeft: "5px" }}
            >
              <Link to={`/${route}/` + row.id} className="link-style">
                {row.name}
              </Link>
            </MenuItem>
          )) 
        }
      </div>
    )
  }
  return (
    <div>
      <ListSubheader className="subheader-style">
        {separator && separator}
      </ListSubheader>
      {
        menuItem && Object.keys(menuItem).map((item, i) => {
          return (
            <MenuItem key={i} className={`menu-style ${pathname === menuItem[item][1] && "selected"}`} >
              <Link to={menuItem[item][1]} className="link-style menu">
                {menuItem[item][0]}
                {item}
              </Link>
            </MenuItem>
          )
        })
      }
      {renderChild()}
    </div>
  )
}

export default withRouter(Separate)