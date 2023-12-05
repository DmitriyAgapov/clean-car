import React, { ReactNode } from 'react';
import styles from './Footer.module.scss';

type FooterProps = {
	children: ReactNode | ReactNode []
}
const Footer = ({children}:FooterProps) => {
	return (
		<footer className={styles.Footer}>{children}</footer>
	);
};

export default Footer;
