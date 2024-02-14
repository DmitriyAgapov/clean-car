import * as Yup from "yup";

export const CreateUserSchema = Yup.object().shape({
	first_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
	last_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
	phone: Yup.string().max(16, 'Слишком длинное!').phone('RU', 'Введите правильный номер').required('Обязательное поле'),
	email: Yup.string().email('Неверный email').required('Обязательное поле'),
	group: Yup.string().not(['0']).required('Обязательное поле'),
	company_id: Yup.number().required('Обязательное поле'),
	depend_on: Yup.string().required('Введите тип'),
	is_active: Yup.string()
})
