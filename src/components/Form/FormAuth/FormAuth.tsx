import React from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from 'formik';
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import styles from "./FormAuth.module.scss";

const SignupSchema = Yup.object().shape({
	cleanm: Yup.string().email('Invalid email').required('Required'),
	pwd: Yup.string().min(1, 'Пароль короткий').max(16, 'Много символов').required('Укажите пароль')
});

const InnerForm = ({ message }: { message:string }) => {

	return (
		<Formik
			initialValues={{
				cleanm: '',
				pwd: ''
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
				<div className={styles.inputGroup}>
					<label htmlFor="pswd">Пароль</label>
					<Field
						autocomplete="off"
						id="pwd"
						name="pwd"
						type="password"
					/>
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
