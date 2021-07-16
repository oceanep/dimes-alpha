import {useState} from 'react';
import {
    Center,
    Box,
    Flex
} from "@chakra-ui/react"

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import styles from './cal.module.scss'

function Cal({ dayClick, defaultDate, activeDays }) {
  //tileClassName= ({ activeStartDate, date, view }) => view === 'month' && 15 < date.getDay() < 25 ? 'available-day' : null
  //react-calendar__tile--hasActive
  const currentDay = new Date()
  console.log('active days', activeDays)
  const dayActive = (activeStartDate, date, view) => {

    const monthCheck = currentDay.getMonth() < date.getMonth() ? true : currentDay.getMonth() > date.getMonth() ? false : currentDay.getDate() <= date.getDate()

    const status = view === 'month' && monthCheck && activeDays[date.getDay()] ? styles.availableDay : styles.notAvailable
    console.log('cal view: ', status)
    return status
  }
  return (
    <div>
      <Calendar
        onChange={dayClick}
        className={styles.calCustom}
        value={defaultDate}
        tileClassName = {({ activeStartDate, date, view }) => (
          dayActive(activeStartDate, date, view)
        )}
        onClickDay={(value, event) => dayClick(value)}
      />
    </div>
  );
}

Cal.displayName = "Cal"
export default Cal;
