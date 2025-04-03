import { LoadingOverlay, Modal, Select, Text } from "@mantine/core";
import React, { useState } from "react";
import { Observer } from "mobx-react-lite";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from "stores/store";
import styles from "./Modal.module.scss";
import { SvgCleanCarLoader, SvgClose } from "components/common/ui/Icon";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { CompanyType } from "stores/companyStore";
import { useNavigation } from "react-router-dom";
import agent from "utils/agent";

export function PriceCopy(props: { opened: boolean; onClose: () => void; id: number, title: string}) {
	const store = useStore()
	const [formData, setFormData]:any = useState({
		type: store.appStore.appType !== "admin" ? store.userStore.myProfileData.company.company_type === "Клиент" ? CompanyType.customer : CompanyType.performer : CompanyType.performer,
		company: null,
		company_filials: null
	})
	const handleSubmmit = React.useCallback(() => {

		if(formData.company_filials || formData.company) {
			store.appStore.setAppState(true)
			store.priceStore.copyPrice(formData.company_filials ? formData.company_filials : formData.company, props.id)
			.then((res: any) => res).finally(() => {
				props.onClose()
				store.appStore.setAppState(false)
			})
		}
	}, [formData]);
	const {data, isLoading} = agent.Filials.getFilialsNew(`page_size=100`)
	const {data:dataC, isLoading:isLoadingC} = agent.Companies.getOnlyAllCompaniesNew(`page_size=100`)

	const memoFileUpload = React.useMemo(() => {

		// @ts-ignore
		return (
            <Observer
                children={() => (
                    <>
                        <div className={'my-8'}>
                            {/* <LoadingOverlay transitionProps={{ transition: 'fade', duration: 1000, exitDuration: 500 }} classNames={{ */}
                            {/* 	overlay: 'bg-black/80 backdrop-blur-xl' */}
                            {/* }} visible={state} loaderProps={{ children: <SvgCleanCarLoader/> }} /> */}

                            <Select
                                allowDeselect={false}
                                label={'Тип'}
                                disabled={store.appStore.appType !== 'admin'}
                                onOptionSubmit={(e) => {

                                    setFormData((prevState: any) => ({
                                        company: null,
                                        company_filials: null,
                                        type: e,
                                    }))

                                }}
                                defaultValue={formData.type}
                                className={'!flex-initial'}
                                data={[
                                    { label: 'Клиент', value: CompanyType.customer },
                                    { label: 'Партнер', value: CompanyType.performer },
                                ]}
                            />

                            <Select
                                disabled={!dataC || dataC.results.length === 0}
                                searchable
                                clearable
                                onOptionSubmit={(e) =>
                                    setFormData((prevState: any) => ({
                                        ...prevState,
                                        company: e,
                                    }))
                                }
                                // value={formData.company}
                                label={'Компания'}
                                data={dataC &&  dataC.results.length > 0 ? dataC.results.filter((c: any) => c.company_type === formData.type).map((f: any) => ({ label: f.name, value: f.id.toString() })): []}
                            />
                            <Select
	                            //@ts-ignore
                                disabled={!data || data.results.length === 0}
                                searchable
                                clearable
	                            onOptionSubmit={(e) =>
                                    setFormData((prevState: any) => ({ ...prevState, company_filials: e }))
                                }
                                // defaultValue={formData.values.company_id}
                                label={'Филиал'}
	                            //@ts-ignore

                                data={(!isLoading && data && data.results.length > 0) ? store.appStore.appType === "admin" ? data.results.filter((c: any) => c.company_type === formData.type).map((f: any) => ({ label: f.name, value: f.id.toString() })) : data.results.map((f: any) => ({ label: f.name, value: f.id.toString() }))  : []}
                            />
                        </div>

                        <footer className={'col-span-full'}>
                            <Button
                                className={'col-span-1 flex-1'}
                                variant={ButtonVariant['accent-outline']}
                                size={ButtonSizeType.base}
                                action={props.onClose}
                                text={'отменить'}
                                type={'button'}
                            />
                            <Button
                                text={'сохранить'}
                                className={'flex-1'}
                                type={'button'}
                                disabled={!formData.company && !formData.company_filials}
                                variant={ButtonVariant.accent}
                                action={handleSubmmit}
                            />
                        </footer>
                    </>
                )}
            />
        )
	}, [formData, dataC, data])

	return (
		<Modal.Root size={685} opened={props.opened} onClose={props.onClose} centered>
			<Modal.Overlay className={'bg-black/80'}/>
			<Modal.Content radius={20} className={styles.ModalBid}>
				<Modal.Header className={'static '}>
					<Modal.Title><Heading className={'!mb-0'} color={HeadingColor.accent} text={`Дублировать данные ${props.title}`} variant={HeadingVariant.h2}/></Modal.Title>
					<Modal.CloseButton className={"hover:rotate-90 hover:!bg-transparent transition-all absolute top-5 right-5"} icon={<SvgClose className={'close__modal'} />}/>
				</Modal.Header>
				<Modal.Body>
				<Text className={''}>Проверьте данные для дублирования или внесите необходимые корректировки. При изменении филиала информация по услугам будет обновлена</Text>
				{memoFileUpload}
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	)
}
