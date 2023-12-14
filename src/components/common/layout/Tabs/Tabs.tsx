import React, { ReactNode, useState } from "react";
import styles from "./Tabs.module.scss";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import DList from "components/common/ui/DList/DList";
import CardSimple from "components/common/layout/Cards/CardSimple/CardSimple";
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";
import { ButtonVariant } from "components/common/ui/Button/Button";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";

const Tab = ({ title, state }: { title: string; state: boolean }) => {
    return (
        <li className={styles.tabHeader} data-state={state}>
            {title}
        </li>
    )
}
const TabHeaderContainer = ({ children }: { children: ReactNode | ReactNode[] | React.ReactElement | string }) => (
    <ul className={styles.containerHeader}>{children}</ul>
)

type TabsProps = {}
const Tabs = ({ data }: any) => {
    const [state, setState] = useState(0);
    console.log(data)
    return (
        <div className={styles.Tabs}>
            <Panel
                className={'col-span-full grid grid-rows-[auto_1fr_auto]'}
                footerClassName={'px-6 pt-2 pb-6 flex  justify-end'}
                header={
                    <TabHeaderContainer>
                        {data.map((d: any, index: number) => (
                            <Tab title={d.label} state={index == 1} key={index + `-tab`} />
                        ))}
                    </TabHeaderContainer>
                }
            >
             <Panel bodyClassName={'grid gap-10 grid-cols-2  grid-flow-col grid-rows-[repeat(5,_minmax(0,_auto))]'} state={1 == state} variant={PanelVariant.withPadding_1_2} background={PanelColor.default}>
                <DList label={'Оплата'} title={data[0].value.payment} />
                <DList label={'ИНН'} title={data[0].value.inn} />
                <DList label={'ОГРН'} title={data[0].value.ogrn} />
                <CardSimple className={'p-5 grid gap-y-9 bg-gray-3 rounded-062 row-span-2'}>
                  <DList label={'ОГРН'} title={data[0].value.ogrn} />
                  <CardSimple.Footer>
                    <LinkStyled variant={ButtonVariant.text} style={{color: 'var(--accentColor)'}} text={'Подробнее'} to={'#'} />
                  </CardSimple.Footer>
                </CardSimple>
               <DList label={'Счет'} title={<>
                 <Heading text={data[0].value.bill + ' ₽'}  variant={HeadingVariant.h2} color={HeadingColor.accent} />
                 <Heading text={data[0].value.overdraft_sum + ' ₽' + ' с овердрафтом'}  variant={HeadingVariant.h4} color={HeadingColor.accent} />
               </>

               }/>
               <DList label={'Адрес'} title={data[0].value.address} />
               <DList label={'Юридический адрес'} title={data[0].value.legal_address} />
               <DList label={'Подключенные услуги'} title={''} />
               <DList label={'Контакты для связи'} title={data[0].value.contacts} />
              </Panel>
            </Panel>
        </div>
    )
}

export default Tabs;
