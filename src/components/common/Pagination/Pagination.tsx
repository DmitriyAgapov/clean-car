import React, { useEffect, useMemo } from 'react'
import styles from './Pagination.module.scss'
import { SvgChevron } from '../ui/Icon'
import { useParams, useSearchParams } from "react-router-dom";

type PaginationProps = {
    itemsLength: number
    currenPage: number
    action: (value: number) => void
}
const PaginationBtn = ({
    value,
    active,
    action,
}: {
    value: number
    active: boolean
    action: React.EventHandler<never>
}) => (
    <a className={styles.PaginationBtn} data-active={active} onClick={action}>
        {value}
    </a>
)
const PaginationArrow = ({
    forward,
    action,
    disabled,
}: {
    disabled: boolean
    forward: boolean
    action: React.EventHandler<never>
}) => {
    return (
        <a
            className={styles.PaginationArrow + ' ' + (disabled ? 'hidden' : 'inline-flex')}
            data-disabled={disabled}
            onClick={action}
            data-direction-forward={forward}
        >
            <SvgChevron />
        </a>
    )
}
const Pagination = ({ itemsLength, currenPage, action }: PaginationProps) => {
    const pageSize = 10
    const totalPages = Math.ceil(itemsLength / pageSize)

    const handleChangePage = (e: Event) => {
        // @ts-expect-error
        action(e.target.firstChild.data)
    }
    const handleNext = () => {
        if (currenPage < totalPages) {
            action(Number(currenPage) + 1)
        }
    }
    const handlePrev = () => {
        if (currenPage > 1) {
            action(Number(currenPage) - 1)
        }
    }

    const memoPageBtn = useMemo(() => {
        const btns = []
        for (let i = 1; totalPages >= i; i++) {
            btns.push(<PaginationBtn value={i} action={handleChangePage} active={currenPage == i} key={`btn-${i}`} />)
        }
        return btns
    }, [totalPages, currenPage])

    if (itemsLength < 10) return null


    return (
        <div className={styles.Pagination}>
            <PaginationArrow disabled={currenPage == 1} forward={false} action={handlePrev} />
            {memoPageBtn}
            <PaginationArrow disabled={currenPage == totalPages} forward={true} action={handleNext} />
        </div>
    )
}

export default Pagination;
