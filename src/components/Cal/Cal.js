import {useState} from 'react';
import {
    Center,
    Box,
    Flex
} from "@chakra-ui/react"

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import styles from './cal.module.scss'

function Cal({dayClick}) {
  const [value, onChange] = useState(new Date());
  //tileClassName= ({ activeStartDate, date, view }) => view === 'month' && 15 < date.getDay() < 25 ? 'available-day' : null
  //react-calendar__tile--hasActive
  return (
    <div>
      <Calendar
        onChange={onChange}
        className={styles.calCustom}
        value={value}
        tileClassName = {({ activeStartDate, date, view }) => (
          view === 'month' && 15 < date.getDate() && date.getDate() < 25 ? styles.availableDay : null
        )}
        onClickDay={(value, event) => dayClick(value)}
      />
    </div>
  );
}

Cal.displayName = "Cal"
export default Cal;
