import React from 'react';
import styles from './DateComponent.module.scss';

type DateComponentProps = {}

const DateComponent = () => {
	const value = new Date(Date.now())
	const options = {
		day: 'numeric',
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		hour: "numeric",
		minute: "numeric"
	}
	const day = value.getDate().toLocaleString('ru', {compactDisplay: "long"});
	const month = value.toLocaleString('default', {month: "long"});
	const year = value.getFullYear();
	const hours = value.getHours().toLocaleString('ru', {compactDisplay: "long"});
	const min = value.getMinutes().toLocaleString('ru', {compactDisplay: "long"});

	return <div className={styles.DateComponent + " " + 'text-xs text-[var(--accentColor)] mr-auto ml-16'}>{day} {month} {year} года {hours}:{min}</div>
}
export default DateComponent;
