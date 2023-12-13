import { useStore } from 'stores/store'
import Panel from 'components/common/layout/Panel/Panel'
import Button, { ButtonDirectory, ButtonVariant } from 'components/common/ui/Button/Button'
import Image from 'components/common/ui/Image/Image'
import photo from 'assets/images/userphoto.png'
import { SvgLogout, SvgPencil } from 'components/common/ui/Icon'
import styled from 'styled-components'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserTypeEnum } from 'stores/userStore'

const StyledAccounts = styled.ul`
  margin: 0;
  padding: 0;

  li:not(:last-child) {
    margin-bottom: 2rem;
  }

  li {
    font-size: 0.75rem;
    color: rgba(220, 220, 220, 0.5);
  }

  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    color: black;
    font-family: 'RF Dewi Expanded', sans-serif;
    font-size: 0.75rem;
    border-radius: 50%;
    width: 1.875rem;
    height: 1.875rem;
    margin-right: 1rem;

    &.user__type-admin {
      background: var(--gradient-admin);
    }

    &.user__type-executor {
      background: var(--gradient-executor);
    }

    &.user__type-customer {
      background: var(--gradient-customer);
    }
  }
`
const StyledButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  font-size: 0.75rem;
  cursor: pointer;
  color: rgba(220, 220, 220, 0.5);

  svg {
    width: 1.875rem;
    height: 1.875rem;
    padding: 0.5rem;
    margin-right: 1rem;
  }
`

const UserPortal = ({
  state,
  name,
  company,
  accounts,
  className,
  action,
  ...props
}: {
  action: () => void
  state: boolean
  name: string
  company: string
  accounts: any[]
  className?: string
}) => {
  const store = useStore()
  const navigate = useNavigate()
  if (state)
    return (
      <Panel
        className={
          className +
          ` scale-in-ver-top absolute shadow-1 !m-0 right-0 max-w-xss w-full top-14 p-5 z-50 !bg-[#18191F]`
        }
        {...props}
        footer={
          <Button
            text={'Управление аккаунтом'}
            className={'w-full'}
            action={() => {
              navigate('/account/profile')
            }}
            variant={ButtonVariant.outline}
            directory={ButtonDirectory.directory}
          />
        }
      >
        <div className={'user__photo'}>
          <Image src={photo} alt={''} width={80} height={80} />
          <Button
            className={'bg-accent rounded-full p-1.5 inline-block'}
            text={<SvgPencil />}
            action={() => console.log('edit click')}
            variant={ButtonVariant.icon}
          />
        </div>
        <div className={'user__name'}>{name}</div>
        <div className={'user__company'}>{company}</div>
        <hr />
        <StyledAccounts>
          <li>
            <Link to={'/account'} onClick={() => store.appStore.setAppType(UserTypeEnum.admin)}>
              <span className={'user__type-admin'}>КА</span>Кабинет Администратора
            </Link>
          </li>
          <li>
            <Link to={'/account'} onClick={() => store.appStore.setAppType(UserTypeEnum.executor)}>
              <span className={'user__type-executor'}>КИ</span>Кабинет Исполнителя
            </Link>
          </li>
          <li>
            <Link to={'/account'} onClick={() => store.appStore.setAppType(UserTypeEnum.customer)}>
              <span className={'user__type-customer'}>КЗ</span>Кабинет Заказчика
            </Link>
          </li>
        </StyledAccounts>
        <hr />
        <StyledButton
          className={'button-exit'}
          text={
            <>
              <SvgLogout />
              Выход{' '}
            </>
          }
          action={() => store.authStore.logout()}
          variant={ButtonVariant.icon}
        />
      </Panel>
    )
}
export default UserPortal
