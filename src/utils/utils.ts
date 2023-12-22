import React, { useEffect, useState } from 'react'
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

type WindowDimentions = {
  width: number | undefined;
  height: number | undefined;
  state: Promise<boolean> | boolean | undefined;
};


export const isServer = typeof window === 'undefined';
export const resolutionQuality =  (width:number) => {

  const videoSize = [ 240, 360, 480, 720, 1080, 1440, 2160 ];

  if (width) {
    const resQuality = (it: number) => width / 4 * 3 < it

    const qlty = () => {
      if (videoSize.findIndex(resQuality) > 0) return videoSize[videoSize.findIndex(resQuality)];
      if (videoSize.findIndex(resQuality) - 1 < 0) return videoSize[videoSize.length - 1];
    }
    let quality = qlty();
    return [
      { src: `https://nestrecovery.b-cdn.net/nest_promo_${quality}p.webm`, type: 'video/webm' },
      { src: `https://nestrecovery.b-cdn.net/nest_promo_${quality}p.mp4`, type: 'video/mp4' }
    ]
  }
}
export const useWindowDimensions = (): WindowDimentions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
    width: undefined,
    height: undefined,
    state: undefined
  });
  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        state: window.innerWidth < window.innerHeight
      });
    }
    handleResize();

    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowDimensions;
};
