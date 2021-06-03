import { useEffect, useState } from "react"
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';

const useTimeRangePicker = () => {
  const [timeRange, onTimeChange] = useState(['10:00', '11:00']);

  return (
    <TimeRangePicker
      onChange={onTimeChange}
      value={timeRange}
      className='recCustom'
    />
  );
}

export default useTimeRangePicker
