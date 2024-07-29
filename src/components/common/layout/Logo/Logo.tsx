import React from 'react'
import styles from './Logo.module.scss'
import { observer } from 'mobx-react-lite'
import { useStore } from 'stores/store'
import { Link } from 'react-router-dom'

export interface LogoProps {
  className?: string
  position?: string
}

const Vector = () => <svg width="38"
  height="23"
  viewBox="0 0 38 23"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <path d="M13 14.8707H30.3075C32.3457 14.8707 34.0902 14.1433 35.5411 12.6884C36.9921 11.2336 37.7175 9.48427 37.7175 7.44054C37.7175 5.38989 36.9921 3.63714 35.5411 2.18228C34.0902 0.727427 32.3457 0 30.3075 0H13V1.66846H30.3075C31.6686 1.66846 32.8328 2.14995 33.8 3.11292C34.7673 4.08283 35.8447 5.46657 35.8447 7.44054C35.8447 9.41451 34.7673 10.7879 33.8 11.7578C32.8328 12.7277 31.6686 13.2126 30.3075 13.2126H13V14.8707Z"
    fill="black" />
  <path d="M24.8444 22.3379H7.4481C5.39944 22.3379 3.64592 21.6088 2.18755 20.1504C0.729185 18.692 0 16.9385 0 14.8898C0 12.8342 0.729185 11.0773 2.18755 9.61889C3.64592 8.16052 5.39944 7.43134 7.4481 7.43134H24.8444V9.10383H7.4481C6.08001 9.10383 4.90984 9.58648 3.9376 10.5518C2.96535 11.524 1.88247 12.9111 1.88247 14.8898C1.88247 16.8686 2.96535 18.2453 3.9376 19.2175C4.90984 20.1898 6.08001 20.6759 7.4481 20.6759H24.8444V22.3379Z"
    fill="black" />
</svg>

const Text = (props:any) => <svg width="188" height="7" viewBox="0 0 188 7" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M186.052 3.38064C186.356 3.23013 186.771 3.02414 186.941 2.76266C187.183 2.4549 187.281 2.05972 187.281 1.7133C187.281 1.21677 187.085 0.89297 186.72 0.540781C186.357 0.185705 185.874 0 185.36 0H176.866V0.801341H185.36C185.58 0.801341 185.916 0.896546 186.135 1.0619C186.354 1.22726 186.406 1.50257 186.406 1.7133C186.406 1.92692 186.289 2.20263 186.135 2.35563C185.977 2.50574 185.58 2.5808 185.36 2.5808H176.866V6.19651H177.662V3.42747H183.975L185.899 3.41697C185.953 3.41668 186.005 3.40417 186.052 3.38064Z" fill="currentColor" /><path d="M185.865 6.19651L183.148 3.11548H184.455L187.281 6.19651H185.865Z" fill="currentColor" /><path d="M3.1836 6.5H10.6194V5.73953H3.1836C2.59883 5.73953 1.90042 5.46013 1.48484 5.05597C1.06927 4.65182 0.806403 3.97261 0.806403 3.40391C0.806403 2.83232 1.06927 2.15167 1.48484 1.74752C1.90042 1.34625 2.59883 1.11612 3.1836 1.11612H10.6194V0.30349H3.1836C2.30793 0.30349 1.55841 0.606604 0.935044 1.21283C0.311681 1.81906 0 2.54942 0 3.40391C0 4.25552 0.311681 4.98443 0.935044 5.59066C1.55841 6.19689 2.30793 6.5 3.1836 6.5Z" fill="currentColor" /><path d="M23.7635 0.30349H22.9023V6.5H33.5218V5.73121H23.7635V0.30349Z" fill="currentColor" /><path d="M45.8047 2.88429H56.4241V3.62102H46.6469V5.7319H56.4241V6.5H45.8047V2.88429Z" fill="currentColor" /><path d="M45.8047 0.30349H56.4241V1.12837H45.8047V0.30349Z" fill="currentColor" /><path d="M75.1776 0.30349H74.3831L68.707 6.5H70.1229L74.7848 1.17519L79.4511 6.5H80.7334L75.1776 0.30349Z" fill="currentColor" /><path d="M102.705 0.30349H103.526V6.5H102.282L94.2097 1.10576V6.5H93.4147V0.30349H94.4092L102.705 5.73895V0.30349Z" fill="currentColor" /><path d="M132.441 6.5H139.876V5.73791H132.441C131.856 5.73791 131.157 5.46013 130.742 5.05597C130.326 4.65182 130.067 3.97261 130.067 3.40391C130.067 2.83232 130.326 2.15167 130.742 1.74752C131.157 1.34625 131.856 1.10816 132.441 1.10816H139.876V0.30349H132.441C131.565 0.30349 130.815 0.606604 130.192 1.21283C129.569 1.81906 129.257 2.54942 129.257 3.40391C129.257 4.25552 129.569 4.98443 130.192 5.59066C130.815 6.19689 131.565 6.5 132.441 6.5Z" fill="currentColor" /><path d="M157.841 0.30349H158.635L164.319 6.5H162.903L158.237 1.2084L153.575 6.5H152.159L157.841 0.30349Z" fill="currentColor" /></svg>
const TextAuth = (props:any) => <svg width="399" height="15" viewBox="0 0 399 15" fill="none" xmlns="http://www.w3.org/2000/svg"  {...props}><path d="M396.224 7.39695C396.87 7.06764 397.754 6.61692 398.116 6.0448C398.632 5.3714 398.841 4.50673 398.841 3.74876C398.841 2.66234 398.422 1.95385 397.645 1.18325C396.873 0.406329 395.843 0 394.75 0H376.66V1.75336H394.75C395.217 1.75336 395.932 1.96167 396.399 2.32348C396.865 2.68528 396.977 3.28766 396.977 3.74876C396.977 4.21618 396.728 4.81942 396.399 5.15419C396.064 5.48264 395.217 5.64687 394.75 5.64687H376.66V13.5582H378.355V7.49942H391.799L395.897 7.47644C396.011 7.4758 396.123 7.44845 396.224 7.39695Z" fill="url(#paint0_linear_5146_26)"/><path d="M395.825 13.5582L390.039 6.81678H392.822L398.841 13.5582H395.825Z" fill="url(#paint1_linear_5146_26)"/><path d="M6.77991 14.2222H22.6155V12.5583H6.77991C5.53455 12.5583 4.04719 11.9469 3.16217 11.0626C2.27715 10.1783 1.71734 8.69221 1.71734 7.44787C1.71734 6.19722 2.27715 4.70792 3.16217 3.82363C4.04719 2.94564 5.53455 2.44211 6.77991 2.44211H22.6155V0.664047H6.77991C4.91504 0.664047 3.31884 1.32727 1.9913 2.65372C0.663767 3.98016 0 5.57822 0 7.44787C0 9.31121 0.663767 10.9061 1.9913 12.2326C3.31884 13.559 4.91504 14.2222 6.77991 14.2222Z" fill="url(#paint2_linear_5146_26)"/><path d="M50.6076 0.664047H48.7736V14.2222H71.3891V12.5401H50.6076V0.664047Z" fill="url(#paint3_linear_5146_26)"/><path d="M97.5472 6.31092H120.163V7.92291H99.3409V12.5416H120.163V14.2222H97.5472V6.31092Z" fill="url(#paint4_linear_5146_26)"/><path d="M97.5472 0.664047H120.163V2.46892H97.5472V0.664047Z" fill="url(#paint5_linear_5146_26)"/><path d="M160.101 0.664047H158.409L146.321 14.2222H149.336L159.264 2.57137L169.202 14.2222H171.933L160.101 0.664047Z" fill="url(#paint6_linear_5146_26)"/><path d="M218.725 0.664047H220.472V14.2222H217.824L200.632 2.41945V14.2222H198.939V0.664047H201.057L218.725 12.557V0.664047Z" fill="url(#paint7_linear_5146_26)"/><path d="M282.05 14.2222H297.885V12.5547H282.05C280.804 12.5547 279.317 11.9469 278.432 11.0626C277.547 10.1783 276.996 8.69221 276.996 7.44787C276.996 6.19722 277.547 4.70792 278.432 3.82363C279.317 2.94564 280.804 2.42468 282.05 2.42468H297.885V0.664047H282.05C280.185 0.664047 278.589 1.32727 277.261 2.65372C275.934 3.98016 275.27 5.57822 275.27 7.44787C275.27 9.31121 275.934 10.9061 277.261 12.2326C278.589 13.559 280.185 14.2222 282.05 14.2222Z" fill="url(#paint8_linear_5146_26)"/><path d="M336.143 0.664047H337.835L349.94 14.2222H346.925L336.987 2.64401L327.059 14.2222H324.044L336.143 0.664047Z" fill="url(#paint9_linear_5146_26)"/><defs><linearGradient id="paint0_linear_5146_26" x1="165.843" y1="16.626" x2="167.278" y2="-10.6492" gradientUnits="userSpaceOnUse"><stop stopColor="#00FF75"/><stop offset="1" stopColor="#00FFB3"/></linearGradient><linearGradient id="paint1_linear_5146_26" x1="214.744" y1="15.9617" x2="216.179" y2="-11.3131" gradientUnits="userSpaceOnUse"><stop stopColor="#00FF75"/><stop offset="1" stopColor="#00FFB3"/></linearGradient><linearGradient id="paint2_linear_5146_26" x1="165.843" y1="16.626" x2="167.278" y2="-10.6492" gradientUnits="userSpaceOnUse"><stop stopColor="#00FF75"/><stop offset="1" stopColor="#00FFB3"/></linearGradient><linearGradient id="paint3_linear_5146_26" x1="165.843" y1="16.626" x2="167.278" y2="-10.6492" gradientUnits="userSpaceOnUse"><stop stopColor="#00FF75"/><stop offset="1" stopColor="#00FFB3"/></linearGradient><linearGradient id="paint4_linear_5146_26" x1="165.843" y1="16.626" x2="167.278" y2="-10.6492" gradientUnits="userSpaceOnUse"><stop stopColor="#00FF75"/><stop offset="1" stopColor="#00FFB3"/></linearGradient><linearGradient id="paint5_linear_5146_26" x1="165.843" y1="16.626" x2="167.278" y2="-10.6492" gradientUnits="userSpaceOnUse"><stop stopColor="#00FF75"/><stop offset="1" stopColor="#00FFB3"/></linearGradient><linearGradient id="paint6_linear_5146_26" x1="165.843" y1="16.626" x2="167.278" y2="-10.6492" gradientUnits="userSpaceOnUse"><stop stopColor="#00FF75"/><stop offset="1" stopColor="#00FFB3"/></linearGradient><linearGradient id="paint7_linear_5146_26" x1="165.843" y1="16.626" x2="167.278" y2="-10.6492" gradientUnits="userSpaceOnUse"><stop stopColor="#00FF75"/><stop offset="1" stopColor="#00FFB3"/></linearGradient><linearGradient id="paint8_linear_5146_26" x1="165.843" y1="16.626" x2="167.278" y2="-10.6492" gradientUnits="userSpaceOnUse"><stop stopColor="#00FF75"/><stop offset="1" stopColor="#00FFB3"/></linearGradient><linearGradient id="paint9_linear_5146_26" x1="165.843" y1="16.626" x2="167.278" y2="-10.6492" gradientUnits="userSpaceOnUse"><stop stopColor="#00FF75"/><stop offset="1" stopColor="#00FFB3"/></linearGradient></defs></svg>

const Logo = ({ className = "", position = "" }: LogoProps) => {
  const store = useStore()
  const logoName = store.appStore.appName
  const routeName = store.appStore.appRouteName

  return (
    <div className={styles.Logo + " " + className}
      data-app-type={store.appStore.appType}
      data-position={position}>
      {/* {store.appStore.appType === "" ? <Link to={'/'} */}
      {/*   className={styles.logoName}> */}
      {/*   {logoName} */}
      {/* </Link> : null} */}


      {store.appStore.appType !== "" ? <>  <Vector /><Link to={'/'} className={styles.routeName}>{routeName}</Link> <Text className={'col-span-2 text-black'}/></>: <Link to={'/'} className={styles.routeName}><TextAuth className={`col-span-2 tablet:max-w-sm max-w-xss`}/></Link>}


    </div>
  )
}

export default observer(Logo)
