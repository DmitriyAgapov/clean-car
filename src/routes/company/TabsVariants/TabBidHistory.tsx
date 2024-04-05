import { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";
import Tabs from "components/common/layout/Tabs/Tabs";
import React, { useEffect } from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import { LocalRootStore } from "stores/localStore";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { useStore } from "stores/store";
import Heading, { HeadingVariant } from "components/common/ui/Heading/Heading";
import { client } from "utils/agent";
import dayjs from "dayjs";
import { dateTransformShort } from "utils/utils";
import { Status } from "utils/schema";
import { BidsStatus, ReverseEnum } from "stores/bidsStrore";

const localRootStoreF = new LocalRootStore()

const TabBidHistory = ({companyId, company_type, state }:any) => {
	const store = useStore()
	const params = useParams()
	const localStoreF = useLocalStore<LocalRootStore>(() => localRootStoreF)
	const {isLoading, data} = useSWR([`bid_${params.company_id}_${params.id}-history`,  params.company_id, params.id, localStoreF.params.getSearchParams] , ([url,  company_id,id, args]) => client.bidsHistory({company_id: company_id as string, id: Number(id), ...args}))

	useEffect(() => {
		console.log(data && data.results?.length > 0 && dayjs(data.results?.[0].created).format('DD-MM-YYYY hh:mm'));
		localStoreF.setData = {
			...data,
			results: data?.results?.map((item: any & {rootRoute?: string} ) => ({
				old_status: item.old_status ? item.old_status: " - ",
				new_status: item.new_status ? item.new_status : " - ",
				user: item.user ? item.user.first_name + " " + item.user.last_name : " - ",
				additional_information: item.additional_information ? item.additional_information : " - ",
				created: dayjs(item.created).format('DD-MM-YYYY hh:mm'),
				updated: item.updated ? dayjs(item.updated).format('DD-MM-YYYY hh:mm') : ' - '
			}))}
		localStoreF.setIsLoading = isLoading
	},[data, localStoreF.params.getSearchParams])

	return	<Tabs.Panel  state={state} name={'bid_history'} variant={PanelVariant.dataPadding} background={PanelColor.default} className={'!bg-none !border-0'}  bodyClassName={'!bg-transparent pb-0'}>
<TableWithSortNew		store={localRootStoreF}
	state={isLoading}
	className={'!rounded-none  !bg-none overflow-visible !border-0 row-span-5 pb-0'}
	bodyClassName={'!bg-none !rounded-none !bg-transparent  !pb-0'}
	background={PanelColor.default}
	search={true} filter={true}
	footerClassName={'pt-8 justify-end flex'}
	variant={PanelVariant.default}

	ar={[{label: "Старый статус", name: 'old_status'}, {label: "Новый статус", name: 'new_status'}, {label: 'Пользователь', name: 'user'}, {label: 'Комментарий', name: 'additional_information'}, {label: 'Дата создания', name: 'created'}, {label: 'Дата изменения', name: 'updated'}]}/>

	</Tabs.Panel>
}

export default observer(TabBidHistory)
