import React, { useEffect, useState } from "react";
import styles from './DateComponent.module.scss'
import dayjs from "dayjs";

type DateComponentProps = {}

const DateComponent = () => {
  const [value, setValue] = useState<string | null>(null)

  const memoTime = React.useMemo(() => {
    setTimeout(() => {
      const date = dayjs()
      const curTime = dayjs(date).locale('ru').format('DD MMMM YYYY hh:mm:ss')
      setValue(curTime);
    }, 1000)
    return <>{value}</>
  }, [value])

  return (
    <div className={styles.DateComponent + ' ' + 'text-xs text-[var(--accentColor)] mr-auto ml-16'}>
      {memoTime}
    </div>
  )
}
export default DateComponent
