import * as Yup from "yup";
import { CompanyType } from "stores/companyStore";

export const CreateUserSchema = Yup.object().shape({
	first_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
	last_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
	phone: Yup.string().max(16, 'Слишком длинное!').phone('RU', 'Введите правильный номер').required('Обязательное поле'),
	email: Yup.string().email('Неверный email').required('Обязательное поле'),
	type: Yup.string(),
	group: Yup.string().when('type', (type, schema) => {
		if(type[0] !== "admin") {
			return schema.required('Обязательное поле')
		} else {
			return schema
		}
	}),
	// company_id: Yup.number().when('').required('Обязательное поле'),
	depend_on: Yup.string().when('type', (type, schema) => {
		if(type[0] !== "admin") {
			return schema.required('Введите тип')
		} else {
			return schema
		}
	}),
	is_active: Yup.string()
})

export const CreateCompanySchema = Yup.object().shape({
	company_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
	address: Yup.string().min(2, 'Слишком короткое!').required('Обязательное поле'),
	legal_address: Yup.string().min(2, 'Слишком короткое!').required('Обязательное поле'),
	inn: Yup.string().length(10, 'Длина ИНН должна быть 10 символов').required('Обязательное поле'),
	ogrn: Yup.string().length(13, 'Длина ОГРН должна быть 13 символов').required('Обязательное поле'),
	contacts: Yup.string().min(2, 'Слишком короткое!').required('Обязательное поле'),
	city: Yup.string().required('Обязательное поле'),
	type: Yup.string(),
	overdraft: Yup.string(),
	overdraft_sum: Yup.number().when('overdraft', (overdraft, schema) => {

		if(overdraft[0] === "1") {
			return schema.min(0, 'Сумма должна быть не меньше 0').required('Обязательное поле')
		} else {
			return schema
		}
	}),
	service_percent: Yup.number().when('type', (type, schema) => {
		if(type[0] === CompanyType.performer)
			return schema.min(1, 'Минимум 1%').max(100, 'Максимум').required("Обязательное поле")
		return schema
	}),
	working_time: Yup.string().when('type', (type, schema) => {

		if(type[0] === CompanyType.performer)
			return schema.min(16, 'Укажите время работы правильно').max(16, 'Укажите время работы правильно').required("Обязательное поле")
		return schema
	})
})
export const CreateFilialSchema = Yup.object().shape({
	company_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
	address: Yup.string().min(2, 'Слишком короткое!').required('Обязательное поле'),
	city: Yup.string().required('Обязательное поле'),
	type: Yup.string(),
	company_id: Yup.string().required('Обязательное поле'),
	working_time: Yup.string().when('type', (type, schema) => {
		if(type[0] === CompanyType.performer)
			return schema.min(16, 'Укажите время работы правильно').max(16, 'Укажите время работы правильно').required("Обязательное поле")
		return schema
	})
})
export const CreateCarBrandSchema = Yup.object().shape({
	brandId: Yup.string(),
	brand: Yup.string().nullable(),
	modelName: Yup.string().required('Нужна модель'),
	car_type: Yup.string().required('Выберите тип'),
})
export const CreateCarSchema = Yup.object().shape({
	brand: Yup.string().required('Обязательное поле'),
	model: Yup.string().required('Обязательное поле'),
	height: Yup.number().required('Обязательное поле'),
	radius: Yup.string().required('Обязательное поле'),
	company_id: Yup.string().required('Обязательное поле'),
	number: Yup.string().required("Обязательное поле")
})
