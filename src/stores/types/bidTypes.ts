interface Author {
	phone: string | null;
	email: string;
	first_name: string;
	last_name: string;
	id: number;
}

interface City {
	id: number;
	name: string;
}
export enum KeysBidCreate {
	"нет секретки"= "нет секретки",
	"есть секретка и ключ" = "есть секретка и ключ",
	"есть секретка и нет ключа" = "есть секретка и нет ключа"
}
interface Company {
	id: number;
	name: string;
	city: City;
	company_type: string;
	is_active: boolean;
	profile_id: number;
	created: string;
	updated: string;
	parent: null;
}

interface Conductor {
	phone: string;
	email: string;
	first_name: string;
	last_name: string;
	id: number;
}

interface Brand {
	id: number;
	name: string;
}

interface Model {
	id: number;
	name: string;
	car_type: string;
	brand: number;
}

interface Car {
	id: number;
	brand: Brand;
	model: Model;
	number: string;
}

interface ServiceType {
	id: number;
	name: string;
}

interface ServiceSubType {
	id: number;
	name: string;
}

interface ServiceOption {
	id: number;
	name: string;
}

export interface CurrentBidProps {
	id: number;
	status: string;
	author: Author;
	performer: Company;
	executor: null;
	company: Company;
	conductor: Conductor;
	car: Car;
	service_type: ServiceType;
	service_subtype: ServiceSubType;
	service_option: ServiceOption[];
	phone: string;
	truck_type: string;
	customer_comment: string;
	performer_comment: null;
	geog_from: null;
	geog_to: null;
	photos?: any;
	schedule: null;
	created: string;
	updated: string;
}
