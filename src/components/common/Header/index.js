import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import { Link } from 'react-router-dom'
import datagram from 'assets/datagram.png'
import RangeCalendar from './RangeCalendar'

import './Header.scss'

const Header = ({title}) => {
  return (
    <Toolbar className='custom-style-header'>
      <div className='style-toolbar-group'>
        <Link to='/'><img className='datagram-img' src={datagram} alt='logo'/></Link>
        <h3>{title}</h3>
      </div>

      <div className='style-toolbar-group'>
        <RangeCalendar />
      </div>
    </Toolbar>
  )
}


export default Header
