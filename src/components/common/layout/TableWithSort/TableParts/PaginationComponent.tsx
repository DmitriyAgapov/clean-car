import { Pagination } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { LocalRootStore, useLocalStore } from "stores/localStore";

export const PaginationComponent = observer((): any => {
	const localStore = useLocalStore<LocalRootStore>()
	let _count = localStore.getData?.count
	const [counts, setCounts] = React.useState(null)
	useEffect(() => {
		// console.log(counts);
		if(_count && counts !== _count) {
			setCounts(_count)
		}

	}, [_count]);
	const { width } = useViewportSize()
	const nextPageIsNotExist = localStore.getData?.next
	const pageS = localStore.params.getSearchParams.page_size ?? 1
	const memoInit = React.useMemo(() => {
		if(counts && Math.ceil(counts / pageS) > 1) return  Math.ceil(counts / pageS)
	}, [counts, pageS])
	// return React.useMemo(() => {
		// if(!nextPageIsNotExist && width && width < 1000) return
		// if(width && width < 1000) return <Button text={'Load more'} action={() => localStore.loadMore()}/>
		// if(localStore.params.searchParams.page_size === undefined) return <div></div>
		if(memoInit) return (
			<Pagination
				classNames={{
					control:
						'hover:border-accent data-[active=true]:border-accent data-[active]:bg-transparent data-[active=true]:text-accent',
				}}
				total={memoInit}
				value={localStore.params.searchParams.page}
				onChange={(value) => localStore.params.setSearchParams({ page: Number(value) })}
				boundaries={1}
				withControls={!!(width && width > 743)}
				siblings={1}
			/>
		)
	// }, [width, nextPageIsNotExist, initCount])
})
