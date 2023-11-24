import React from 'react';
import styles from './Heading.module.scss';

export enum HeadingVariant {
	h1 =  "h1" ,
	h2 = "h2",
	h3 = "h3",
	h4 = "h4",
	h5 = "h5",
	h6 = "h6"
}
export enum HeadingColor {
	default =  "default" ,
	accent = "accent",
	gradient = "gradient"
}

type HeadingProps = {
	text: string
	variant: HeadingVariant
	color?: string
}

const Heading = ({ text, variant = HeadingVariant.h2, color = HeadingColor.default }: HeadingProps) => {
	switch (variant) {
		case "h1":
			return <h1 className={styles.Heading} color={color}>{text}</h1>
		case "h2":
			return <h2 className={styles.Heading} color={color}>{text}</h2>
		case "h3":
			return <h3 className={styles.Heading} color={color}>{text}</h3>
		case "h4":
			return <h4 className={styles.Heading} color={color}>{text}</h4>
		case "h5":
			return <h5 className={styles.Heading} color={color}>{text}</h5>
		case "h6":
			return <h6>{text}</h6>
		default:
			return <div>{text}</div>
	}
};

export default Heading;
