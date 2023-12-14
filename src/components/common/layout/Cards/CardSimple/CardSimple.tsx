import React, { PropsWithChildren, ReactNode } from 'react'
import styles from "./CardSimple.module.scss";

type CardSimpleProps = {
  className?: string
  children: ReactNode | ReactNode[] | string
}

const CardSimple = ({className, children}:CardSimpleProps) => {
  return (<div className={styles.CardSimple + '  ' + className}>{children}</div>);
};

CardSimple.Header = ({className, children}: CardSimpleProps & PropsWithChildren<{}>) => {
  return (<header className={styles.CardSimpleHeader + '  ' + className}>{children}</header>);
}
CardSimple.Footer = ({className, children}: CardSimpleProps & PropsWithChildren<{}>) => {
  return (<footer className={styles.CardSimpleFooter + '  ' + className}>{children}</footer>);
}

export default CardSimple;
