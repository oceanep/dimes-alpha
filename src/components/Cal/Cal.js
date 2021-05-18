import {useState} from 'react';
import {
    Center,
    Box,
    Flex
} from "@chakra-ui/react"

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import styles from './cal.module.scss'

function Cal() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        className={styles.calCustom}
      />
    </div>
  );
}

Cal.displayName = "Cal"
export default Cal;
