import { Pagination } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { LocalRootStore, useLocalStore } from "stores/localStore";

export const PaginationComponent = observer((): any => {
	const localStore = useLocalStore<LocalRootStore>()
	const initCount = localStore.getData?.count
	console.log(localStore);
	const { width } = useViewportSize()
	const nextPageIsNotExist = localStore.getData?.next
	const pageS = localStore.params.getSearchParams.page_size ?? 1
	return React.useMemo(() => {
		// if(!nextPageIsNotExist && width && width < 1000) return
		// if(width && width < 1000) return <Button text={'Load more'} action={() => localStore.loadMore()}/>
		// if(localStore.params.searchParams.page_size === undefined) return <div></div>
		return (
			<Pagination
				classNames={{
					control:
						'hover:border-accent data-[active=true]:border-accent data-[active]:bg-transparent data-[active=true]:text-accent',
				}}
				total={initCount && Math.ceil(initCount / pageS) > 1 ? Math.ceil(initCount / pageS) : 0}
				value={localStore.params.searchParams.page}
				onChange={(value) => localStore.params.setSearchParams({ page: Number(value) })}
				boundaries={1}
				withControls={!!(width && width > 743)}
				siblings={1}
			/>
		)
	}, [width, nextPageIsNotExist, initCount])
})
