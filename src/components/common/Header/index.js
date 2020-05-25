import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import { Link } from 'react-router-dom'
import datagram from 'assets/datagram.png'
import RangeCalendar from './RangeCalendar'
import { withStyles } from '@material-ui/core/styles'

import './Header.scss'
const headerStyles = {
  range: {
    display: 'flex',
    marginRight: '20px',
    flexDirection: 'column'
  },
  compare: {
    fontSize: '11px',
    color: '#888',
    textAlign: 'end'
  },
  img: {
    margin: '0 auto'
  }
}
const Header = ({title, classes, translates, selectedFilter, profile, changeCalendarRange, changeCalendarRange2 }) => {
  return (
    <Toolbar className='custom-style-header sp-between'>
      <div className='style-toolbar-group'>
        <Link to='/'><img className='datagram-img' src={datagram} alt='logo'/></Link>
        <h3>{title}</h3>
      </div>

      <div className='style-toolbar-group'>
        <div
          className={classes.range}
        >
          <RangeCalendar 
            profile={profile}
            startDate={selectedFilter.date}
            endDate={selectedFilter.pickedDate}
            changeCalendarRange={changeCalendarRange}
          />

          {!profile.hide_calendar ? 
            <span className={classes.compare}>
              {translates.header.calendar.compare}
            </span> : null
          }
        </div>
          {!profile.hide_calendar ? 
            <RangeCalendar 
              profile={profile}
              startDate={selectedFilter.date2}
              endDate={selectedFilter.pickedDate2}
              changeCalendarRange={changeCalendarRange2}
           /> : null}
        <img className={`img ${classes.img}`} src={profile.logo} alt='logo'/>
      </div>
    </Toolbar>
  )
}

export default (withStyles(headerStyles)(Header))