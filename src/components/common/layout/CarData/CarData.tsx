import React, { useEffect, useState } from "react";
import styles from "./CarData.module.scss";
import { useStore } from "stores/store";
import TableWithSort from "components/common/layout/TableWithSort/TableWithSort";
import { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import { observer } from "mobx-react-lite";

type CarDataProps = {}
const CarData =  ():React.ReactNode | JSX.Element => {
	const store = useStore()
	const [page, setPage] = useState<any>(1)
	const [pageSize, setPageSize] = useState<any>(10)
	const [searchString, setSearchString] = useState<any>('')
	const nextPage = () => {
		setPage((prevState:number) => prevState + 1)
	}
	const prevPage = () => {
		if(page > 1) setPage((prevState:number) => prevState - 1)
	}
	const loadData = React.useMemo(() => {
		const newParams = searchString.length > 4 ?  { page: page, page_size: pageSize, name: searchString } :  { page: page, page_size: pageSize }
		store.catalogStore.loadCarBrandModelsReference(newParams)

		return store.catalogStore.carBrandModelsReference
	}, [page, pageSize, searchString])

	useEffect(() => {
		store.catalogStore.brandAndModels
		nextPage()
	}, []);

	return (store.catalogStore.carBrandModelsReference && store.catalogStore.carBrandModelsReference.length) && <TableWithSort
    pageSize={pageSize}
    variant={PanelVariant.dataPadding}
    search={true}
		total={10}
    background={PanelColor.glass}
    action={() => nextPage()}
    className={'col-span-full table-groups'}
    filter={false}
    data={store.catalogStore.carBrandModelsReference.map((e) => ({
			name: e.name,
			model: e.model,
			car_class: e.car_class
		}))}
    state={false}
    ar={['Бренд', 'Модель', 'Тип']}
/>}
// @ts-ignore
export default observer(CarData)
