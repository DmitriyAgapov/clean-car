const label = (key:string) => {
  const values = {
    phone: "Номер телефона",
    email: "E-mail",
    type: "Тип",
    group: "Тип",
    company: "Компания",
    city: "Город"
  }
  //@ts-ignore
  if(values[`${key}`]) return values[`${key}`]
  return key
}
export default label
