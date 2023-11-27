import React from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from 'formik';
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import styles from "components/Form/FormRegister/FormRegister.module.scss";
import "yup-phone-lite";

const SignupSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(2, 'Слишком короткое!')
		.max(50, 'Слишком длинное!')
		.required('Обязательное поле'),
	lastName: Yup.string()
		.min(2, 'Слишком короткое!')
		.max(50, 'Слишком длинное!')
		.required('Обязательное поле'),
	phone: Yup.string()
		.phone("RU", "Введите правильный номер")
		.required("Требуется номер телефона"),
	cleanm: Yup.string().email('Неверный email').required('Обязательное поле'),
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

				<div className={styles.inputGroup}  data-form_error={errors.firstName && touched.firstName ? "error" : null}>
					<label htmlFor="firstName">Имя?</label>
					<Field
						autocomplete="off"
						id="firstName"
						name="firstName"
						type="text"
					/>
					{errors.firstName && touched.firstName ? (

						<div className={'form-error'}>{errors.firstName}</div>
					) : null}
				</div>
				<div className={styles.inputGroup}  data-form_error={errors.lastName && touched.lastName ? "error" : null}>
					<label htmlFor="lastName">Фамилия?</label>
					<Field
						autocomplete="off"
						id="lastName"
						name="lastName"
						type="text"
					/>
					{errors.lastName && touched.lastName ? (
						<div className={'form-error'}>{errors.lastName}</div>
					) : null}
				</div>

				<div className={styles.inputGroup}  data-form_error={errors.phone && touched.phone ? "error" : null}>
					<label htmlFor="phone">Ваш номер телефона</label>
					<Field
						autocomplete="off"
						id="phone"
						name="phone"
						type="tel"
					/>
					{errors.phone && touched.phone ? (
						<div className={'form-error'}>{errors.phone}</div>
					) : null}
				</div>
				<div className={styles.inputGroup}  data-form_error={errors.cleanm && touched.cleanm ? "error" : null}>
					<label htmlFor="email">Ваш email</label>
					<Field
						autocomplete="off"
						id="cleanm"
						name="cleanm"
						type="email"
					/>
					{errors.cleanm && touched.cleanm ? (
						<div className={'form-error'}>{errors.cleanm}</div>
					) : null}
				</div>
				<div className={styles.twoCol}>
					<div className={styles.inputGroup}   data-form_error={errors.pwd && touched.pwd ? "error" : null}>
						<label htmlFor="pwd">Пароль</label>
						<Field
							autoComplete="off"
							id="pwd"
							name="pwd"
							type="password"
						/>
						{errors.pwd && touched.pwd ? (
							<div className={'form-error'}>{errors.pwd}</div>
						) : null}
					</div>
					<div className={styles.inputGroup}  data-form_error={errors.pwd2 && touched.pwd2 ? "error" : null}>
						<label htmlFor="pwd2">Повторите пароль</label>
						<Field
							autoComplete="off"
							id="pwd2"
							name="pwd2"
							type="password"
						/>
						{errors.pwd2 && touched.pwd2 ? (
							<div className={'form-error'}>{errors.pwd2}</div>
						) : null}
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
