import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingVariant } from "components/common/ui/Heading/Heading";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { IconNoIntBSvgBgBack, IconNoIntSvgBgBack, IconNotFoundSvg, IconNotFoundSvgBg, IconNotFoundSvgBgBack, SvgAuthBg, SvgAuthBgSec, SvgCleanCarLoader } from "components/common/ui/Icon";
import React from 'react'
import { rem } from "@mantine/core";
import styles from "components/common/layout/Layout/Layout.module.scss";
import appStore from "stores/appStore";
import { useNetwork } from "@mantine/hooks";
import agent from "utils/agent";

const Errors = ({ className }: { className:string }) => {
    const networkStatus = useNetwork();
    const checkConnection = async () => {
        return await agent.Auth.login({email: '', password: ''});

    }
    return (
        <div
            className={styles.Layout + ' ' + className}
            data-theme={appStore.appTheme}
            data-app-type={appStore.appType}
        >
            <Section type={SectionType.centered}>
                <Panel
                    className={' desktop-max:-mx-4  desktop-max:h-lvh z-20 !border-accent'}
                    header={<Heading variant={HeadingVariant.h1} text={'Сервер недоступен'} className={'uppercase !mb-0'} />}
                    variant={PanelVariant.textPadding}
                    background={PanelColor.glass}
                    footerClassName={'!justify-start tablet-max:!px-4'}
                    bodyClassName={'max-w-lg'}
                    footer={
                      networkStatus.online ? <Button
                            className={'col-span-1'}
                            href={'#'}
                            variant={ButtonVariant['accent-outline']}
                            size={ButtonSizeType.base}
                            action={checkConnection}
                            text={'Обновить'}
                            type={'button'}
                        /> : ''
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
