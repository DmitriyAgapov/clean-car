import React, { useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { CompanyType } from "stores/companyStore";
import label from "utils/labels";
import styles from "components/common/layout/TableWithSort/TableWithSort.module.scss";
import Chips from "components/common/ui/Chips/Chips";
import Status from "components/common/ui/Status/Status";
import { useWindowDimensions } from "utils/utils";
import { SvgChevron } from "components/common/ui/Icon";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { observer } from "mobx-react-lite";
import { BidStatus } from "utils/schema";
import { BidsStatus } from 'stores/bidsStrore'
import { PanelRouteStyle } from "components/common/layout/Panel/Panel";


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
					console.log(props[key]);
					ar.push(<td key={key}
						data-label={label(key)}
						className={styles.tableCell}>
						<Link to={`/account/bids/${props[key].company}/${props[key].bidId}`} className={`-my-4 h-12 text-center flex items-center justify-center hover:underline hover:text-accent `}>{props[key].bidId}</Link>
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
				} 	else 			if (key == "style") {

				} else {
					if (key !== 'id' && key !== 'companyId') {
						ar.push(<td key={key}
							className={styles.tableCell} data-label={label(key)}>

							<p className={'m-0'}>{props[key]}{' '}</p>
						</td>,)
					}
				}
			}
		}
		return ar
	}, [props])

	const {width} = useWindowDimensions()
	const [open, setOpen] = useState(false);

	return (
		<tr className={styles.tableRow} onClick={(width && width > 961) ? handleClick : () => setOpen(prevState => !prevState)} data-state-mobile={open}>
			{propsRender}
			{(width && width < 961) && <td data-position={'icon-open'} onClick={() => setOpen(prevState => !prevState)}>
        <SvgChevron  onClick={() => setOpen(prevState => !prevState)}/>
      </td>}
			{(width && width < 961) && <td data-position="button-mobile" ><Button text={'Подробнее'} variant={ButtonVariant['accent']} className={'w-full col-span-full max-w-xs m-auto mt-4'} size={ButtonSizeType.sm} action={handleClick}/></td>}
		</tr>
	)
})
export default RowData
