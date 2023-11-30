import React from 'react';
import styles from './Image.module.scss';

type ImageProps = {
	src: string
	alt:string
	className?: string
}
const Image = ({ src, alt = "", className = ""}:ImageProps) => {
	return (
		<img src={src} className={styles.Image + " " + className} alt={alt}/>
	);
};

export default Image;
