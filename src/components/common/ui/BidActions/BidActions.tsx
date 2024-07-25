import {observer} from "mobx-react-lite"
import { useStore } from "stores/store";
import React from "react";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useNavigate, useNavigation, useParams, useRevalidator } from 'react-router-dom'
import { BidsStatus } from "stores/bidsStrore";
import { Button as Btn, Menu } from "@mantine/core";
import { SvgMenu } from "components/common/ui/Icon";
import styles from "./BidActions.module.scss";
import { useViewportSize } from "@mantine/hooks";
import BidModal from "components/common/layout/Modal/BidModal";
import { useSWRConfig } from "swr";
import { useLocalStore } from "stores/localStore";
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";

const BidText = {
  CustomerVObrabotke: <p>Партнер открыл заявку.Ожидается обратная связь</p>,
  CustomerOzhidaet: <p>Партнер внес изменения. Пожалуйста ознакомьтесь с ними и примите решение по заявке.</p>,
  CustomerVRabote:<p>Изменения подтверждены. Партнер начал выполнение заявки.</p>,
  CustomerZavershen: <p>Заявка принята Клиентом. Заказ полностью завершен.</p>,
  CustomerRazbor: <p>Выполненная работа отклонена Клиентом. Происходит разбор причины</p>,
  CustomerOtmenena: <p>Изменения по заявке со стороны Партнера не приняты. Заявка отклонена.</p>,
  PerformerOzhidaet: <p>Вы внесли изменения в заявку. Ожидайте ответ от клиента.</p>,
  PerformerVipolnena: <p className={'flex-none'}>Заявка выполнена. Ожидается обратная связь от клиента.</p>,
  PerformerResheno: <p>Заявка принята клиентом. Заказ полностью завершен.</p>,
  PerformerRazbor: <p>Выполненная работа отклонена Клиентом. Происходит разбор причины.</p>,
  PerformerOtmena: <p>Выполненная работа отклонена Клиентом. Происходит разбор причины.</p>,



}
export const BidAdminActions = () => {

    const store = useStore()
    let revalidator = useRevalidator()
    const params = useParams()
    const { mutate, cache } = useSWRConfig()


    const handleChangeBidStatus = React.useCallback((status: BidsStatus) => {
        (async () => {
            if (params.company_id && params.id) {
                await store.bidsStore.updateBitStatus(params.company_id, params.id, status)
                  .then(() => mutate('bids')
                    .then(() => console.log('updated')))
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


const BidActions = ({ status, update, link }: {status: BidsStatus, update?: () => void , link?:any}): JSX.Element => {

  const { height, width } = useViewportSize();
  const {cache, mutate } = useSWRConfig()
  const params = useParams()
  const store = useStore()
  const navigate = useNavigate()
  const memoModal = React.useMemo(() => {
    // @ts-ignore
    return  <BidModal update={update} opened={store.bidsStore.modalCurrentState}
      onClose={() => store.bidsStore.setModalCurrentState(false)} />
  }, [store.bidsStore.modalCurrentState]);
  console.log(link);
  const btnSize = React.useMemo(() => {
    if((width && width < 740)) return ButtonSizeType.lg
    return ButtonSizeType.sm
  }, [width])

  const handleChangeBidStatus = React.useCallback((status: BidsStatus) => {
    (async () => {
      if (params.company_id && params.id) {
        await store.bidsStore.updateBitStatus(params.company_id, params.id, status).then(() => {
          mutate(`bids/${params.company_id}/${params.id}`)
          mutate(`/bids/${params.id}/photos/`)

          console.log('status changed');
        })
      }
    })().then(() => {
      // @ts-ignore
    }).finally(update)
    // mutate(`bids/${params.company_id}/${params.id}`)
    // mutate(`/bids/${params.id}/photos/`)
  }, [])
    const currentActions = React.useMemo(() => {
        if (store.appStore.appType === "admin") {
          let result:JSX.Element | null
          switch (status) {
            case BidsStatus["Новая"]:
              return (<Button text={"Отменить заявку"}
                  variant={ButtonVariant.accent}
                  size={btnSize}
                  action={() => handleChangeBidStatus(BidsStatus["Отмена"])} />
              )
            case BidsStatus["Разбор"]:
              return (
                <>
                  <Button text={"Отменить"}
                    variant={ButtonVariant["accent-outline"]}
                    size={btnSize}
                    action={() => handleChangeBidStatus(BidsStatus["Отмена"])} />
                  <Button text={"Завершить"}
                    variant={ButtonVariant.accent}
                    size={btnSize}
                    action={() => handleChangeBidStatus(BidsStatus["Завершена"])} />
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
                            size={btnSize}
                            action={() => handleChangeBidStatus(BidsStatus["Отмена"])}
                        />
                    )
              case BidsStatus["Ждет оплаты"]:
                console.log(link);
                  return <LinkStyled
                    text={"Оплатить заявку"}
                    variant={ButtonVariant.accent}
                    size={btnSize}
                    to={link}
                  />

                case BidsStatus["В обработке"]:
                    return BidText.CustomerVObrabotke

                case BidsStatus["В работе"]:
                    return BidText.CustomerVRabote

                case BidsStatus["Выполнена"]:
                    return (
                        <>
                            <Button
                                text={"Отказаться"}
                                variant={ButtonVariant["accent-outline"]}
                                size={btnSize}
                                action={() => handleChangeBidStatus(BidsStatus["Разбор"])}
                            />
                            <Button
                                text={"Принять работу"}
                                variant={ButtonVariant.accent}
                                size={btnSize}
                                action={() => handleChangeBidStatus(BidsStatus["Завершена"])}
                            />
                        </>
                    )

                case BidsStatus["Ожидает"]:
                    return BidText.CustomerOzhidaet
                case BidsStatus["Завершена"]:

                    return BidText.CustomerZavershen
                case BidsStatus["Разбор"]:
                  return BidText.CustomerRazbor

                case BidsStatus["Отмена"]:
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
                                size={btnSize}
                                action={() => handleChangeBidStatus(BidsStatus["Разбор"])}
                            />

                            <Button
                                text={"Принять заявку"}
                                variant={ButtonVariant.accent}
                                size={btnSize}
                                action={() => handleChangeBidStatus(BidsStatus["В работе"])}
                            />
                        </>
                    )

                case BidsStatus["Ожидает"]:
                    return BidText.PerformerOzhidaet

                case BidsStatus["Согласовано"]:
                  return (
                    <>
                      <Button
                        text={"Отказаться"}
                        variant={ButtonVariant["accent-outline"]}
                        size={btnSize}
                        action={() => handleChangeBidStatus(BidsStatus["Разбор"])}
                      />

                      <Button
                        text={"Принять заявку"}
                        variant={ButtonVariant.accent}
                        size={btnSize}
                        action={() => handleChangeBidStatus(BidsStatus["В работе"])}
                      />
                    </>
                  )
                case BidsStatus["В работе"]:
                    return (
                        <>
                            <Button
                                text={"Завершить заявку"}
                                isOnce={false}
                                variant={ButtonVariant.accent}
                                size={btnSize}
                                action={() => {
                                  console.log(store.bidsStore.getPhotos.filter((p:any) => !p.is_before).length === 0, 'after');
                                  if(store.bidsStore.getPhotos.filter((p:any) => !p.is_before).length === 0) {
                                    console.log('no photo');
                                    store.bidsStore.setActiveTab("Фото")
                                    store.bidsStore.setModalCurrentState(true)
                                  } else {
                                    handleChangeBidStatus(BidsStatus["Выполнена"])
                                  }
                                }}
                            />
                        </>
                    )

                case BidsStatus["Выполнена"]:
                    return (<div className={'grid gap-6'}>{BidText.PerformerVipolnena}<Button text={'Закрыть'} action={() => navigate('/account/bids')} variant={ButtonVariant.accent} size={ButtonSizeType.base}/></div>)
                case BidsStatus["В обработке"]:
                  return (
                    <>
                      <Button
                        text={"Отказаться"}
                        variant={ButtonVariant["accent-outline"]}
                        size={btnSize}
                        action={() => handleChangeBidStatus(BidsStatus["Разбор"])}
                      />

                      <Button
                        text={"Принять заявку"}
                        variant={ButtonVariant.accent}
                        size={btnSize}
                        action={() => handleChangeBidStatus(BidsStatus["В работе"])}
                      />
                    </>
                  )
                case BidsStatus["Завершена"]:
                    return BidText.PerformerResheno
                case BidsStatus["Разбор"]:
                    return BidText.PerformerRazbor
                case BidsStatus["Отмена"]:
                    return BidText.PerformerOtmena
                default:
                    result = null
                    break
            }
            return result
        }
        return null
    }, [store.appStore.appType, status, width])
    return <div className={styles.bidtext}>{currentActions}{memoModal}</div>
}

export default observer(BidActions)
