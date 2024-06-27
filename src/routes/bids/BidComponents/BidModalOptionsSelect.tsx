import { Input, InputLabel, Modal, Pill, PillsInput, TextInput } from '@mantine/core'
import React from "react";
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { observer } from 'mobx-react-lite'
import { useStore } from "stores/store";
import { useFormContext } from "components/Form/FormCreateBid/FormCreateUpdateBid";
import { Checkbox, FileButton, Group, InputBase, Select,Combobox, Textarea, useCombobox  } from "@mantine/core";
import { action, values as val } from 'mobx'
import { useDisclosure } from "@mantine/hooks";
import styles from "components/common/layout/Modal/Modal.module.scss";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { SvgClose } from "components/common/ui/Icon";
import CarHelper from "components/common/layout/CarHelper/CarHelper";
const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

interface OptionValue {label: string, value: string}
function BidOptionsModal(props: { opened: boolean; onClose: () => void; initVals: any[]}) {

	const { values, touched,  errors, setFieldValue, getInputProps }:any = useFormContext();
	const store = useStore()
	const combobox = useCombobox();
	const test = store.catalogStore.ServiceSubtypesOptions.map((i: any) => ({label: i.name, value: i.id}))

	const [value, setValue] = React.useState<string[]>(values.service_option);
	const [search, setSearch] = React.useState('');

	const handleValueSelect = (val: string) => {
		console.log(test.filter((value:OptionValue) => value.value === val)[0]);
		setValue((current) =>
			current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
		)
	};
	const handleValueRemove = (val: string) =>
		setValue((current) => current.filter((v) => v !== val));

	const handleSaveValues = () => {
		store.bidsStore.formResultSet({
			service_option: value.map((e) => Number(e)),
		})
		values.service_option = val(
		store.bidsStore.formResultsAll.service_option,
	)
		props.onClose.call(null)
	}

	const valuess = value.map((item) => (
		<Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)} className={'bg-gray-2 text-white rounded'}>
			{test.filter((value:OptionValue) => value.value === item)[0].label}
		</Pill>
	));
	const options = test
	.filter((item:{label: string, value: string}) => item.label.toLowerCase().includes(search.toLowerCase().trim()))
	.map((item:{label: string, value: string}) => (
		<Combobox.Option
			value={item.value}
			key={item.value}
			active={value.includes(item.value)}
			onMouseOver={() => combobox.resetSelectedOption()}
		>
			<Group gap="sm">
				<Checkbox
					checked={value.includes(item.value)}
					onChange={() => {}}
					aria-hidden
					tabIndex={-1}
					style={{ pointerEvents: 'none' }}
				/>
				<span>{item.label}</span>
			</Group>
		</Combobox.Option>
	));
	return (
        <Modal.Root size={500} opened={props.opened} onClose={props.onClose} centered lockScroll={false}>
            <Modal.Overlay className={'bg-black/90  backdrop-blur-xl'} />
            <Modal.Content radius={20} className={'pt-12 pb-4 '}>
                <Modal.Header className={'static px-8 bg-transparent'}>
                    <Modal.Title>
                        <Heading
                            text={`Выбрать дополнительные опции`}
                            variant={HeadingVariant.h4}
                            color={HeadingColor.accent}
                            // className={'pb-12'}
                        />
                    </Modal.Title>
                    <Modal.CloseButton
                        className={'hover:rotate-90 hover:bg-transparent transition-all absolute top-5 right-5'}
                        icon={<SvgClose className={'close__modal'} />}
                    />
                </Modal.Header>
                <Modal.Body className={'!p-0'}>
                    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
                        <div className={'static px-8 pb-4'}>
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
                            <div>
                                {/* <PillsInput pointer onClick={() => combobox.toggleDropdown()}> */}
                                <Pill.Group>
                                    {valuess.length > 0 ? valuess : <></>}
                                </Pill.Group>
                                {/* </PillsInput> */}
                            </div>
                        </div>
                        <div className={'px-8 py-4 border-t border-t-gray-2'}>
                            <Combobox.Options>
                                {options.length > 0 ? options : <Combobox.Empty>Не найдено....</Combobox.Empty>}
                            </Combobox.Options>
                        </div>
                    </Combobox>

                    <footer className={'flex !justify-end  px-8 pt-4 border-t border-t-gray-2 gap-4'}>
                        <Button
                            type={'button'}
                            size={ButtonSizeType.xs}
                            text={'Отменить'}
	                        action={props.onClose}
                            variant={ButtonVariant['accent-outline']}
                            className={'!text-sm'}
                        />
                        <Button
                            type={'button'}
                            size={ButtonSizeType.xs}
                            action={handleSaveValues}
                            text={'Сохранить'}
                            variant={ButtonVariant.accent}
                            className={'!text-sm'}
                        />
                    </footer>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    )
}
const BidModalOptionsSelect = () => {
	const store = useStore()
	const { values, touched,  errors, setFieldValue, getInputProps }:any = useFormContext();
	const [opened, { open, close }] = useDisclosure(false)
	const memoModal = React.useMemo(() => {
		return <BidOptionsModal opened={opened} onClose={close} initVals={store.bidsStore.formResult.service_option}/>
	}, [opened])
	return (
				<div className={'col-span-full subgrid'}>
					<InputLabel className={''}>Выберите дополнительные опции (при необходимости)</InputLabel>
					<Button text={'Выбрать доп.опции'} variant={ButtonVariant["accent-outline"]} className={'!normal-case !h-10'} action={open}/>
					<Pill.Group className={`col-span-full mt-4 ${store.bidsStore.formResult.service_option.length === 0 ? "hidden" : ''}`}>
						{/* {valuess.length > 0 ? valuess : <></>} */}
						{store.bidsStore.formResult.service_option.map((item:any) => (
							<Pill key={item}
								// withRemoveButton
								// onRemove={() => handleValueRemove(item)}
								className={'bg-gray-2 text-white rounded'}>
								{store.catalogStore.ServiceSubtypesOptions.map((i: any) => ({label: i.name, value: i.id})).filter((value:OptionValue) => value.value === item)[0].label}
							</Pill>
						))}
					</Pill.Group>
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

export default observer(BidModalOptionsSelect)
