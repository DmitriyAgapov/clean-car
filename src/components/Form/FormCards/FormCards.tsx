import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import React from 'react'
import styles from './FormCards.module.scss'

export const FormCard = ({title,titleVariant = HeadingVariant.h2, titleColor,children, navigate, className = '', actions}:{title:string, titleVariant?:HeadingVariant, titleColor?:HeadingColor, className?: string, children?: React.ReactNode, navigate?: (event: React.MouseEvent) => void, actions?:React.ReactNode}) => {
  return (
    <div className={styles.cardform_step + " " + className} onClick={(event) => {
      event.stopPropagation()
      event && navigate && navigate(event)
    }}>
      <header>
        <Heading color={titleColor} text={title} variant={titleVariant}/>
      </header>
      {children && <div className="card-body">
          {children}
        </div>}
      <footer>
        {actions}
      </footer>
    </div>
  );
}
