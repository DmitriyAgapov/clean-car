import React, { ReactNode } from 'react';
import styles from './Footer.module.scss';
import CurrentUser from "components/common/layout/CurrentUser/CurrentUser";

type FooterProps = {
	children: ReactNode | ReactNode []
}
const Footer = ({children}:FooterProps) => {
	return (
		<footer className={styles.Footer}>{children}<CurrentUser/></footer>
	);
};

export default Footer;
