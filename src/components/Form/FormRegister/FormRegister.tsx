import React from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from 'formik';
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import styles from "components/Form/FormRegister/FormRegister.module.scss";
import "yup-phone-lite";

const SignupSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	lastName: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	phone: Yup.string()
		.phone("RU", "Введите правильный номер")
		.required("Требуется номер телефона"),
	cleanm: Yup.string().email('Invalid email').required('Required'),
	pwd: Yup.string().min(1, 'Пароль короткий').max(16, 'Много символов').required('Укажите пароль'),
	pwd2: Yup.string().min(1, 'Пароль короткий').max(16, 'Много символов').required('Укажите пароль')
});

const InnerForm = () => {

	return (
		<Formik
			initialValues={{
				firstName:'',
				lastName: '',
				phone: '',
				cleanm: '',
				pwd: '',
				pwd2: ''
			}}
			validationSchema={SignupSchema}
			onSubmit={(values, actions) => {
				console.log({ values, actions });
				alert(JSON.stringify(values, null, 2));
				actions.setSubmitting(false);
			}}
		>
			{({submitForm , errors, touched }) =>
			<Form className={styles.FormAuth}>
				<div className={styles.inputGroup}>
					<label htmlFor="firstName">Имя?</label>
					<Field
						autocomplete="off"
						id="firstName"
						name="firstName"
						type="text"
					/>
					{errors.firstName && touched.firstName ? (
						<div>{errors.firstName}</div>
					) : null}
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="lastName">Фамилия?</label>
					<Field
						autocomplete="off"
						id="lastName"
						name="lastName"
						type="text"
					/>
					{errors.lastName && touched.lastName ? (
						<div>{errors.lastName}</div>
					) : null}
				</div>

				<div className={styles.inputGroup}>
					<label htmlFor="phone">Ваш номер телефона</label>
					<Field
						autocomplete="off"
						id="phone"
						name="phone"
						type="tel"
					/>
					{errors.phone && touched.phone ? (
						<div>{errors.phone}</div>
					) : null}
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="email">Ваш email</label>
					<Field
						autocomplete="off"
						id="cleanm"
						name="cleanm"
						type="email"
					/>
					{errors.cleanm && touched.cleanm ? (
						<div>{errors.cleanm}</div>
					) : null}
				</div>
				<div className={styles.twoCol}>
					<div className={styles.inputGroup}>
						<label htmlFor="pwd">Пароль</label>
						<Field
							autocomplete="off"
							id="pwd"
							name="pwd"
							type="password"
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="pwd2">Повторите пароль</label>
						<Field
							autocomplete="off"
							id="pwd2"
							name="pwd2"
							type="password"
						/>
					</div>
				</div>
				<div className={styles.actionGroup}>
					<Button text={"зарегистрироваться"} size={ButtonSizeType.lg} variant={ButtonVariant.accent} action={event => {event.preventDefault();submitForm()}}/>
				</div>
				<div className={styles.text}>
					Нажимая «Зарегистрироваться», вы принимаете пользовательское соглашение и политику конфиденциальности
				</div>
			</Form>}
		</Formik>
	);
};

const FormRegister = () => {
	return <InnerForm  />;
};

export default FormRegister;
