import React from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from 'formik';
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import styles from "./FormAuth.module.scss";
import { useStore } from "stores/store";

const SignupSchema = Yup.object().shape({
	cleanm: Yup.string().email('Invalid email').required('Required'),
	pwd: Yup.string().min(1, 'Пароль короткий').max(16, 'Много символов').required('Укажите пароль')
});

const InnerForm = ({ message }: { message:string }) => {
	const store = useStore();
	return (
		<Formik
			initialValues={{
				cleanm: '',
				pwd: ''
			}}
			validationSchema={SignupSchema}
			onSubmit={(values, actions) => {
				store.authStore.setEmail(values.cleanm)
				store.authStore.setPassword(values.pwd)
				store.authStore.login()
				alert(JSON.stringify(values, null, 2));
				actions.setSubmitting(false);
			}}
		>
			{({submitForm , errors, touched }) =>
			<Form className={styles.FormAuth}>
				<div className={styles.inputGroup}   data-form_error={errors.cleanm && touched.cleanm ? "error" : null}>
					<label htmlFor="email">Ваш email</label>
					<Field
						autoComplete="off"
						id="cleanm"
						name="cleanm"
						type="email"
					/>
					{errors.cleanm && touched.cleanm ? (
						<div className={'form-error'}>{errors.cleanm}</div>
					) : null}
				</div>
				<div className={styles.inputGroup}   data-form_error={errors.pwd && touched.pwd ? "error" : null}>
					<label htmlFor="pswd">Пароль</label>
					<Field
						autoComplete="off"
						id="pwd"
						name="pwd"
						type="password"
					/>
					{errors.pwd && touched.pwd ? (
						<div className={'form-error'}>{errors.cleanm}</div>
					) : null}
				</div>
				<div className={styles.actionGroup}>
					<Button text={"Войти"} size={ButtonSizeType.lg} variant={ButtonVariant.accent} action={event => {event.preventDefault();submitForm()}}/>
					<Button text={"Не помню пароль"} size={ButtonSizeType.lg} variant={ButtonVariant["accent-outline"]} />
				</div>
			</Form>}
		</Formik>
	);
};

const FormAuth = () => {
	return <InnerForm message="Sign up" />;
};

export default FormAuth;
