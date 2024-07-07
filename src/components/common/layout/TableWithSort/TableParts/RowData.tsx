import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { CompanyType } from 'stores/companyStore'
import label from 'utils/labels'
import styles from 'components/common/layout/TableWithSort/TableWithSort.module.scss'
import Chips from 'components/common/ui/Chips/Chips'
import Status from 'components/common/ui/Status/Status'
import { useViewportSize } from '@mantine/hooks'
import { SvgChevron } from 'components/common/ui/Icon'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { observer } from 'mobx-react-lite'
import { PanelRouteStyle } from 'components/common/layout/Panel/Panel'
import { NumberFormatter } from '@mantine/core'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'


const RowData = observer((props: any) => {
	const navigate = useNavigate()
	const location = useLocation()

	const querys = React.useCallback(() => {
		let queryString = ''
		if (props.query) {
			for (const key in props.query) {
				queryString = queryString + `/${props.query[key]}`
			}
			return queryString
		}
		return ''
	}, [])

	const queryCompanyType = React.useMemo(() => {
		let queryString = ''
		if (props.type) {
			return props.type == CompanyType.performer ? '/performer' : props.type == CompanyType.customer ? '/customer' : '/admin'
		}
		return ''
	}, [])
	console.log(props);
	const handleClick = React.useCallback(() => {
		if (props.query && props.query.rootRoute) {
			return navigate(props.query.rootRoute)
		}
		const route = props.style === PanelRouteStyle.financeId ? `/account/finance/report/${props.id}` : location.pathname +  queryCompanyType +  querys() + `/${props.id}`

		props.id ? navigate(route) : void null
	},[])

	const propsRender = React.useMemo(() => {
		const ar = []
		for (const key in props) {

			if (key == "bid"  || typeof props[key] !== 'object' ) {


				if (props[key] === 'Активна' || props[key] === true) {
					ar.push(<td key={key}
						data-label={label(key)}
						className={styles.tableCell}>
						<Chips state={true} />
					</td>,)
				} else if(props[key] === 'Неактивна'  || props[key] === false) {
					ar.push(<td key={key}
						data-label={label(key)}
						className={styles.tableCell}>
						<Chips state={false} />
					</td>,)
				}  else if(key === 'amount') {
					ar.push(<td key={key}
						data-label={label(key)}
						className={styles.tableCell}>
						<p className={`m-0 cancel-bg ${props[key][0] === "+" ? "text-accent" : ""}`}>{props[key]}</p>
					</td>)
				}  else if(key === 'bid') {
					ar.push(<td key={key}
						data-label={label(key)}
						className={styles.tableCell + " " + " flex "}>
						<Link to={`/account/bids/${props[key].company}/${props[key].bidId}`} className={`m-auto h-12 border-b border-b-accent/30 text-center inline-flex items-center max-h-4 justify-center  hover:border-accent text-accent `}>{props[key].bidId}</Link>
					</td>)
				}

				else if (key === "status") {
					ar.push(<td key={key}
						data-label={label(key)}
						className={styles.tableCell}>
						<Status variant={props[key]} />
					</td>,)
				} else if( key === 'old_status') {
					// @ts-ignore
					ar.push(<td key={key}
						data-label={label(key)}
						className={styles.tableCell}>

						<Status
							// @ts-ignore
							variant={props[key]} variantForw={props[key]}>{props[key]}</Status>
					</td>,)
				} else if( key === 'new_status') {
					// @ts-ignore
					ar.push(<td key={key}
						data-label={label(key)}
						className={styles.tableCell}>

						<Status
							// @ts-ignore
							variant={props[key]} variantForw={props[key]}>{props[key]}</Status>
					</td>,)
				} else if(props[key] === null) {
					ar.push(<td key={key}
						data-label={label(key)}
						className={styles.tableCell}>

					</td>,)
				} 	else if (key == "style") {

				} else if (key == "tire" || key == "evac"  || key == "wash" || key == "total") {
					const _txtAr = props[key].split('/')

					ar.push(<td key={key}
						className={styles.tableCell} data-label={label(key)}>
						<p className={'m-0'}>{_txtAr[0]} / <NumberFormatter className={`${Number(_txtAr[1].replace(' ₽', '')) > 0 && "text-accent"} !leading-tight`} thousandSeparator={" "}  suffix=" ₽" value={_txtAr[1]}/></p>
					</td>)
				} else if(key === "bids_count") {

						ar.push(<td key={key} colSpan={4}
							className={styles.tableCell} data-label={label(key)}>

							<p className={'m-0'}>{props[key]}</p>
						</td>,)

				}  else if(key === "wrapper") {

						ar.push(<td key={key} colSpan={1000}
							className={styles.tableCell} data-label={label(key)}>

							<p className={'m-0'}>{props[key]}</p>
						</td>,)

				} else {
					if (key !== 'id' && key !== 'p') {
						ar.push(<td key={key}
							className={styles.tableCell} data-label={label(key)}>

							<p className={'m-0'}>{props[key]}{' '}</p>
						</td>,)
					}
				}
			} else if(typeof props[key] == 'object') {
			if (key == 'company' || key == 'partner' ) {
					ar.push(<td key={props[key].name} className={styles.tableCell} data-label={label(props[key].name)}>
						<LinkStyled variant={ButtonVariant.text} to={`${props[key].id}`} text={props[key].name} className={'m-0 inline-block text-active hover:border-b border-b border-b-active/30 hover:border-b-active'} />
					</td>)
				}
			}
		}
		return ar
	}, [props])

	const {width} = useViewportSize()
	const [open, setOpen] = useState(false);
	const rowPart = React.useMemo(() => {
		const res :any [] = []
		if(width && width < 745) res.push(<td data-position={'icon-open'} onClick={() => setOpen(prevState => !prevState)}>
		<SvgChevron  onClick={() => setOpen(prevState => !prevState)}/>
	</td>)
		if(width && width < 745 && props?.attributes?.has_child !== false)  res.push(<td data-position="button-mobile" ><Button text={'Подробнее'} variant={ButtonVariant['accent']} className={'w-full col-span-full max-w-xs m-auto mt-4'} size={ButtonSizeType.sm} action={handleClick}/></td>)
		return res
	}, [width, props])
	return (
        <tr
            className={styles.tableRow}
            onClick={width && width > 744 ? handleClick : () => setOpen((prevState) => !prevState)}
            data-state-mobile={open}
        >
            {propsRender}
            {rowPart}
        </tr>
    )
})
export default RowData
