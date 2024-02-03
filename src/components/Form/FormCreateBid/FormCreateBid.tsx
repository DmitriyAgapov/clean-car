import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import 'yup-phone-lite'
import { useStore } from 'stores/store'
import { useNavigate } from 'react-router-dom'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { Step } from 'components/common/layout/Step/StepPure'
import Progress from 'components/common/ui/Progress/Progress'
import { TimeInput } from '@mantine/dates'
import { Observer } from 'mobx-react-lite'
import { Checkbox, CloseIcon, FileButton, Group, Image, InputBase, InputLabel, Select, Textarea } from '@mantine/core'
import { action, values as val } from 'mobx'
import { IMaskInput } from 'react-imask'
import { InputAutocompleteWithCity } from 'components/common/ui/InputAutocomplete/InputAutocompleteWithCityDependency'
import MapWithDots from 'components/common/Map/Map'
import DList from 'components/common/ui/DList/DList'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import AddOption from "routes/reference/Services/addOption";
import agent from "utils/agent";
import { notifications } from "@mantine/notifications";
import { SvgClose } from "components/common/ui/Icon";

const SignupSchema = Yup.object().shape({
    brand: Yup.string().required('Обязательное поле'),
    model: Yup.string().required('Обязательное поле'),
    number: Yup.string().required('Обязательное поле'),
    radius: Yup.string().required('Обязательное поле'),
    city: Yup.string().required('Обязательное поле'),
})
const FormCreateBid = ({ user, edit }: any) => {
    const store = useStore()
    const [step, setStep] = useState(1)
    const [animate, setAnimate] = useState(false)
  const bid = store.bidsStore.CurrentBid
  const navigate = useNavigate()
    const { step1, step2 ,step3, step4, step5} = store.bidsStore.formDataAll

    const availablePerformers = store.bidsStore.AvailablePerformers
    const changeStep = (step?: number) => {
        setAnimate((prevState) => !prevState)
        setTimeout(() => {
            setAnimate(false)
            setStep((prevState) => (step ? step : (prevState += 1)))
        }, 1200)
    }
    const memoFileUpload = React.useMemo(() => {
      return <Observer
        children={() => (<div className={'grid grid-cols-3  gap-4 col-span-full'}>
          <InputLabel className={'col-span-2'}>Фотографии До</InputLabel>

          <div className={'flex col-span-2  gap-3 items-center justify-items-center'}>
            {store.bidsStore.photo.photosPreviewAr.map(
              (item: any, index: number) => (
                <div className={'group max-w-[6rem] relative'}>
                  <CloseIcon
                    onClick={() => store.bidsStore.removeFile(index)}
                    className={
                      'bg-white cursor-pointer group-hover:text-white group-hover:bg-accent  border-1 text-gray-2 absolute right-0 top-0 block rounded-full !w-4 !h-4'
                    }
                  />
                  <Image src={item} alt={String(index)} />
                </div>
              ),
            )}
          </div>


          <p className={'col-span-2'}>Пожалуйста, прикрепите минимум 2 фото</p>

          <FileButton onChange={handleChangeFile} multiple accept='image/png,image/jpeg'>
            {(props) => (
              <Button
                className={'col-span-1'}
                variant={ButtonVariant['accent-outline']}
                size={ButtonSizeType.sm}
                {...props}
                text={'Добавить фото'}
              ></Button>
            )}
          </FileButton>
        </div>)}   />
    }, [])
    const handleChangeFile = React.useCallback((e: any) => {
        store.bidsStore.addFile(e)
    }, [])
    return (
      <>
        <Formik
            initialValues={{
                car_type: '',
                number: '',
                height: '',
                radius: '',
                limit: '',
                is_active: false,
                brand: '',
                model: '',
                employees: [],
                city: '',
                customer: '',
                user: '',
                service: '',
                subtype: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, FormikHelpers) => {

                changeStep(2)
                // store.formStore.formSendDataUser('formCreateUser', data)
            }}
        >
            {({ errors, setValues, touched, values, status, isValid, isValidating,
            }) => (
                <Form
                    style={{
                        display: 'flex',
                        gridColumn: '1/-1',
                        borderRadius: '1.5rem',
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                    className={'form_with_progress '}
                >
                    <Progress total={5} current={step} />
                    <Step
                        step={step}
                        animate={animate}
                        action={() => console.log('step 1')}
                        action1={() => console.log('step 1')}
                        stepIndex={1}
                        bodyClassName={'grid grid-cols-3 gap-4'}
                        footer={<><Button text={'Отменить'} action={() => navigate(-1)} className={'float-right lg:mb-0 mb-5'} variant={ButtonVariant['accent-outline']} /><Button type={Object.keys(errors).length > 0 ? 'button' : 'text'} disabled={Object.keys(errors).length > 0} text={'Дальше'} action={() => {/* store.formStore.setFormDataCreateCar(values) */changeStep()}}/* action={() => console.log(values)} */ className={'float-right'} variant={ButtonVariant.accent} /></>}
                        header={<><Heading text={step1.title} color={HeadingColor.accent} variant={HeadingVariant.h2} /><div className={'text-base'}>{step1.description}</div></>}
                    >
                        <>
                            <Observer
                                children={() => (
                                    <Select
                                        required
                                        clearable

                                        label={step1.fields[0].label}
                                        searchable
                                        value={store.bidsStore.formResult.city !== 0 ? String(store.bidsStore.formResult.city) : null}
                                        data={val(store.catalogStore.cities).map((i: any) => ({
                                            label: i.name,
                                            value: String(i.id),
                                        }))}
                                    />
                                )}
                            />
                            <hr className={'col-span-full border-transparent my-2'} />
                            {/* //todo: map not admin values to select */}
                            <Observer
                                children={() => (
                                    <Select
                                        clearable value={store.bidsStore.formResult.company !== 0 ? String(store.bidsStore.formResult.company) : ""}
                                        label={step1.fields[1].label}
                                        onChange={(e) => {
                                          if(e === null) {
                                            store.bidsStore.formResultSet({company: 0})
                                            console.log(e, '0')
                                          }
                                        }}
                                        onOptionSubmit={(value:any) => {
                                          if(value !== 0) {
                                          store.bidsStore.formResultSet({ company: Number(value) })
                                        } else {
                                            store.bidsStore.formResultSet({ company: 0 })
                                          }
                                        }}
                                        searchable
                                        data={store.userStore.isAdmin ? store.companyStore.companies
                                                      .filter((c: any) => c.company_type === 'Компания-Заказчик')
                                                      .map((c: any) => ({
                                                          label: c.name,
                                                          value: String(c.id),
                                                      }))
                                                : store.companyStore.myCompany.company
                                        }
                                    />
                                )}
                            />
                            <Observer
                                children={() => (
                                    <Select
                                        required
                                        label={step1.fields[2].label}
                                        searchable
                                      value={store.bidsStore.formResult.conductor !== 0 ? String(store.bidsStore.formResult.conductor) : null}
                                        onChange={(value) => store.bidsStore.formResultSet({ conductor: Number(value) })}
                                        disabled={
                                            store.bidsStore.formResult.company === 0 ||
                                            store.usersStore.currentCompanyUsers.length === 0
                                        }
                                        data={store.usersStore.currentCompanyUsers.map((c: any) => ({
                                            label: c.employee.first_name,
                                            value: String(c.employee.id),
                                        }))}
                                    />
                                )}
                            />
                            <InputBase
                              value={(store.bidsStore.formResultsAll.phone !== "")  ? store.bidsStore.formResultsAll.phone : ''}
                              onAccept={(value:any, mask:any) => {
                                store.bidsStore.formResultSet({ phone: value })
                              }}
                                label={step1.fields[3].label}
                                component={IMaskInput}
                                mask='+70000000000'
                                placeholder='+70000000000'


                            />
                            <Observer
                                children={() => <Select
                                              value={store.bidsStore.formResult.car ? String(store.bidsStore.formResult.car) : null}
                                              onChange={(value) => store.bidsStore.formResultSet({ car: Number(value) })}
                                                /* @ts-ignore */
                                                disabled={store.carStore.getCompanyCars.cars.count === 0} label={step1.fields[4].label} searchable data={store.carStore.cars.length !== 0 ? store.carStore.getCompanyCars.cars.results.map((c: any) => ({ label: `${c.brand.name}  ${c.model.name}  ${c.number}`, value: String(c.id), })) : ['']} />

                                }
                            />
                            <hr className={'col-span-full border-transparent my-2'} />
                          {memoFileUpload}
                        </>
                    </Step>
                    <Step
                        step={step}
                        animate={animate}
                        action={() => console.log('step 1')}
                        action1={() => console.log('step 1')}
                        stepIndex={2}
                        bodyClassName={'grid grid-cols-3 gap-4 content-start'}
                        footerClassName={'flex-1 w-full justify-stretch'}
                        header={
                            <>
                                <Heading text={step2.title} color={HeadingColor.accent} variant={HeadingVariant.h2} />
                                <div className={'text-base'}>{step2.description}</div>
                            </>
                        }
                        footer={
                            <>
                                <Button
                                    text={'Назад'}
                                    action={() => setStep((prevState: number) => prevState - 1)}
                                    className={'lg:mb-0 mr-auto'}
                                    variant={ButtonVariant['accent-outline']}
                                />
                                <Button
                                    text={'Отменить'}
                                    action={() => navigate(-1)}
                                    className={'float-right lg:mb-0 mb-5'}
                                    variant={ButtonVariant['accent-outline']}
                                />
                                <Button
                                    type={Object.keys(errors).length > 0 ? 'button' : 'text'}
                                    disabled={Object.keys(errors).length > 0}
                                    text={'Дальше'}
                                    action={() => {
                                        /* store.formStore.setFormDataCreateCar(values) */ changeStep()
                                    }}
                                    /* action={() => console.log(values)} */ className={'float-right'}
                                    variant={ButtonVariant.accent}
                                />
                            </>
                        }
                    >
                        <>
                            <Observer
                                children={() => (
                                    <Select
                                        required
                                        label={step2.fields[0].label}
                                        searchable
                                      value={String(store.bidsStore.formResult.service_type)}
                                        disabled={store.catalogStore.services.size === 0}
                                        name={step2.fields[0].name}
                                        onChange={(value) => {
                                            action(() => (store.catalogStore.currentService = Number(value)))
                                            store.bidsStore.formResultSet({ service_type: Number(value) })
                                        }}
                                        data={val(store.catalogStore.services).map((i: any) => ({
                                            label: i.name,
                                            value: String(i.id),
                                        }))}
                                    />
                                )}
                            />
                            <Observer
                                children={() => {
                                    return (
                                        <Select
                                            required
                                            label={step2.fields[1].label}
                                            searchable
                                            disabled={store.bidsStore.formResult.service_type === 0}
                                            value={
                                                store.bidsStore.formResult.service_subtype !== 0
                                                    ? String(store.bidsStore.formResult.service_subtype)
                                                    : String(
                                                          store.catalogStore.getSubtypeByServiceId(
                                                              store.catalogStore.currentService,
                                                          ).id,
                                                      )
                                            }
                                            onChange={(value) => {
                                                store.bidsStore.formResultSet({ service_subtype: Number(value) })
                                            }}
                                            name={step2.fields[1].name}
                                            data={
                                                store.catalogStore.currentService !== 0
                                                    ? val(store.catalogStore.currentServiceSubtypes).map((i: any) => ({
                                                          label: i.name,
                                                          value: String(i.id),
                                                      }))
                                                    : ['']
                                            }
                                        />
                                    )
                                }}
                            />
                          <Observer
                            children={() => <Checkbox.Group
                                className={'col-span-2'}
                                // value={store.bidsStore.formResult.options.map((i:any) => String(i))}
                                classNames={{
                                    label: 'text-accent label mb-4',
                                }}
                              value={store.bidsStore.formResult.service_option.map((o:number) => String(o))}
                              onChange={(values) =>
                                store.bidsStore.formResultSet({service_option: values.map(e => Number(e))})
                                }
                                label='Выберите дополнительные опции (при необходимости)'
                            >

                                <Group mt='xs' >
                                {store.catalogStore.currentServiceSubtypesOptions.size !== 0 && val(store.catalogStore.currentServiceSubtypesOptions).map((i:any) => <Checkbox value={String(i.id)}   onClick={(values:any) => console.log(values.target.checked)}  label={i.name} />)}
                                </Group>
                            </Checkbox.Group>}/>
                            <Textarea
                                className={'col-span-2'}
                                minRows={3}

                              onInput={(values: any) =>
                                store.bidsStore.formResultSet({customer_comment: values.currentTarget.value})
                              }
                              defaultValue={store.bidsStore.formResult.customer_comment ?? ''}
                                label={'Комментарий'}
                                placeholder={'Дополнительная информация, которая может помочь в выполнении заявки'}
                            />
                            <Heading
                                variant={HeadingVariant.h4}
                                text={'Факт/лимит 35/100'}
                                color={HeadingColor.accent}
                                className={'col-span-2 mt-6'}
                            />
                        </>
                    </Step>
                    <Step
                        step={step}
                        animate={animate}
                        action={() => console.log('step 1')}
                        action1={() => console.log('step 1')}
                        stepIndex={3}
                        bodyClassName={'grid grid-cols-3 gap-4 content-start'}
                        footerClassName={'flex-1 w-full justify-stretch'}
                        header={
                            <>
                                <Heading text={step3.title} color={HeadingColor.accent} variant={HeadingVariant.h2} />
                                <div className={'text-base'}>{step3.description}</div>
                            </>
                        }
                        footer={
                            <>
                                <Button
                                    text={'Назад'}
                                    action={() => setStep((prevState: number) => prevState - 1)}
                                    className={'lg:mb-0 mr-auto'}
                                    variant={ButtonVariant['accent-outline']}
                                />
                                <Button
                                    text={'Отменить'}
                                    action={() => navigate(-1)}
                                    className={'float-right lg:mb-0 mb-5'}
                                    variant={ButtonVariant['accent-outline']}
                                />
                                <Button
                                    type={Object.keys(errors).length > 0 ? 'button' : 'text'}
                                    disabled={Object.keys(errors).length > 0}
                                    text={'Дальше'}
                                    action={() => {
                                        /* store.formStore.setFormDataCreateCar(values) */ changeStep()
                                    }}
                                    /* action={() => console.log(values)} */ className={'float-right'}
                                    variant={ButtonVariant.accent}
                                />
                            </>
                        }
                    >
                        <>
                            <InputAutocompleteWithCity  action={(val:any) => {
                              console.log(values);
                              store.bidsStore.formResultSet({address: val})
                            }} city={store.bidsStore.formResult.city} />
                            <hr className={'col-span-full border-transparent my-2'} />
                            <Select
                              onChange={(values) =>
                                store.bidsStore.formResultSet({parking: {label: step3?.fields[1]?.options?.filter(item => item.value == values)[0].label, value: values}})
                              }
                                label={step3.fields[1].label}
                                defaultValue={step3.fields[1].defaultValue}
                                data={step3.fields[1].options}
                            />
                            <Select
                              onChange={(values) => {
                                console.log(values);
                                store.bidsStore.formResultSet({secretKey: {label: step3?.fields[2]?.options?.filter(item => item.value == values)[0].label, value: values}})
                              }}
                                label={step3.fields[2].label}
                                defaultValue={step3.fields[2].defaultValue}
                                data={step3.fields[2].options}
                            />
                            <hr className={'col-span-full border-transparent my-2'} />
                          <Select
                            onChange={(values) => {
                              console.log(values);
                              store.bidsStore.formResultSet({ important: {label: step3?.fields[3]?.options?.filter(item => item.value == values)[0].label, value: values}})
                            }}
                            // value={store.bidsStore.formResult.important}
                            label={step3.fields[3].label}
                            defaultValue={step3.fields[3].defaultValue}
                            data={step3.fields[3].options}
                          />
                          <TimeInput
                            onChange={(values) =>
                              store.bidsStore.formResultSet({time: {label: step3.fields[4].label, value: values.target.value}})
                            }
                            classNames={{
                              section: 'mr-1 text-sm',
                              input: 'pl-7'
                            }}
                            leftSection={<span>C</span>}
                            label={step3.fields[4].label}
                          />
                        </>
                    </Step>
                  <Step
                    step={step}
                    animate={animate}
                    action={() => console.log('step 1')}
                    action1={() => console.log('step 1')}
                    stepIndex={4}

                    bodyClassName={'grid grid-cols-4 grid-rows-[auto_1fr] gap-y-8  gap-x-12 content-start'}
                    footerClassName={'flex-1 w-full justify-stretch'}
                    header={
                      <>
                        <Heading text={step4.title} color={HeadingColor.accent} variant={HeadingVariant.h2} />
                        <div className={'text-base'}>{step4.description}</div>
                      </>
                    }
                    footer={
                      <>
                        <Button
                          text={'Назад'}
                          action={() => setStep((prevState: number) => prevState - 1)}
                          className={'lg:mb-0 mr-auto'}
                          variant={ButtonVariant['accent-outline']}
                        />
                        <Button
                          text={'Отменить'}
                          action={() => navigate(-1)}
                          className={'float-right lg:mb-0 mb-5'}
                          variant={ButtonVariant['accent-outline']}
                        />
                        <Button
                          type={Object.keys(errors).length > 0 ? 'button' : 'text'}
                          disabled={Object.keys(errors).length > 0}
                          text={'Дальше'}
                          action={async () => {
                            console.log(store.bidsStore.formResult);
                          store.bidsStore.formCreateBid().then((res) => {
                            if(res.status !== 201) {

                              notifications.show({
                                id: 'car-created',
                                withCloseButton: true,
                                onClose: () => console.log('unmounted'),
                                onOpen: () => console.log('mounted'),
                                autoClose: 15000,
                                title: "You've been compromised",
                                message: 'Leave the building immediately',
                                color: 'red',
                                icon: <SvgClose />,
                                className: 'my-notification-class z-[9999] absolute top-12 right-12',
                                style: { backgroundColor: 'red' },
                                loading: false,
                              });
                              changeStep()
                            } else {
                              notifications.show({
                                id: 'car-created',
                                withCloseButton: true,
                                onClose: () => console.log('unmounted'),
                                onOpen: () => console.log('mounted'),
                                autoClose: 5000,
                                title: "Автомобиль создан",
                                message: 'Успешное создание',
                                // color: 'red',
                                className: 'my-notification-class z-[9999]',
                                // style: { backgroundColor: 'red' },
                                loading: false,
                              });
                              changeStep()
                            }
                          })
                            // /* store.formStore.setFormDataCreateCar(values) */
                          }}
                          /* action={() => console.log(values)} */ className={'float-right'}
                          variant={ButtonVariant.accent}
                        />
                      </>
                    }
                  >
                    <>
                      <Observer

                        children={() => (
                          <Select
                            className={'col-span-2'}
                            required
                            label={step4.fields[0].label}
                            searchable
                            value={String(store.bidsStore.formResult.city)}
                            data={val(store.catalogStore.cities).map((i: any) => ({
                              label: i.name,
                              value: String(i.id),
                            }))}
                          />
                        )}
                      />
                      <Observer
                        children={() => (
                          <Select
                            className={'col-span-2'}
                            required
                            label={step4.fields[1].label}
                            searchable
                            value={String(store.bidsStore.formResult.performer)}
                            onChange={(val: any) => store.bidsStore.formResultSet({performer: Number(val)})}
                            data={val(store.bidsStore.currentPerformers).map((i: any) => ({
                              label: i.name,
                              value: String(i.id),
                            }))}
                          />
                        )}
                      />


                    <MapWithDots />
                    </>
                  </Step>
                  <Step
                    step={step}
                    animate={animate}
                    action={() => console.log('step 1')}
                    action1={() => console.log('step 1')}
                    stepIndex={5}

                    bodyClassName={''}
                    footerClassName={'flex-1 w-full justify-stretch'}
                    header={
                      <>
                        <Heading text={step5.title} color={HeadingColor.accent} variant={HeadingVariant.h2} />
                        <div className={'text-base'}>{step5.description}</div>
                      </>
                    }
                    footer={
                      <>
                        <Button
                          text={'Назад'}
                          action={() => setStep((prevState: number) => prevState - 1)}
                          className={'lg:mb-0 mr-auto'}
                          variant={ButtonVariant['accent-outline']}
                        />
                        <Button
                          text={'Отменить'}
                          action={() => navigate(-1)}
                          className={'float-right lg:mb-0 mb-5'}
                          variant={ButtonVariant['accent-outline']}
                        />
                        <Button
                          type={Object.keys(errors).length > 0 ? 'button' : 'text'}
                          disabled={Object.keys(errors).length > 0}
                          text={'Оплатить'}
                          action={async () => {
                            store.appStore.setModal({
                              header: (
                                <Heading
                                  text={`Оплата услуги`}
                                  color={HeadingColor.accent}
                                  variant={HeadingVariant.h3}
                                />
                              ),
                              text: `Сформирована заявка на сумму 10 000 Р.
Пожалуйста, подтвердите оплату.`,
                              actions: [
                                <Button text={'Отменить'} action={() => store.appStore.closeModal()} variant={ButtonVariant.default} />,
                                <Button
                                  text={'Оплатить'}
                                  action={async () => {console.log('Оплапть'); }}
                                  variant={ButtonVariant.accent}

                                />,
                              ],
                              state: true,
                            })
                          }}
                          /* action={() => console.log(values)} */ className={'float-right'}
                          variant={ButtonVariant.accent}
                        />
                      </>
                    }
                  >
                    {store.bidsStore.currentBid.id && (<Panel className={' !border-active !border-1'} bodyClassName={'grid grid-cols-2  gap-y-5  gap-x-12 content-start !py-8'} variant={PanelVariant.withPaddingSmWithBody} background={PanelColor.glass}>
                    <DList className={'child:dt:text-accent'}  label={'Услуга'}  title={<Heading variant={HeadingVariant.h2} text={store.bidsStore.currentBid.service_type.name} color={HeadingColor.active}/>} />
                    <DList className={'child:dt:text-accent'}  label={'Тип услуги'}  title={<Heading variant={HeadingVariant.h4} text={store.bidsStore.currentBid.service_subtype.name}/>} />
                    {/* //todo: address */}
                    <DList className={'child:dt:text-accent'}  label={'Адрес выезда'}  title={store.bidsStore.formResultsAll.address} />
                    <DList className={'child:dt:text-accent'}  label={'Важность'}  title={store.bidsStore.formResultsAll.important.label} />
                    <DList className={'child:dt:text-accent'}  label={'Время'}  title={store.bidsStore.formResultsAll.time.value} />
                    <DList className={'child:dt:text-accent'}  label={'Дополнительные данные'}  title={<><ul><li>{store.bidsStore.formResultsAll.secretKey.label}</li><li>{store.bidsStore.formResultsAll.parking.label}</li></ul></>} />
                    <DList className={'child:dt:text-accent'}  label={'Дополнительные опции'}  title={<><ul>{store.bidsStore.currentBid.service_option.map((i:any) => <li key={i.id}>{i.name}</li>)}</ul></>} />
                      </Panel>
                  )}
                  </Step>
                </Form>
            )}

        </Formik>
     </>)
}

export default FormCreateBid