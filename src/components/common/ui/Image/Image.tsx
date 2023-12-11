import React from 'react'
import styles from './Image.module.scss'

type ImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}
const Image = ({ src, alt = '', className = '', ...props }: ImageProps) => {
  return <img src={src} className={styles.Image + ' ' + className} alt={alt} {...props} />
}

export default Image
