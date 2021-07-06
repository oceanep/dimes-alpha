const timeUtils = {
  convertToTime: (begin, end) => {
    // console.log(`start values: ${begin}, ${end}`)
    let startTime = +begin * 15
    let endTime = +end * 15

    // console.log(`raw values: ${startTime}, ${endTime}`)
    let startHour = (Math.floor(startTime/60)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
    let endHour = (Math.floor(endTime/60)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})

    let startMin = (startTime % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
    let endMin = (endTime % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})

    const timeRange = [`${startHour}:${startMin}`, `${endHour}:${endMin}`]
    // console.log('times', timeRange)
    return timeRange
  },
  convertFromTime: (time) => {
    let beginTime = time[0]
    let endTime = time[1]

    let beginHour = parseInt(beginTime.split(':')[0]) * 60 / 15
    let beginMin = parseInt(beginTime.split(':')[1]) / 15

    let endHour = parseInt(endTime.split(':')[0]) * 60 / 15
    let endMin = parseInt(endTime.split(':')[1]) / 15

    beginHour += beginMin
    endHour += endMin
    //
    // console.log(`begin codec: ${beginHour}`)
    // console.log(`end codec: ${endHour}`)

    return {
      beginCodec: beginHour,
      endCodec: endHour
    }
  },
  roundTime: (time) => {
    let beginTime = time[0]
    let endTime = time[1]

    let beginHour = beginTime.split(':')[0]
    let beginMin = parseInt(beginTime.split(':')[1])
    beginMin = ((((beginMin + 7.5)/15 | 0) * 15) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})

    // console.log('begin minutes', beginMin)

    let endHour = endTime.split(':')[0]
    let endMin = parseInt(endTime.split(':')[1])
    endMin = ((((endMin + 7.5)/15 | 0) * 15) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})

    const roundedTime = [`${beginHour}:${beginMin}`,`${endHour}:${endMin}`]
    // console.log('Rounded Time', roundedTime)

    return roundedTime
  }
};

export default timeUtils;
