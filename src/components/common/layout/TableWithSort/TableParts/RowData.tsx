import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { CompanyType } from "stores/companyStore";
import label from "utils/labels";
import styles from "components/common/layout/TableWithSort/TableWithSort.module.scss";
import Chips from "components/common/ui/Chips/Chips";
import Status from "components/common/ui/Status/Status";
import { useWindowDimensions } from "utils/utils";
import { SvgChevron } from "components/common/ui/Icon";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { observer } from "mobx-react-lite";

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

	const queryCompanyType = React.useCallback(() => {
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
		const route = location.pathname + queryCompanyType() +  querys() + `/${props.id}`

		props.id ? navigate(route) : void null
	},[])

	const propsRender = React.useCallback(() => {
		const ar = []
		for (const key in props) {
			if (typeof props[key] !== 'object') {
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
				} else if(key === 'status') {
					ar.push(<td key={key}
						data-label={label(key)}
						className={styles.tableCell}>
						<Status variant={props[key]} />
					</td>,)
				} else if(props[key] === null) {
					ar.push(<td key={key}
						data-label={label(key)}
						className={styles.tableCell}>

					</td>,)
				} else {
					if (key !== 'id' && key !== 'companyId') {
						ar.push(<td key={key}
							className={styles.tableCell} data-label={label(key)}>
							{' '}
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
			{propsRender()}
			{(width && width < 961) && <td data-position={'icon-open'} onClick={() => setOpen(prevState => !prevState)}>
        <SvgChevron/>
      </td>}
			{(width && width < 961) && <td data-position="button-mobile" ><Button text={'Подробнее'} variant={ButtonVariant['accent']} className={'w-full col-span-full max-w-xs m-auto mt-4'} size={ButtonSizeType.sm} action={handleClick}/></td>}
		</tr>
	)
})
export default RowData
