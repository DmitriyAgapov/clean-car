const label = (key: string | unknown) => {
    const values = {
        admin: 'Администратор',
        admin_k: 'КА',
        admin_name: 'Администратора',
        customer: 'Клиент',
        model: 'Модель',
        model__car_type: 'Тип',
        created: 'Дата/время',
        customer_company_type: 'Клиент',
        description: 'Комментарий',
        // total_amount: "total_amount",
        performer_company_type: 'Партнер',
        customer_k: 'КЗ',
        customer_name: 'Клиента',
        performer: 'Партнер',
        amount: 'Факт/лимит',
        is_day: 'Тип лимита',
        date: 'Дата.',
        company__parent: 'Филиал',
        executor: 'Исполнитель',
        employee: 'Пользователь',
        conductor: 'Водитель',
        number: 'Гос.номер',
        service_type: 'Услуга',
        performer_k: 'КП',
        performer_name: 'Партнера',
        name: 'ФИО',
        phone: 'Номер телефона',
        email: 'E-mail',
        type: 'Тип',
        group: 'Тип',
        company: 'Компания',
        company_name: 'Компания',
        company_type: 'Тип',
        root_company: 'Филиал',
        city: 'Город',
        is_active: 'Статус',
        brand: 'Марка',
        car_type: 'Класс',
        modelName: 'Модель',
        timezone: 'Часовой пояс',
        class1: 'Класс 1',
        class2: 'Класс 2',
        class3: 'Класс 3',
        class4: 'Класс 4',
        class5: 'Класс 5',
        class6: 'Класс 6',
        class7: 'Класс 7',
        class8: 'Класс 8',
        r14: 'R14',
        r15: 'R15',
        r16: 'R16',
        r17: 'R17',
        r18: 'R18',
        r19: 'R19',
        r20: 'R20',
        r2123: 'R21-23',
        r15C: 'R15C',
        r16C: 'R16C',
        tire: 'Шиномонтаж',
        evac: 'Эвакуция',
        wash: 'Мойка',
        total: 'Итог',
        bid: 'Заявка №',
        bid_id: 'Заявка',
        purpose: 'Назначение',
        bonus: 'Бонус/Штраф',
        ts_maker: 'Пользователь',
        car_class: 'Класс',
        service_option: 'Опция',
    }
    //@ts-ignore
    if (values[`${key}`]) return values[`${key}`]
    return key
}
export const routesTitles: {
    title: string
    url: string
    sublevel?: {
        url: string
        title: string
    }[]
}[] = [
    {
        title: 'Политика Конефенциальности',
        url: 'policy',
    },
    {
        title: 'Служба поддержки',
        url: 'support',
    },
    {
        title: 'Управление профилем',
        url: 'profile',
    },
    {
        title: 'Восстановление пароля',
        url: 'restore',
    },
    {
        title: 'Регистрация',
        url: 'register',
    },
    {
        title: 'Авторизация',
        url: '/',
    },




]
export default label
