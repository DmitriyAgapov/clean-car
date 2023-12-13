import React, { useState } from 'react'
import styles from './UserMenu.module.scss'
import { SvgChevron, SvgNotification } from 'components/common/ui/Icon'
import photo from '../../../../assets/images/userphoto.png'
import { observer } from 'mobx-react-lite'
import { useStore } from 'stores/store'
import styled from 'styled-components'
import UserPortal from 'components/common/layout/UserMenu/UserPortal'
import { useOutsideClick } from 'utils/utils'

const Notification = () => (
  <div className={styles.notification}>
    <SvgNotification />
    <span>{notificationCount}</span>
  </div>
)
type UserProps = {
  name?: string
  status?: string
  photoUrl?: string
  action: (event: any) => void
}
// @ts-ignore
const UserMenuStyled = styled(UserPortal)`
  border: 1px solid var(--borderPanelColor);
  background-color: var(--bgPanelColor);
  border-radius: 1.25rem;
  display: grid;

  [data-panel='body'] {
    display: grid;
  }
  [data-panel='footer'] {
    margin-top: 1.5rem;
  }
  .user__photo {
    justify-self: center;
    position: relative;
    border: 1px solid var(--accentColor);
    border-radius: 50%;
    margin-bottom: 0.625rem;
    a {
      position: absolute;
      bottom: -.125rem;
      right: -.125rem;
    }
  }
  hr {
    margin: 1.25rem 0;
    border-color: #606163;
  }
  .user__name {
    color: var(--accentColor);
    font-family: 'Montserrat', sans-serif;
    font-size: 0.875rem;
    text-align: center;
    font-weight: 500;
    margin-bottom: 0.125rem;
    line-height: 1.29;
  }
  .user__company {
    font-size: 0.75rem;
    color: #606163;
    text-align: center;
    font-weight: 500;
  }
`

const notificationCount = 2

const User = ({ name, status, photoUrl, action }: UserProps) => {
  return (
    <div className={styles.user} onClick={action}>
      <div className={styles.photo}>
        <img src={photo} width={40} height={40} alt={''} loading={'lazy'} />
      </div>
      <div className={styles.menuName}>
        <div className={styles.name}>{name}</div>
        <div className={styles.status}>Администратор</div>
      </div>
      <SvgChevron className={styles.svg} />
    </div>
  )
}

const UserMenu = () => {
  const store = useStore()
  const [state, setState] = useState(false)
  const ref = useOutsideClick(() => {
    setState(false)
  })

  return (
    <div className={styles.UserMenu} ref={ref}>
      <Notification />
      <User
        action={() => setState((prevState) => !prevState)}
        // @ts-ignore
        name={store.userStore.currentUser?.first_name + ' ' + store.userStore.currentUser?.last_name}
      />
      <UserMenuStyled
        state={state}
        // @ts-ignore
        name={store.userStore.currentUser?.first_name + ' ' + store.userStore.currentUser?.last_name}
        company={'Администратор'}
        accounts={['admin', 'user']}
      />
    </div>
  )
}

export default observer(UserMenu)
