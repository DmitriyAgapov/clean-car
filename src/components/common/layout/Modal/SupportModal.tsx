import { CloseIcon, FileButton, Image, InputBase, Modal, Text, TextInput, Textarea  } from '@mantine/core'
import React from "react";
import { observer, Observer } from "mobx-react-lite";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from "stores/store";
import styles from "./Modal.module.scss";
import { SvgClose } from "components/common/ui/Icon";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { useForm,} from '@mantine/form'
import { CreateUserSchema } from "utils/validationSchemas";
import { yupResolver } from 'mantine-form-yup-resolver'
import { IMask, IMaskInput } from 'react-imask';


const masked = IMask.createMask({
	mask: '+7 000 00 000 00',
	autofix: true,
	overwrite: true,
	// format: (value:any) => formatPhone(value)
	// ...and other options
});
function SupportForm(props:any) {

	const formData = useForm({
		name: 'supportForm',
		initialValues: {
			name: '',
			phone: '',
			email: '',
			msg: ''
		},
		validateInputOnBlur: true,
		onValuesChange: (values, previous) => console.log(values),
		validate: yupResolver(CreateUserSchema),
	})

	function handleSubmit() {

	}

	return <form className={' desktop:grid grid-cols-3 gap-x-6 gap-y-2'} onSubmit={formData.onSubmit(handleSubmit)}
		onReset={formData.onReset}>
		<TextInput label={'Как вас зовут?'} {...formData.getInputProps('name')} placeholder={'Ваше имя'} />
		<InputBase{...formData.getInputProps('phone')} label={'Телефон'} component={IMaskInput}{...masked} placeholder='+7 000 000 0000' />
		<TextInput label={'E-mail'} {...formData.getInputProps('email')} />
		<Textarea   {...formData.getInputProps('msg')} label={'Ваш вопрос'} placeholder="Текст обращения" className={'col-span-full'}/>

		<footer className={'col-span-full mt-12 items-end'}>
			<Button className={'col-span-1'}
				variant={ButtonVariant['accent-outline']}
				size={ButtonSizeType.base}
				action={props.onClose}
				text={'отменить'}
				type={'button'} />
			<Button text={'отправить'}
				type={'button'}
				variant={ButtonVariant.accent}
				action={handleSubmit} />
		</footer>
	</form>
}

const SupportModal = (props: { opened: boolean; onClose: () => void; update?: () => void }) => {
	const store = useStore()

	return (
		<Modal.Root size={996}
			opened={props.opened}
			onClose={props.onClose}
			centered>
			<Modal.Overlay className={'bg-black/80'} />
			<Modal.Content radius={20}
				className={styles.ModalSupport}>
				<Modal.Header className={'static '}>
					<Modal.Title><Heading className={'!mb-0'}
						color={HeadingColor.accent}
						text={'Обращение в службу поддержки'}
						variant={HeadingVariant.h2} /></Modal.Title>
					<Modal.CloseButton className={"hover:rotate-90 hover:bg-transparent transition-all absolute top-5 right-5"}
						icon={<SvgClose className={'close__modal'} />} />
				</Modal.Header>
				<Modal.Body>
					<SupportForm />

				</Modal.Body>

			</Modal.Content>
		</Modal.Root>
	)
}
export default observer(SupportModal)
