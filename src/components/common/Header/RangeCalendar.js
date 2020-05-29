import React, {useState} from 'react'
import { DateRangePicker } from 'react-date-range';
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import Event from '@material-ui/icons/Event'
import moment from 'moment'
import {getTranslates} from 'utils/getTranslate'
import { allStaticRanges, allInputRanges } from './DateRangePickerFunctions'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { actions } from 'store';
import { cancelRequests } from 'utils/API';

const dialogStyles = {
  dialogPaper: {
    minHeight: '364px',
    maxHeight: 'auto'
  }
}

const RangeCalendar = (props) => {
  const { 
    profile:{ locale, freemium},
    startDate,
    endDate,
    changeCalendarRange,
    setSnackBarSelectedFiltersAction,
    setDeletedFiltersIds,
    classes
  } = props

  const [modalVisible, setModalVisible] = useState(false)
  // const [rangeDate, setRangeDate] = useState({startDate: startDate, endDate: endDate})

  const [start, setStart] = useState(startDate)
  const [end, setEnd] = useState(endDate)
  const TRANSLATE = getTranslates(locale)

  const handleClose = () => {
    setModalVisible(false)
    setStart(startDate)
    setEnd(endDate)
    // setRangeDate({startDate, endDate})
  }
  const handleValidate = () => {
    cancelRequests();
    setModalVisible(false)
    changeCalendarRange({
      start: start,
      end: end
    });
    setSnackBarSelectedFiltersAction();
    setDeletedFiltersIds([]);
  }

  const getCalendarLocale = () => {
    let localeCheck = locale ? locale : 'fr'
    if (localeCheck === 'en') {
      localeCheck = 'enUS'
    }
    return require(`react-date-range/dist/locale`)[localeCheck]
  }

  const handleDateSelect = ({ selection }) => {
    // setRangeDate({ startDate: selection.startDate, endDate: selection.endDate })
    setStart(selection.startDate)
    setEnd(selection.endDate)
  }
  const formatDate = () => `${moment(start).format('D MMM YYYY') + ' -> ' + moment(end).format('D MMM YYYY')}`
  
  const calendarLocale = getCalendarLocale();
  
  return (
    <span className='range-calendar' style={{ top: '-2px' }} >
      <button onClick={() => setModalVisible(true)} className='calendar-icon-button'>
        <Event />
        <Badge
          className='header-badgex-style'
          badgeContent={moment(end).diff(moment(start), 'days') + 1 + ' ' + TRANSLATE.header.calendar.day}
        >
          <p>{formatDate()}</p>
        </Badge>
      </button>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        className={`calendar-custom-dialog`}
        onClose={handleClose}
        open={modalVisible}
        style={{ zIndex: 10 }}
      >
        <DateRangePicker
          locale={calendarLocale}
          maxDate={new Date()}
          minDate={freemium ? new Date(moment().subtract(7, 'days')) : new Date(0)}
          ranges={[{
            startDate: moment(start)._d,
            endDate: moment(end)._d,
            key: 'selection'
          }]}
          staticRanges={allStaticRanges(locale)}
          inputRanges={allInputRanges(locale)}
          onChange={handleDateSelect} 
        />
        <div id='calendar-custom-footer'>
          <Button
            onClick={handleClose}
            size='small'
          >
            {TRANSLATE.buttons.cancel}
          </Button>
          <Button
            onClick={handleValidate}
            size='small'
            color='primary'
          >
            {TRANSLATE.buttons.validate}
          </Button>
        </div> 
      </Dialog>
    </span>
  )
}

const mapDispatchToProps = dispatch => ({
  setSnackBarSelectedFiltersAction: () => dispatch(actions.app.setSnackBarSelectedFiltersAction()),
  setDeletedFiltersIds: (deletedFiltersIds) => dispatch(actions.app.setDeletedFiltersIds(deletedFiltersIds))
})


export default connect(null, mapDispatchToProps)(withStyles(dialogStyles)(RangeCalendar))