import React, { useEffect, useState } from "react";
import styles from './UserMenu.module.scss'
import { SvgChevron, SvgNotification } from 'components/common/ui/Icon'
import photo from '../../../../assets/images/userphoto.png'
import { observer } from 'mobx-react-lite'
import { useStore } from 'stores/store'
import styled from 'styled-components'
import UserPortal from 'components/common/layout/UserMenu/UserPortal'
import { useOutsideClick } from 'utils/utils'
import { useInterval } from "@mantine/hooks";
import { Link } from "react-router-dom";
import Image from "components/common/ui/Image/Image";
type UserProps = {
  first_name?: string
  last_name?: string
  status?: string
  photoUrl?: string
  action: (event: any) => void
}
const Notification = observer(() => {
  const store = useStore()
  const interval = useInterval(() => {
    store.bidsStore.loadEventCount()
  }, 8000);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  return (

    <div className={styles.notification} data-msg={store.bidsStore.getEventCount.data?.bid_count !== 0}>
      <Link to={'/account/bids'} >
      <SvgNotification />
      {(store.bidsStore.getEventCount.data && store.bidsStore.getEventCount?.data?.bid_count) ? <span>{store.bidsStore.getEventCount.data.bid_count}</span> : null}
      </Link>
    </div>

  )
})

// @ts-ignore
const UserMenuStyled = styled(UserPortal<UserPortal>)`
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
    border-radius: 50%;
    margin-bottom: 0.625rem;
    padding: 2px;
    &[data-directory="admin"] {
      background: var(--gradient-admin);
    }

    &[data-directory="performer"] {
      background: var(--gradient-performer);
    }

    &[data-directory="customer"] {
      background: var(--gradient-customer);
    }
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

const User = observer(({  action }: UserProps) => {
  const store = useStore()
  const companyType = store.appStore.appType
  const user = store.userStore.userData
  const avatar = user.avatar;

  return (
    <div className={styles.user} onClick={action}>
      <div className={styles.photo} data-directory={companyType}>
        {avatar ? <Image src={avatar} width={40} height={40} alt={''} className={'rounded-full'}/> : <div className={'w-10 h-10 flex justify-center items-center text-black !text-lg'}>{user.first_name[0] + user.last_name[0]}</div>}
      </div>
      <div className={styles.menuName}>
        <div className={styles.name}>
          {/* <span className={styles.first_name}></span> */}
          <span className={styles.last_name}>{(user.last_name && user.last_name.length !== 0) && user.last_name} {user.first_name}</span>
        </div>
        <div className={styles.status}>{store.userStore.myProfileData.permissionGroupName}</div>
      </div>
      <SvgChevron className={styles.svg} />
    </div>
  )
})

const UserMenu = () => {
  const store = useStore()
  const [state, setState] = useState(false)
  const ref = useOutsideClick(() => {
    setState(false)
  })
  // console.log(store.userStore.myProfileData.user.account_bindings[0].group.name);
  return (
    <div className={styles.UserMenu} ref={ref}>
      <Notification />
      <User
        action={() => setState((prevState) => !prevState)}
        // @ts-ignore
        first_name={store.userStore.currentUser?.first_name}
        last_name={store.userStore.currentUser?.last_name}
      />
      <UserMenuStyled
        action={() => setState((prevState) => !prevState)}
        state={state}
        // @ts-ignore
        name={store.userStore.currentUser?.last_name + ' ' + store.userStore.currentUser?.first_name}
        company={store.userStore.myProfileData.user?.account_bindings[0]?.group.name}
        accounts={['admin', 'user']}
      />
    </div>
  )
}

export default observer(UserMenu)
