import React, { useEffect, useState } from "react";
import styles from './DateComponent.module.scss'
import dayjs from 'dayjs'
import { useInterval } from '@mantine/hooks'
import { Tooltip } from '@mantine/core'

type DateComponentProps = {}

const DateComponent = () => {
  const [value, setValue] = useState<string | any | null>(null)
  const [valueDate, setValueDate] = useState<dayjs.Dayjs | null>(null)
  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(() => setValue(dayjs().locale('ru')), 1000);

  useEffect(() => {
    interval.start();
  }, []);
  // const memoTime = React.useMemo(() => {
  //   setTimeout(() => {
  //     const date = dayjs()
  //     const curTime = dayjs(date).locale('ru').format('DD MMMM YYYY г. HH:mm:ss')
  //     setValue(curTime);
  //   }, 1000)
  //   return <>{value}</>
  // }, [value])
  return (
      <div className={styles.DateComponent + ' ' + 'text-xs text-[var(--accentColor)] mr-auto ml-16'}>
          {/* <p>{dayjs().locale('ru').format('DD MMMM YYYY г. HH:mm')}</p> */}

          <Tooltip label={value?.format('DD MMMM YYYY г. HH:mm:ss')} >
              <span>{value?.format('DD MMMM YYYY г. HH:mm')} </span>
          </Tooltip>
          {/* <p>{value?.format('DD MMMM YYYY г. HH:mm')} </p> */}
      </div>
  )
}
export default DateComponent
