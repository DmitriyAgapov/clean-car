import {  Notification } from '@mantine/core'
import React from 'react'

const NotificationCC = ({id, message, title  }: {id: string, title: string, message: string}) => (


    <Notification
        id={'car-created'}
        withCloseButton={true}
        // autoClose: 5000,
        title={'Прайс обновлен'}
        className={'my-notification-class z-[9999] absolute top-12 right-12'}
        loading={false}

    >
        {'Возвращаемся на страницу прайса'}

    </Notification>

)
export default NotificationCC
