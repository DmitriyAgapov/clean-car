
import React from "react";
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { observer } from 'mobx-react-lite'
import { useStore } from "stores/store";
import { useFormContext } from "components/Form/FormCreateCompany/FormCreateUpdateCompany";
import { Checkbox, InputLabel, Group, Modal, Pill, Combobox, TextInput, useCombobox, ScrollArea } from '@mantine/core'
import { action, values as val } from 'mobx'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { SvgClose } from "components/common/ui/Icon";

interface OptionValue {label: string, value: string}
const CompanyOptionsModal = observer((props: { opened: boolean; onClose: () => void; initVals: any[]}) => {
	const isMobile = useMediaQuery('(max-width: 47rem)');
	const { values, touched,  errors, setFieldValue, getInputProps }:any = useFormContext();
	const store = useStore()
	const combobox = useCombobox();
	const test = store.companyStore.getCompaniesPerformers.map((i: any) => {
		return ({label: i.name,  value: i.id})
	})

	const [value, setValue] = React.useState<string[]>([]);
	const [search, setSearch] = React.useState('');
	React.useEffect(() => {
		setValue(props.initVals)
	}, [props.initVals]);
	const handleValueSelect = (val: string) => {
		setValue((current) =>
			current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
		)
	};
	const handleValueRemove = (val: string) =>
		setValue((current) => current.filter((v) => v !== val));

	const handleSaveValues = () => {
		setFieldValue('performer_company', value.map((e) => Number(e)))
	// 	store.bidsStore.formResultSet({
	// 		service_option: value.map((e) => Number(e)),
	// 	})
	// 	values.service_option = val(
	// 	store.bidsStore.formResultsAll.service_option,
	// )
		props.onClose.call(null)
	}

	const options = test
	.filter((item:{label: string, value: string}) => item.label.toLowerCase().includes(search.toLowerCase().trim()))
	.map((item:{label: string, value: string}) => (
		<Combobox.Option
			className={'!px-1'}
			value={item.value}
			key={item.value}
			active={value.includes(item.value)}
			onMouseOver={() => combobox.resetSelectedOption()}
		>
			<Group gap="sm" className={'flex-nowrap !px-0'}>
				<Checkbox
					checked={value.includes(item.value)}
					onChange={() => {}}
					aria-hidden
					tabIndex={-1}
					style={{ pointerEvents: 'none' }}
				/>
				<span className={'text-white hover:text-accent'}>{item.label}</span>
			</Group>
		</Combobox.Option>
	));
	return (
        <Modal.Root  opened={props.opened} onClose={props.onClose} centered lockScroll={isMobile}  size={isMobile ? "auto" : "lg"} fullScreen={isMobile}>
            <Modal.Overlay className={'bg-black/90  backdrop-blur-xl'} />
            <Modal.Content radius={20} className={'flex flex-col overflow-hidden'} >
                <Modal.Header className={'static px-8 bg-transparent'} >
                    <Modal.Title>
                        <Heading
                            text={`Партнеры`}
                            variant={HeadingVariant.h4}
                            color={HeadingColor.accent}
                            className={'  lg:pt-16 pt-8'}
                        />
                    </Modal.Title>
                    <Modal.CloseButton
                        className={'hover:rotate-90 hover:bg-transparent transition-all absolute top-4 right-4'}
                        icon={<SvgClose className={'close__modal'} />}
                    />
                </Modal.Header>
                <Modal.Body className={'!p-0 flex-1 grid grid-rows-[auto_1fr_auto]'}>
                    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
                        <div className={'static px-7 pb-4'}>
                            <Combobox.EventsTarget>
                                <TextInput
	                                  classNames={{
																			input: '!rounded !bg-black'
	                                  }}
                                    placeholder='Поиск...'
                                    // classNames={{ input: classes.input }}
                                    value={search}
                                    onChange={(event) => {
                                        setSearch(event.currentTarget.value)
                                        combobox.updateSelectedOptionIndex()
                                    }}
                                />
                            </Combobox.EventsTarget>
                            {/* <div> */}
                            {/*     /!* <PillsInput pointer onClick={() => combobox.toggleDropdown()}> *!/ */}
                            {/*     <Pill.Group> */}
                            {/*         {valuess.length > 0 ? valuess : <></>} */}
                            {/*     </Pill.Group> */}
                            {/*     /!* </PillsInput> *!/ */}
                            {/* </div> */}
                        </div>
                        <div className={'px-6 py-4 border-t border-t-gray-2'}>
	                        <ScrollArea.Autosize mah={350} maw={420} mx="auto" w={330}>
		                        <Combobox.Options>
			                        {options.length > 0 ? options : <Combobox.Empty>Не найдено....</Combobox.Empty>}
		                        </Combobox.Options>
	                        </ScrollArea.Autosize >

                        </div>
                    </Combobox>

                    <footer className={'flex tablet-max:justify-stretch  tablet:justify-end pb-4 px-8 pt-4 border-t border-t-gray-2 gap-4'}>
                        <Button
                            type={'button'}
                            size={ButtonSizeType.xs}
                            text={'Отменить'}
	                        action={props.onClose}
                            variant={ButtonVariant['accent-outline']}
                            className={'!text-sm tablet-max:flex-1'}
                        />
                        <Button
                            type={'button'}
                            size={ButtonSizeType.xs}
                            action={handleSaveValues}
                            text={'Сохранить'}
                            variant={ButtonVariant.accent}
                            className={'!text-sm  tablet-max:flex-1'}
                        />
                    </footer>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    )
})
const CompanyModalOptionsSelect = () => {
	const store = useStore()
	const { values, touched,  errors, setFieldValue, getInputProps }:any = useFormContext();
	const [opened, { open, close }] = useDisclosure(false)
	const performers  = store.companyStore.getCompaniesPerformers
	// console.log(performers);
	const _selected_options = values.performer_company;
	// console.log(values);
	const memoModal = React.useMemo(() => {
		return <CompanyOptionsModal opened={opened} onClose={close} initVals={_selected_options}/>
	}, [opened, values.performer_company, _selected_options])
	return (
				<div className={'grid flex-col justify-items-start flex-[1_0_100%] w-full'}>
					<InputLabel className={'my-4'}>Выберите партнеров (при необходимости)</InputLabel>

						{_selected_options.length ? 	<Pill.Group className={`col-span-full mt-4 ${_selected_options.length === 0 ? "hidden" : ''}`}> {_selected_options.map((item:any) => (
							<Pill key={item}
								withRemoveButton
								onRemove={() => {
									const _value =  values.performer_company.filter((v:any) => v !== item)
									setFieldValue('performer_company', _value)
								}}
								className={'bg-gray-2 text-white rounded m-0.5 p-2 h-auto pr-1'}>
								{performers.map((i: any) => ({label: i.name, value: i.id})).filter((value:OptionValue) => value.value === item)[0] && performers.map((i: any) => ({label: i.name, value: i.id})).filter((value:OptionValue) => value.value === item)[0].label}
							</Pill>
						))}
						</Pill.Group> : null}
					<Button text={'Выбрать'}  type={'button'} variant={ButtonVariant["accent-outline"]} className={'!normal-case !h-10 mt-8'} action={open} />
					{/* {values.service_subtype && */}
					{/* 	values.service_subtype !== '0' && */}
					{/* 	values.service_subtype && */}
					{/* 	values.service_subtype !== '0' && */}
					{/* 	store.catalogStore.ServiceSubtypesOptions.length !== 0 && ( */}
					{/* 		<Checkbox.Group */}
					{/* 			className={'col-span-2'} */}
					{/* 			{...getInputProps('service_option')} */}
					{/* 			classNames={{ */}
					{/* 				label: 'text-accent label mb-4', */}
					{/* 				error: 'absolute -bottom-2', */}
					{/* 				root: 'relative pb-4', */}
					{/* 			}} */}
					{/* 			value={store.bidsStore.formResult.service_option.map((o: number) => String(o))} */}
					{/* 			onChange={(vals) => { */}
					{/* 				store.bidsStore.formResultSet({ */}
					{/* 					service_option: vals.map((e) => Number(e)), */}
					{/* 				}) */}
					{/* 				values.service_option = val( */}
					{/* 					store.bidsStore.formResultsAll.service_option, */}
					{/* 				) */}
					{/* 			}} */}
					{/* 			label='Выберите дополнительные опции (при необходимости)' */}
					{/* 		> */}
					{/* 			<Group mt='xs'> */}
					{/* 				{store.catalogStore.ServiceSubtypesOptions.map((i: any) => ( */}
					{/* 					<Checkbox key={i.id} value={String(i.id)} label={i.name} /> */}
					{/* 				))} */}
					{/* 			</Group> */}
					{/* 		</Checkbox.Group> */}
					{/* 	)} */}
					{memoModal}
				</div>
	)
}

export default observer(CompanyModalOptionsSelect)
