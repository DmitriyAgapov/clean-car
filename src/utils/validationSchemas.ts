import * as Yup from "yup";
import { CompanyType } from "stores/companyStore";
import { useStore } from "stores/store";
import rootStore from "stores";
import 'yup-phone-lite'

export const SignupSchemaNew = Yup.object().shape({
	first_name: Yup.string().min(2, 'Слишком короткое!').max(50, 'Слишком длинное!').required('Обязательное поле'),
	last_name: Yup.string().min(2, 'Слишком короткое!').max(50, 'Слишком длинное!').required('Обязательное поле'),
	phone: Yup.string()
	.max(16, 'Слишком длинное!')
	.phone('RU', 'Введите правильный номер')
	.required('Требуется номер телефона'),
	email: Yup.string().email('Неверный email').required('Укажите email'),
	city: Yup.string().required('Выберите город'),
	password: Yup.string().required('Введите пароль'),
	password2: Yup.string().oneOf([Yup.ref('password'), ""], 'Пароли не совпадает').required('Введите подтверждение'),
})
export  const SignInSchema = Yup.object().shape({
	email: Yup.string().email('Некорректный email').required('Обязательное поле'),
	password: Yup.string().required('Введите пароль')
})
export const RestorePasswordNewSchema = Yup.object().shape({
	password: Yup.string().required('Введите пароль'),
	password2: Yup.string().oneOf([Yup.ref('password'), ""], 'Пароли не совпадает').required('Введите подтверждение'),
})

export const CreateRestorePwd = Yup.object().shape({
	email: Yup.string().email('Неверный email').required('Обязательное поле'),
})
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
			return schema.required('Обязательное поле')
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
export const UpdateUserProfileSchema = Yup.object().shape({
	first_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
	last_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
	phone: Yup.string().max(16, 'Слишком длинное!').phone('RU', 'Введите правильный номер').required('Обязательное поле'),
	email: Yup.string().email('Неверный email').required('Обязательное поле'),
})

export const CreateModalUserSchema = Yup.object().shape({
	first_name: Yup.string()
	.min(2, 'Too Short!')
	.max(50, 'Too Long!')
	.required('Обязательное поле'),
	last_name: Yup.string()
	.min(2, 'Too Short!')
	.max(50, 'Too Long!')
	.required('Обязательное поле'),
	email: Yup.string().email('Invalid email').required('Обязательное поле'),
	phone: Yup.string().required('Обязательное поле'),
	group: Yup.string().required('Обязательное поле'),
	is_active: Yup.string().required('Обязательное поле'),
	bid_visibility: Yup.string(),
})
export const SelectModalUserSchema = Yup.object().shape({
	users: Yup.string().required('Выберите пользователя')
})

export const CreateCompanySchema = Yup.object().shape({
	company_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
	address: Yup.string().when('address_ready', (address_ready, schema) => {
		if(!address_ready[0]) {
			return schema.oneOf([],'Адрес распознан неверно, уточните адрес').required('Обязательное поле')
		} else {
			return schema
		}
	}),
	legal_address: Yup.string().min(2, 'Слишком короткое!').required('Обязательное поле'),
	inn: Yup.string().required('Обязательное поле').length(10, 'Длина ИНН должна быть 10 символов')
	// .matches(/^[^0].*/,  { message: 'Не может начинаться с 0', excludeEmptyString: true })
	,
	ogrn: Yup.string().required('Обязательное поле').length(13, 'Длина ОГРН должна быть 13 символов')
	// .matches(/^[^0].*/,  { message: 'Не может начинаться с 0', excludeEmptyString: true })
	,
	contacts: Yup.string().min(2, 'Слишком короткое!').required('Обязательное поле'),
	city: Yup.string().required('Обязательное поле'),
	type: Yup.string(),
	address_ready: Yup.boolean().required('Введите верный адрес'),
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
			return schema.typeError('Введите число').min(1, 'Минимум 1%').max(100, 'Максимум').required("Обязательное поле")
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
	// address: Yup.string().when('address_ready', (address_ready, schema) => {
	// 	if(!address_ready[0]) {
	// 		return schema.oneOf([],'Адрес распознан неверно, уточните адрес').required('Обязательное поле')
	// 	} else {
	// 		return schema
	// 	}
	// }),
	// address_ready: Yup.boolean().required('Введите верный адрес'),
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
	brandId: Yup.string().when('brand',  (brand, schema) => {
		console.log(brand, schema);
		if(brand[0]) {
			return schema.nullable()
		} else {
			return schema.required('Нужна модель')
		}
	}),
	brand: Yup.string().nullable(),
	modelName: Yup.string().required('Нужна модель'),
	car_type: Yup.string().required('Выберите тип'),
})
export const CreateCarSchema = Yup.object().shape({
	brand: Yup.string().required('Обязательное поле'),
	model: Yup.string().required('Обязательное поле'),
	height: Yup.number().typeError('Введите число').required('Обязательное поле'),
	radius: Yup.string().required('Обязательное поле'),
	company_id: Yup.string().required('Обязательное поле'),
	number: Yup.string().min(11, 'Неверный номер').required("Обязательное поле")
})
export const CreateBidSchema = Yup.object().shape({
	city: Yup.string().required('Обязательное поле'),
	company: Yup.string().required('Обязательное поле'),
	conductor: Yup.string().required('Обязательное поле'),
	car: Yup.string().min(1).required('Обязательное поле'),
	phone: Yup.string()
})
export const CreateBidSchemaStep2 = Yup.object().shape({
	service_type: Yup.string().required('Обязательное поле'),
	service_subtype: Yup.string().required('Обязательное поле'),
	service_option: Yup.array().when('service_subtype', (service_subtype, schema) => {
		const store = rootStore
		if(!store.catalogStore.CurrentServiceSubtypes.find((el:any) => (Number(service_subtype) === el.id) && el.in_price)) {
			// console.log('option req');
			return schema.min(1, 'Выберите опции')
		} else {
			// console.log('option notreq');
			return schema
		}
	}),
})
export const CreateBidSchemaStep3 = Yup.object().shape({
	address_from: Yup.string().when('service_type', (service_type, schema) => {
		if(service_type[0] === "3") {
			return schema.required("Обязательное поле")
		}
		return schema.nullable()
	}),
	address_to: Yup.string().when('service_type', (service_type, schema) => {
		if(service_type[0] === "3") {
			return schema.required("Обязательное поле")
		}
		return schema.nullable()
	}),
	time: Yup.string().when('important', (important, schema) => {
		console.log(important);
		if(important[0] === "time") {
			return schema.required('Обязательное поле')
		}
		return schema.nullable()
	}),
	secretKey: Yup.string().nullable().when('service_type', (service_type, schema) => {
		if(service_type[0] === "2") {
			return schema.required("Обязательное поле")
		}
		return schema
	}),
	parking: Yup.string().nullable().when('service_type', (service_type, schema) => {
		if(service_type[0] === "2") {
			return schema.required("Обязательное поле")
		}
		return schema
	}),
	truck_type: Yup.string().nullable().when('service_type', (service_type, schema) => {
		if(service_type[0] === "3") {
			return schema.required("Обязательное поле")
		}
		return schema
	}),

	tire_destroyed: Yup.string().nullable().when('service_type', (service_type, schema) => {
		if(service_type[0] === "3") {
			return schema.required("Обязательное поле")
		}
		return schema
	})
})
export const CreateBidSchemaStep4 = Yup.object().shape({
	performer: Yup.number().required('Обязательное поле')
})
export const CreateLimitSchema = Yup.object().shape({
	company: Yup.string().required('Обязательное поле'),
	service_type: Yup.string().required('Обязательное поле'),
})
