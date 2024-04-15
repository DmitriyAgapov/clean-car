const label = (key:string|unknown) => {
  const values = {
    admin: "Администратор",
    admin_k: "КА",
    admin_name: "Администратора",
    customer: "Заказчик",
    created: "Дата/время",
    customer_company_type: "Компания-Заказчик",
    performer_company_type: "Компания-Партнер",
    customer_k: "КЗ",
    customer_name: "Заказчика",
    performer: "Партнер",
    amount: "Факт/лимит",
    is_day: "Тип лимита",
    company__parent: "Филиал",
    executor: "Исполнитель",
    employee: "Пользователь",
    conductor: "Водитель",
    number: "Гос.номер",
    service_type: "Услуга",
    performer_k: "КП",
    performer_name: "Исполнителя",
    name: "ФИО",
    phone: "Номер телефона",
    email: "E-mail",
    type: "Тип",
    group: "Тип",
    company: "Компания",
    city: "Город",
    is_active: "Статус",
    brand: "Марка",
    car_type: "Класс",
    modelName: "Модель",
    timezone: "Часовой пояс"
  }
  //@ts-ignore
  if(values[`${key}`]) return values[`${key}`]
  return key
}

export default label
