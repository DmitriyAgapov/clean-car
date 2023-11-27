import React, { useState } from 'react';
import styles from './Burger.module.scss';

type BurgerProps = {
	className: string
}
const Burger = ({ className, ...props }:BurgerProps) => {
	const [state, setState] = useState(false);
	return (
		<div className={styles.Burger + " " + className }  {...props}  onClick={() => setState(prevState => !prevState)} data-state={state}>
			<span/>
			<span/>
			<span/>
		</div>
	);
};

export default Burger;
