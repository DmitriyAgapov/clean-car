import { observer } from 'mobx-react-lite'
import { useStore } from 'stores/store'
import React from 'react'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { useParams, useRevalidator } from 'react-router-dom'
import { BidsStatus } from 'stores/bidsStrore'
import { Button as Btn, Menu } from '@mantine/core'
import { SvgMenu } from 'components/common/ui/Icon'
import styles from './BidActions.module.scss'
import { useDisclosure, useViewportSize } from '@mantine/hooks'
import  BidModal  from 'components/common/layout/Modal/BidModal'
import { useSWRConfig } from "swr";

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
    const { mutate } = useSWRConfig()

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


const BidActions = ({ status, update }: {status: BidsStatus, update?: () => void}): JSX.Element => {

  const { height, width } = useViewportSize();
  const { mutate } = useSWRConfig()
  const params = useParams()
  const store = useStore()

  const memoModal = React.useMemo(() => {
    // @ts-ignore
    return  <BidModal update={update} opened={store.bidsStore.modalCurrentState}
      onClose={() => store.bidsStore.setModalCurrentState(false)} />
  }, [store.bidsStore.modalCurrentState]);

  const btnSize = React.useMemo(() => {
    if((width && width < 740)) return ButtonSizeType.lg
    return ButtonSizeType.sm
  }, [width])

  const handleChangeBidStatus = React.useCallback((status: BidsStatus) => {

    (async () => {
      if (params.company_id && params.id) {
        await store.bidsStore.updateBitStatus(params.company_id, params.id, status)
      }
    })().then(() => {
      console.log('status changed');
      // @ts-ignore
      update()

      // @ts-ignore
    }).finally(() => update())
    mutate(`bids/${params.company_id}/${params.id}`)
    mutate(`/bids/${params.id}/photos/`)
  }, [])
    const currentActions = React.useMemo(() => {
        if (store.appStore.appType === "admin") {
          let result:JSX.Element | null
          switch (status) {
            case BidsStatus["Новая"]:
              return (<Button text={"Отменить заявку"}
                  variant={ButtonVariant.accent}
                  size={btnSize}
                  action={() => handleChangeBidStatus(BidsStatus["Отменена"])} />
              )
            case BidsStatus["Разбор"]:
              return (
                <>
                  <Button text={"Отменить"}
                    variant={ButtonVariant["accent-outline"]}
                    size={btnSize}
                    action={() => handleChangeBidStatus(BidsStatus["Отменена"])} />
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
                            action={() => handleChangeBidStatus(BidsStatus["Отменена"])}
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

                case BidsStatus["Ждет подтверждение"]:
                    return BidText.PerformerOzhidaet

                case BidsStatus["Подтверждена"]:
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
                                variant={ButtonVariant.accent}
                                type={'button'}

                                size={btnSize}
                                action={() => {
                                  console.log(store.bidsStore.getPhotos.filter((p:any) => !p.is_before).length === 0);
                                  if(store.bidsStore.getPhotos.filter((p:any) => !p.is_before).length === 0) {
                                    console.log('no photo');
                                    store.bidsStore.setActiveTab("Фото")
                                    store.bidsStore.setModalCurrentState(true)
                                  } else {
                                    handleChangeBidStatus(BidsStatus["Выполнено"])
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
                case BidsStatus["Отменена"]:
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
