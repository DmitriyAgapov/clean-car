import styles from './Progress.module.scss';
import React from 'react';

function Progress({total, current}: {total: number, current: number}) {
  return <div className={styles.progress} >
    <div className={"progress__done"} style={{width: `${current / total * 100}%`  }}></div>
    <div className={"progress__estimated"}></div>
  </div>;
}
export default Progress;
