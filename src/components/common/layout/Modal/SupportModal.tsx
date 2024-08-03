import { CloseIcon, FileButton, Image, InputBase, Modal, Text, TextInput, Textarea  } from '@mantine/core'
import React, { useEffect, useState } from 'react'
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
import agent from "utils/agent";
import { useWindowDimensions } from "utils/utils";


const masked = IMask.createMask({
	mask: "+7 000 000 00 00",
	autofix: true,
	// overwrite: true,
	prepare: (appended, masked) => {
		if (appended[0] === '8') {
			return appended.slice(1);
		}
		return appended
	},
});

interface InitValues { name: string, phone: string, text: string, email: string  }

function SupportForm(props:any) {
	const store = useStore();
	const isLoggedIn = store.authStore.isLoggedIn
	useEffect(() => {
		props.thx(false)
	}, []);
	const initialValues= (() => {
		if(isLoggedIn) {
			return ({
				name: store.userStore.myProfileData.user.last_name + " " + store.userStore.myProfileData.user.first_name ?? "",
				phone: store.userStore.myProfileData.user.phone ?? '',
				email: store.userStore.myProfileData.user.email ?? '',
				text: ''
			})
		} else {
			return  ({
				name: '',
				phone: '',
				email: '',
				text: ''
			})
		}
	})()

	const formData = useForm({
		name: 'supportForm',
		initialValues: initialValues,
		validateInputOnBlur: true,
		onValuesChange: (values, previous) => console.log(values),
		validate: yupResolver(CreateUserSchema),

	})

	const handleSubmit = React.useCallback(async (event: any) => {
		event.preventDefault()

		await agent.Utils.sendToSupport(formData.values).then(r => {
			if(r.status === 200) {

				props.thx(true)
				// props.close()
			}
		})
	}, [formData.values])
	if(props.state) return 		<div>Спасибо</div>
	return <form className={'desktop:grid grid-cols-3 gap-x-6 gap-y-2'} onSubmit={(props:any) => handleSubmit(props)}
		onReset={formData.onReset}>
		<TextInput label={'Как вас зовут?'} {...formData.getInputProps('name')} placeholder={'Ваше имя'} />
		<InputBase{...formData.getInputProps('phone')} label={'Телефон'} component={IMaskInput}{...masked} placeholder='+7 000 000 0000' onPaste={(e) => {
			const numb = e.clipboardData.getData('Text');
			formData.setFieldValue('phone', numb)
			return e
		}}/>
		<TextInput label={'E-mail'} {...formData.getInputProps('email')} />
		<Textarea   {...formData.getInputProps('text')} label={'Ваш вопрос'} placeholder="Текст обращения" className={'col-span-full'}/>

		<footer className={'col-span-full mt-12 items-end tablet-max:flex-col-reverse'}>
			<Button className={'col-span-1'}
				variant={ButtonVariant['accent-outline']}
				size={ButtonSizeType.base}
				action={props.close}
				text={'отменить'}
				type={'button'} />
			<Button text={'отправить'}
				type={'submit'}
				variant={ButtonVariant.accent}
				// action={handleSubmit}
			/>
		</footer>
	</form>
}

const SupportModal = (props: { opened: boolean; onClose: () => void; update?: () => void }) => {
	const store = useStore()
	const [thx, setThx] = useState(false)
	const {width} = useWindowDimensions()
	return (
		<Modal.Root size={996}
			fullScreen={!!(width && width < 740)}
			opened={props.opened}
			onClose={props.onClose}
			centered>
			<Modal.Overlay className={'bg-black/80'} />
			<Modal.Content radius={20}
				className={styles.ModalSupport}>
				<Modal.Header className={'static '}>
					<Modal.Title><Heading className={'!mb-0'}
						color={HeadingColor.accent}
						text={	thx ? 'Ваше письмо отправлено' : 'Обращение в службу поддержки'}
						variant={HeadingVariant.h2} /></Modal.Title>
					<Modal.CloseButton className={"hover:rotate-90 hover:bg-transparent transition-all absolute top-5 right-5"}
						icon={<SvgClose className={'close__modal'} />} />
				</Modal.Header>
				<Modal.Body>
					<SupportForm thx={(value:any) => {
						console.log(value)
						setThx(value)}
					} close={props.onClose} state={thx}/>
				</Modal.Body>

			</Modal.Content>
		</Modal.Root>
	)
}
export default observer(SupportModal)
