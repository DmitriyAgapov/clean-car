import { observer } from "mobx-react-lite";
import { useStore } from "stores/store";
import React from "react";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useParams, useRevalidator } from "react-router-dom";
import { BidsStatus } from "stores/bidsStrore"
import { Menu, Button as Btn, Modal, Text } from "@mantine/core";
import { SvgMenu } from "components/common/ui/Icon";
import styles from "./BidActions.module.scss"
import { useDisclosure } from "@mantine/hooks";
import { BidModal } from "components/common/layout/Modal/BidModal";
const BidText = {
  CustomerVObrabotke: <p>Исполнитель открыл заявку.Ожидается обратная связь</p>,
  CustomerOzhidaet: <p>Исполнитель внес изменения. Пожалуйста ознакомьтесь с ними и примите решение по заявке.</p>,
  CustomerVRabote:<p>Изменения подтверждены. Исполнитель начал выполнение заявки.</p>,
  CustomerZavershen: <p>Заявка принята заказчиком. Заказ полностью завершен.</p>,
  CustomerRazbor: <p>Выполненная работа отклонена Заказчиком. Происходит разбор причины</p>,
  CustomerOtmenena: <p>Изменения по заявке со стороны Исполнителя не приняты. Заявка отклонена.</p>,
  PerformerOzhidaet: <p>Вы внесли изменения в заявку. Ожидайте ответ от заказчика.</p>,
  PerformerVipolnena: <p>Заявка выполнена. Ожидается обратная связь от заказчика.</p>,
  PerformerResheno: <p>Заявка принята заказчиком. Заказ полностью завершен.</p>,
  PerformerRazbor: <p>Выполненная работа отклонена Заказчиком. Происходит разбор причины.</p>,
  PerformerOtmena: <p>Выполненная работа отклонена Заказчиком. Происходит разбор причины.</p>,



}
export const BidAdminActions = () => {
    const store = useStore()
    let revalidator = useRevalidator()
    const params = useParams()
    const handleChangeBidStatus = React.useCallback((status: BidsStatus) => {
        ;(async () => {
            if (params.company_id && params.id) {
                await store.bidsStore.updateBitStatus(params.company_id, params.id, BidsStatus[`${status}`])
                revalidator.revalidate()
            }
        })()
    }, [])
    const items = React.useMemo(() => {
        const ar = new Set()
        for (let it in BidsStatus) {
            ar.add(it)
        }
        let res: React.JSX.Element[] = []
        ar.forEach((el) =>
            res.push(
                <Menu.Item
                    key={el as string}
                    onClick={() => handleChangeBidStatus(el as BidsStatus)}
                    className={styles.Item}
                    data-variant={el}
                >
                    {el as string}
                </Menu.Item>,
            ),
        )
        return <>{res}</>
    }, [])
    return (
        <Menu shadow='md' width={200}>
            <Menu.Target>
                <Btn className={'bg-white'}>
                    <SvgMenu className={'text-white'} />
                </Btn>
            </Menu.Target>

            <Menu.Dropdown>{items}</Menu.Dropdown>
        </Menu>
    )
}


const BidActions = ({ status }: {status: BidsStatus}): JSX.Element => {
  const [opened, { open, close }] = useDisclosure(false);

  const params = useParams()
  const store = useStore()
  const memoModal = React.useMemo(() => {
    return  <BidModal opened={opened}
      onClose={close} />
  }, [opened]);

  let revalidator = useRevalidator()
  const handleChangeBidStatus = React.useCallback((status: BidsStatus) => {
    (async () => {
      if (params.company_id && params.id) {
        await store.bidsStore.updateBitStatus(params.company_id, params.id, BidsStatus[`${status}`])
        revalidator.revalidate()
      }
    })()
  }, [])
    const currentActions = React.useMemo(() => {
        if (store.appStore.appType === "admin") {
          let result:JSX.Element | null
          switch (status) {
            case "Новая":
              return (<Button text={"Отменить заявку"}
                  variant={ButtonVariant.accent}
                  size={ButtonSizeType.sm}
                  action={() => handleChangeBidStatus("Отменена" as BidsStatus)} />
              )
            case BidsStatus["Разбор"]:
              return (
                <>
                  <Button text={"Отменить"}
                    variant={ButtonVariant["accent-outline"]}
                    size={ButtonSizeType.sm}
                    action={() => handleChangeBidStatus("Отменена" as BidsStatus)} />
                  <Button text={"Завершить"}
                    variant={ButtonVariant.accent}
                    size={ButtonSizeType.sm}
                    action={() => handleChangeBidStatus("Завершена" as BidsStatus)} />
                </>
              )
            default:
              result = null
              break;
          }
          return result
        }
        if (store.appStore.appType === "customer") {
            let result: JSX.Element | null
            switch (status) {

                case BidsStatus["Новая"]:
                    return (
                        <Button
                            text={"Отменить заявку"}
                            variant={ButtonVariant.accent}
                            size={ButtonSizeType.sm}
                            action={() => handleChangeBidStatus("Отменена" as BidsStatus)}
                        />
                    )
                case BidsStatus["Обрабатывается"]:
                    return BidText.CustomerVObrabotke

                case BidsStatus["В работе"]:
                    return BidText.CustomerVRabote

                case BidsStatus["Выполнено"]:
                    return (
                        <>
                            <Button
                                text={"Отказаться"}
                                variant={ButtonVariant["accent-outline"]}
                                size={ButtonSizeType.sm}
                                action={() => handleChangeBidStatus("Разбор" as BidsStatus)}
                            />
                            <Button
                                text={"Принять работу"}
                                variant={ButtonVariant.accent}
                                size={ButtonSizeType.sm}
                                action={() => handleChangeBidStatus("Завершена" as BidsStatus)}
                            />
                        </>
                    )

                case BidsStatus["Ждет подтверждение"]:
                    return BidText.CustomerOzhidaet
                case BidsStatus["Завершена"]:

                    return BidText.CustomerZavershen
                case BidsStatus["Разбор"]:
                  return BidText.CustomerRazbor

                case BidsStatus["Отменена"]:
                  return BidText.CustomerOtmenena

                default:
                    result = null
                    break
            }
            return result
        }

        if (store.appStore.appType === "performer") {
            let result: JSX.Element | null
            switch (status) {
                case BidsStatus["Новая"]:
                    return (
                        <>
                            <Button
                                text={"Отказаться"}
                                variant={ButtonVariant["accent-outline"]}
                                size={ButtonSizeType.sm}
                                action={() => handleChangeBidStatus("Разбор" as BidsStatus)}
                            />

                            <Button
                                text={"Принять заявку"}
                                variant={ButtonVariant.accent}
                                size={ButtonSizeType.sm}
                                action={() => handleChangeBidStatus("В работе" as BidsStatus)}
                            />
                        </>
                    )

                case BidsStatus["Ждет подтверждение"]:
                    return BidText.PerformerOzhidaet

                case BidsStatus["Подтверждена"]:
                  return (
                    <>
                      <Button
                        text={"Отказаться"}
                        variant={ButtonVariant["accent-outline"]}
                        size={ButtonSizeType.sm}
                        action={() => handleChangeBidStatus("Разбор" as BidsStatus)}
                      />

                      <Button
                        text={"Принять заявку"}
                        variant={ButtonVariant.accent}
                        size={ButtonSizeType.sm}
                        action={() => handleChangeBidStatus("В работе" as BidsStatus)}
                      />
                    </>
                  )
                case BidsStatus["В работе"]:
                    return (
                        <>
                            <Button
                                text={"Завершить заявку"}
                                variant={ButtonVariant.accent}
                                size={ButtonSizeType.sm}
                                action={() => {
                                  if(store.bidsStore.CurrentBidPhotosAll.filter((p:any) => !p.is_before).length === 0) {
                                    console.log('no photo');
                                    store.bidsStore.setActiveTab("Фото")
                                    open()
                                  } else {
                                    handleChangeBidStatus("Выполнено" as BidsStatus)
                                  }
                                }}
                            />
                        </>
                    )

                case BidsStatus["Выполнено"]:
                    return BidText.PerformerVipolnena
                case BidsStatus["Обрабатывается"]:
                  return (
                    <>
                      <Button
                        text={"Отказаться"}
                        variant={ButtonVariant["accent-outline"]}
                        size={ButtonSizeType.sm}
                        action={() => handleChangeBidStatus("Разбор" as BidsStatus)}
                      />

                      <Button
                        text={"Принять заявку"}
                        variant={ButtonVariant.accent}
                        size={ButtonSizeType.sm}
                        action={() => handleChangeBidStatus("В работе" as BidsStatus)}
                      />
                    </>
                  )
                case BidsStatus["Завершена"]:
                    return BidText.PerformerResheno
                case BidsStatus["Разбор"]:
                    return BidText.PerformerRazbor
                case BidsStatus["Отменена"]:
                    return BidText.PerformerOtmena
                default:
                    result = null
                    break
            }
            return result
        }
        return null
    }, [store.appStore.appType, status])
    return <div className={styles.bidtext}>{currentActions}{memoModal}</div>
}

export default observer(BidActions)
