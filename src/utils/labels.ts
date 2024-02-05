const label = (key:string|unknown) => {
  const values = {
    admin: "Администратор",
    admin_k: "КА",
    admin_name: "Администратора",
    customer: "Заказчик",
    customer_company_type: "Компания-Заказчик",
    performer_company_type: "Компания-Исполнитель",
    customer_k: "КЗ",
    customer_name: "Заказчика",
    performer: "Исполнитель",
    performer_k: "КИ",
    performer_name: "Исполнителя",
    name: "ФИО",
    phone: "Номер телефона",
    email: "E-mail",
    type: "Тип",
    group: "Тип",
    company: "Компания",
    city: "Город",
    is_active: "Статус",
    timezone: "Часовой пояс"
  }
  //@ts-ignore
  if(values[`${key}`]) return values[`${key}`]
  return key
}

export default label
