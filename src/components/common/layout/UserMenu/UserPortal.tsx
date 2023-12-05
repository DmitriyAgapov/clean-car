import { useStore } from "stores/store";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Button, { ButtonDirectory, ButtonVariant } from "components/common/ui/Button/Button";
import Image from "components/common/ui/Image/Image";
import photo from "assets/images/userphoto.png";
import { SvgLogout, SvgPencil } from "components/common/ui/Icon";
import styled from "styled-components";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useOutsideClick } from "utils/utils";
const StyledAccounts = styled.ul`
	margin: 0;
	padding: 0;
  
	li:not(:last-child) {
	margin-bottom: 2rem;
	}
  li {
	font-size: .75rem;
	color: rgba(220,220,220,.5);
  }
  span {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	line-height: 1;
	color: black;
	font-family: 'RF Dewi Expanded', sans-serif;
	font-size: .75rem;
	border-radius: 50%;
	width: 30px;
	height: 30px;
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
  font-size: .75rem;
  color: rgba(220,220,220,.5);
  svg {
    width: 30px;
    height: 30px;
	padding: .5rem;
    margin-right: 1rem;
  }
`

const UserPortal = ({state, name, company, accounts, className, action, ...props}:{action: () => void, state: boolean, name: string, company: string, accounts: any[], className?: string}) => {
	const store = useStore()
	if(state) return <Panel className={className + ` scale-in-ver-top absolute shadow-1 !m-0 right-0 max-w-[260px] w-full top-14 p-5 z-50 !bg-[#18191F]`}
		{...props}
		footer={<Button text={'Управление аккаунтом'} className={"w-full"} action={(event) => console.log('acc')} variant={ButtonVariant.outline} directory={ButtonDirectory.executor}/>}
	>
		<div className={'user__photo'}>
			<Image src={photo} alt={''} width={80} height={80}/>
			<Button className={'bg-accent rounded-full p-1.5 inline-block'} text={<SvgPencil />} action={() => console.log('edit click')} variant={ButtonVariant.icon}/>
		</div>
		<div className={'user__name'}>{name}</div>
		<div className={'user__company'}>{company}</div>
		<hr/>
		<StyledAccounts>
			<li><Link to={'#'}><span className={"user__type-admin"}>КА</span>Кабинет Администратора</Link></li>
			<li><Link to={'#'}><span className={"user__type-executor"}>КИ</span>Кабинет Исполнителя</Link></li>
			<li><Link to={'#'}><span className={"user__type-customer"}>КИ</span>Кабинет Заказчика</Link></li>
		</StyledAccounts>
		<hr/>
		<StyledButton className={'button-exit'} text={<><SvgLogout/>Выход</>} action={() => store.authStore.logout()} variant={ButtonVariant.icon} />

	</Panel>
}
export default UserPortal
