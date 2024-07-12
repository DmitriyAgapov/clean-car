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
import { useLocalStore } from 'stores/localStore'

function Cell(props: any) {

    if (props.view) {
        return (
            <div data-label={label(props.key)} data-panel={'cell'} className={styles.tableCell} {...props}>
                {props.children}
            </div>
        )
    }
    return (
        <td data-label={label(props.key)} className={styles.tableCell} {...props}>
            {props.children}
        </td>
    )
}

const RowData = observer((props: any) => {

    const navigate = useNavigate()
    const location = useLocation()
    const localStore = useLocalStore()
    const searchParams = localStore.params.getSearchParams
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
            return props.type == CompanyType.performer
                ? '/performer'
                : props.type == CompanyType.customer
                  ? '/customer'
                  : '/admin'
        }
        return ''
    }, [])

    const handleClick = React.useCallback(() => {

        if (props.query && props.query.rootRoute) {
            return navigate(props.query.rootRoute)
        }
        const route =
            props.style === PanelRouteStyle.financeId
                ? `/account/finance/report/${props.id}`
                : location.pathname + queryCompanyType + querys() + `/${props.id}`

        props.id ? navigate(route, { state: { ...searchParams } }) : void null
    }, [])

    const propsRender = React.useMemo(() => {
        const ar = []

        for (const key in props) {
            if (key == 'bid' || typeof props[key] !== 'object') {
                if (props[key] === 'Активна' ||  key !== "view" && props[key] === true) {
                    ar.push(
                        <Cell key={key} view={props.view} data-label={label(key)}  className={styles.tableCell}>
                            <Chips state={true} />
                        </Cell>,
                    )
                } else if (props[key] === 'Неактивна' || props[key] === false) {
                    ar.push(
                        <Cell key={key} view={props.view} data-label={label(key)} className={styles.tableCell}>
                            <Chips state={false} />
                        </Cell>,
                    )
                } else if (key === 'amount') {
                    ar.push(
                        <Cell key={key} view={props.view} data-label={label(key)} className={styles.tableCell}>
                            <p className={`m-0 cancel-bg ${props[key][0] === '+' ? 'text-accent' : ''}`}>
                                {props[key]}
                            </p>
                        </Cell>,
                    )
                } else if (key === 'bid') {
                    ar.push(
                        <Cell
                            key={key}
                            view={props.view}
                            data-label={label(key)}
                            className={styles.tableCell + ' ' + ' flex '}
                        >
                            <Link
                                to={`/account/bids/${props[key].company}/${props[key].bidId}`}
                                className={`mx-2 h-12 border-b border-b-accent/30 text-center inline-flex items-center max-h-4 justify-center  hover:border-accent text-accent `}
                            >
                                {props[key].bidId || props[key]}
                            </Link>
                        </Cell>,
                    )
                } else if (key === "bid_id") {

                    ar.push(
                        <Cell
                            key={key}
                            view={props.view}
                            data-label={label(key)}
                            className={styles.tableCell + ' ' + ' flex '}
                        >
                            <Link
                                to={`/account/bids/${props.company.id}/${props[key].slice(2)}`}
                                className={`mx-2 h-12 border-b border-b-accent/30 text-center inline-flex items-center max-h-4 justify-center  hover:border-accent text-accent `}
                            >
                                {props[key]}
                            </Link>
                        </Cell>,
                    )
                }
                else if (key === 'status') {
                    ar.push(
                        <Cell key={key} view={props.view} data-label={label(key)} className={styles.tableCell}>
                            <Status variant={props[key]} />
                        </Cell>,
                    )
                } else if (key === 'old_status') {
                    // @ts-ignore
                    ar.push(
                        <Cell key={key} view={props.view} data-label={label(key)} className={styles.tableCell}>
                            <Status

                              // @ts-ignore
                              variant={props[key]}
                                variantForw={props[key]}
                            >
                                {props[key]}
                            </Status>
                        </Cell>,
                    )
                } else if (key === 'new_status') {
                    // @ts-ignore
                    ar.push(
                        <Cell key={key} data-label={label(key)} className={styles.tableCell} view={props.view}>
                            <Status /* @ts-ignore */ variant={props[key]} variantForw={props[key]}>
                                {props[key]}
                            </Status>
                        </Cell>,
                    )
                } else if (props[key] === null) {
                    ar.push(
                        <Cell key={key} data-label={label(key)} className={styles.tableCell} view={props.view}>
                            ""
                        </Cell>,
                    )
                } else if (key == 'style' ||  key == "view") {
                } else if (key == 'tire' || key == 'evac' || key == 'wash' || key == 'total') {
                    // console.log(props);
                    const _ar = ['tire', 'evac', 'wash']
                    const _txtAr = props[key].split('/')
                    const _id = props.attributes?.id

                    ar.push(
                        <Cell key={key} className={styles.tableCell} data-label={label(key)} view={props.view}>
                            {_id && _ar.some((v) => key == v) ? (
                                <a
                                    className={
                                        'm-0 inline-block hover:border-b border-b border-b-active/30 hover:border-b-active'
                                    }
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        navigate(`/account/finance/report/${_id}/${key == 'wash' ? 1 : key == 'tire' ? 2 : key == 'evac' ? 3 : ''}`, { state: { ...searchParams } },)
                                    }}
                                >
                                    <>
                                        {_txtAr[0] + '/ '}
                                        <NumberFormatter
                                            className={`${Number(_txtAr[1].replace(' ₽', '')) > 0 && 'text-accent'} !leading-tight`}
                                            thousandSeparator={' '}
                                            suffix=' ₽'
                                            value={_txtAr[1]}
                                        />
                                    </>
                                </a>
                            ) : (
                                <p className={'m-0'}>
                                    {_txtAr[0]} /{' '}
                                    <NumberFormatter
                                        className={`${Number(_txtAr[1].replace(' ₽', '')) > 0 && 'text-accent'} !leading-tight`}
                                        thousandSeparator={' '}
                                        suffix=' ₽'
                                        value={_txtAr[1]}
                                    />
                                </p>
                            )}
                        </Cell>,
                    )
                } else if (key === 'bids_count') {
                    ar.push(
                        <Cell
                            key={key}
                            colSpan={4}
                            view={props.view}
                            className={styles.tableCell}
                            data-label={label(key)}
                        >
                            <p className={'m-0'}>{props[key]}</p>
                        </Cell>,
                    )
                } else if (key === 'bids_count_v') {
                    ar.push(
                        <Cell
                            key={key}
                            colSpan={3}
                            view={props.view}
                            className={styles.tableCell}
                            data-label={label(key)}
                        >
                            <p className={'m-0'}>{props[key]}</p>
                        </Cell>,
                    )
                } else if (key === 'wrapper') {
                    ar.push(
                        <Cell
                            key={key}
                            colSpan={1000}
                            view={props.view}
                            className={styles.tableCell}
                            data-label={label(key)}
                        >
                            <p className={'m-0'}>{props[key]}</p>
                        </Cell>,
                    )
                } else {
                    if (key !== 'id' && key !== 'p') {
                        ar.push(
                            <Cell key={key} view={props.view} className={styles.tableCell} data-label={label(key)}>
                                <p className={'m-0'}>{props[key]} </p>
                            </Cell>,
                        )
                    }
                }
            } else if (typeof props[key] == 'object') {
                if (key == 'company' || key == 'partner') {
                    ar.push(
                        <Cell
                            key={props[key].name}
                            className={styles.tableCell}
                            view={props.view}
                            data-label={label(props[key].name)}
                        >
                            <LinkStyled
                                variant={ButtonVariant.text}
                                to={`/account/companies/${key == 'company' ? 'customer' : 'performer'}/${props[key].id}`}
                                text={props[key].name}
                                className={
                                    'm-0 inline-block text-xs text-active hover:border-b border-b border-b-active/30 hover:border-b-active'
                                }
                            />
                        </Cell>,
                    )
                }
            }
        }
        return ar
    }, [props])

    const { width } = useViewportSize()
    const [open, setOpen] = useState(false)
    const rowPart = React.useMemo(() => {

        const res: any[] = []
        if (width && width < 745)
            res.push(
                <Cell view={props.view} data-position={'icon-open'} onClick={() => setOpen((prevState) => !prevState)}>
                    <SvgChevron onClick={() => setOpen((prevState) => !prevState)} />
                </Cell>,
            )
        if (width && width < 745 && props?.attributes && props?.attributes?.has_child !== false)
            res.push(
                <Cell view={props.view} data-position='button-mobile'>
                    <Button
                        text={'Подробнее'}
                        variant={ButtonVariant['accent']}
                        className={'w-full col-span-full max-w-xs m-auto mt-4'}
                        size={ButtonSizeType.sm}
                        action={handleClick}
                    />
                </Cell>,
            )
        return res
    }, [width, props])

    if (props.view) {
        return (
            <div
                data-panel={"content_row"}
                onClick={width && width > 744 ? handleClick : () => setOpen((prevState) => !prevState)}
                data-state-mobile={open}
            >
                {propsRender}
                {rowPart}
            </div>
        )
    }
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
