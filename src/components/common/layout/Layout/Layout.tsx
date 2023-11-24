import React, { FC, ReactNode, useEffect } from 'react';
import styles from './Layout.module.scss';
import { useStore } from "../../../../stores/store";
import { observer } from "mobx-react-lite";
import Logo from "components/common/layout/Logo/Logo";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import Header from "components/common/layout/Header/Header";
import Footer from "components/common/layout/Footer/Footer";
import { SvgAuthBg, SvgAuthBgSec } from "components/common/ui/Icon";

interface ChildrenProps  {
	children: ReactNode | ReactNode[]
}

const Layout:FC<ChildrenProps> = ({children}) => {
	const store = useStore()
	useEffect(() => {

	}, [])
	return <div className={styles.Layout} data-theme={store.appStore.appTheme}>
		<Header>
			<Logo/>
			<Button text={'Помощь'} variant={ButtonVariant["accent-outline"]} size={ButtonSizeType.sm}/>
		</Header>
		<main className={"mt-16 tablet:mt-[7.5rem]"}>{children}</main>
		<Footer>
			<div>2023 (c.)</div>
			<div>Политика конфиденциальности</div>
		</Footer>
		<SvgAuthBg className={"authBg"}/>
		<SvgAuthBgSec className={"authBgSec"}/>
	</div>;
};

export default observer(Layout);
