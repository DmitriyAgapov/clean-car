import React from 'react';
import styles from './CardFeaturesCircle.module.scss';
import Heading, { HeadingVariant } from "components/common/ui/Heading/Heading";

type CardFeaturesCircleProps  = {

	icon: React.ReactNode | HTMLImageElement
	title: string
	text: string

}
const CardFeaturesCircle = ({icon, title, text}:CardFeaturesCircleProps) => {
	return (
		<div className={styles.CardFeaturesCircle + " "}>
			{icon && <img
				// @ts-ignore
				src={icon.type} alt={''}/>}
			<Heading text={title} variant={HeadingVariant.h4} />
			<p>{text}</p>
		</div>
	);
};

export default CardFeaturesCircle;
