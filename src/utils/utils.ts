import React from 'react'
import styles from "components/common/layout/DateComponent/DateComponent.module.scss";

export const useOutsideClick = (callback: () => void) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    const handleClick = (event: { target: any }) => {
      // @ts-ignore
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [ref])

  return ref
}

export const dateTransform = (date: string) => {
  const value = !date ? new Date(Date.now()) : new Date(date)
  const options = {
    day: 'numeric', weekday: 'long', year: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric',
  }
  const day = value.getDate().toLocaleString('ru', { compactDisplay: 'long' })
  const month = value.toLocaleString('default', { month: 'long' })
  const year = value.getFullYear()
  const hours = value.getHours().toLocaleString('ru', { compactDisplay: 'long' })
  const min = value.getMinutes().toLocaleString('ru', { compactDisplay: 'long' })

  return {
    date: `${day} ${month} ${year} года ${hours}:${min}`
  }
}
