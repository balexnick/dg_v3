import React from 'react'
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';

const RouteLinks = ({separator, menuItems, location: { pathname }, childItems, route, children, open}) => {
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
      {
        open && (
          <ListSubheader className="subheader-style" style={{ backgroundColor: "#ddd" }}>
            {separator && separator}
          </ListSubheader>
        )
      }
      {
        menuItems && Object.keys(menuItems).map((item, i) => {
          return (
            <MenuItem 
              key={i} 
              disabled={!menuItems[item][2]}
              className={`menu-style ${pathname === menuItems[item][1] && "selected"}`} >
              <Link to={menuItems[item][1]} className="link-style menu">
                {menuItems[item][0]}
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

export default withRouter(RouteLinks)