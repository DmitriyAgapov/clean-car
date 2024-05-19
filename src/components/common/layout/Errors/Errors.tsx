import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingVariant } from "components/common/ui/Heading/Heading";
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";
import { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { IconNoIntBSvgBgBack, IconNoIntSvgBgBack, IconNotFoundSvg, IconNotFoundSvgBg, IconNotFoundSvgBgBack, SvgAuthBg, SvgAuthBgSec, SvgCleanCarLoader } from "components/common/ui/Icon";
import Layout from 'components/common/layout/Layout/Layout'
import React from 'react'
import { rem } from "@mantine/core";
import styles from "components/common/layout/Layout/Layout.module.scss";
import Header from "components/common/layout/Header/Header";
import Logo from "components/common/layout/Logo/Logo";
import Burger from "components/common/ui/Burger/Burger";
import MobileMenu from "components/common/layout/MobileMenu/MobileMenu";
import Footer from "components/common/layout/Footer/Footer";
import Modal from "components/common/layout/Modal/Modal";
import appStore from "stores/appStore";

const Errors = ({ className }: { className:string }) => {
    return (
        <div
            className={styles.Layout + ' ' + className}
            data-theme={appStore.appTheme}
            data-app-type={appStore.appType}
        >
            <Section type={SectionType.centered}>
                <Panel
                    className={' desktop-max:-mx-4  desktop-max:h-lvh z-20 !border-accent'}
                    header={<Heading variant={HeadingVariant.h1} text={'Нет подключения к интернету'} className={'uppercase !mb-0'} />}
                    variant={PanelVariant.textPadding}
                    background={PanelColor.glass}
                    footerClassName={'!justify-start tablet-max:!px-4'}
                    bodyClassName={'max-w-lg'}
                    footer={
                        <LinkStyled
                            className={'col-span-1'}
                            to={'/'}
                            variant={ButtonVariant['accent-outline']}
                            size={ButtonSizeType.base}
                            action={() => console.log('click')}
                            text={'Вернуться в личный кабинет'}
                            type={'button'}
                        />
                    }
                >
                    <p>Нет соединения. Приносим свои извинения. Вы можете связаться с поддержкой.</p>
                </Panel>

                <IconNoIntSvgBgBack style={{ width: rem(368), height: rem(681) }} className={'absolute desktop:-top-60  z-30 desktop:right-16  desktop-max:left-0  desktop-max:max:right-0 desktop-max:!w-full  desktop-max:top-1/3'} />
                <IconNoIntBSvgBgBack style={{ width: rem(368), height: rem(681) }} className={'absolute desktop:-top-52  z-10  desktop:right-16  desktop-max:left-0  desktop-max:max:right-0 desktop-max:!w-full  desktop-max:top-1/3'} />
            </Section>
            <IconNotFoundSvgBg style={{ width: "100lvw", height: "100lvh" }} className={'absolute top-0 right-0 bottom-0 left-0'} />
        </div>
    )
}

export default Errors
