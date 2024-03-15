import React, { useState } from "react";
import "yup-phone-lite";
import {values as val} from "mobx";
import { useStore } from "stores/store";
import { useNavigate } from "react-router-dom";
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { FormCard } from "components/Form/FormCards/FormCards";
import FormModalAddUser, { FormModalSelectUsers } from "components/Form/FormModalAddUser/FormModalAddUser";
import Progress from "components/common/ui/Progress/Progress";
import { CreateField } from "components/Form/FormCreateCompany/Steps/StepSuccess";
import { observer, Observer } from "mobx-react-lite";
import { CloseButton, InputBase, NumberInput, Select } from "@mantine/core";
import { CAR_RADIUS, CAR_RADIUSTEXT } from "stores/priceStore";
import { yupResolver } from "mantine-form-yup-resolver";
import { CreateCarSchema} from "utils/validationSchemas";
import PanelForForms, { PanelColor, PanelVariant } from "components/common/layout/Panel/PanelForForms";
import { createFormActions, createFormContext } from "@mantine/form";
import { IMaskInput } from "react-imask";
import { UserTypeEnum } from "stores/userStore";
import { CompanyTypeRus } from 'stores/companyStore'

interface CarCreateUpdate  {
    number: string
    height:number
    id: number | null
    radius:	CAR_RADIUS
    limit:string
    is_active:boolean
    company_id: number | null
    company_type: string
    depend_on: string
    brand: number | null
    model: number | null
    employees: number[]
}

export const [FormProvider, useFormContext, useForm] = createFormContext<any>()
export const createUpdateCarActions = createFormActions<CarCreateUpdate>('createUpdateCar')

const FormCreateUpdateCar = ({ car, edit }: any) => {
    const store = useStore()
    const memoizedInitValues = React.useMemo(() => {
      let initValues:CarCreateUpdate & any = {
        brand: null,
        id: null,
        car_type: '',
        city: '',
        employees: [],
        height: 0,
        is_active: 'true',
        limit: '',
        model: null,
        depend_on: 'company',
        number: '',
        radius: '',
        company_id: store.userStore.myProfileData.company.company_type === "Администратор системы" ? null : String(store.userStore.myProfileData.company.id),
        company_type: store.userStore.myProfileData.company.company_type === "Администратор системы" ? UserTypeEnum.performer : CompanyTypeRus(store.userStore.myProfileData.company.company_type),
        company_filials: store.userStore.myProfileData.company.parent === null ? 'company' : 'filials',
      }
      if(edit) {
        store.formStore.setFormDataCreateCar({
          id: car.id,
          number: car.number,
          height: car.height,
          radius: car.radius,
          city: car.city,
          company_id: car.company_id,
          company_type: car.company_type,
          is_active: car.is_active,
          brand: car.brand,
          model: car.model,
          car_type: car.car_type,
          employees: car.employees,
        })
        initValues = {
          id: car.id,
          number: car.number,
          height: car.height,
          radius: car.radius,
          city: car.city,
          company_id: car.company_id,
          company_type: car.company_type,
          is_active: car.is_active,
          brand: car.brand,
          model: car.model,
          depend_on: car.depend_on,
          car_type: car.car_type,
          employees: car.employees,
        }
      }
      return initValues
    }, [edit, car])
  const numRegex = new RegExp("^(([АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{1,2})(\d{2,3})|(\d{4}(?<!0000)[АВЕКМНОРСТУХ]{2})(\d{2})|(\d{3}(?<!000)(C?D|[ТНМВКЕ])\d{3}(?<!000))(\d{2}(?<!00))|([ТСК][АВЕКМНОРСТУХ]{2}\d{3}(?<!000))(\d{2})|([АВЕКМНОРСТУХ]{2}\d{3}(?<!000)[АВЕКМНОРСТУХ])(\d{2})|([АВЕКМНОРСТУХ]\d{4}(?<!0000))(\d{2})|(\d{3}(?<!000)[АВЕКМНОРСТУХ])(\d{2})|(\d{4}(?<!0000)[АВЕКМНОРСТУХ])(\d{2})|([АВЕКМНОРСТУХ]{2}\d{4}(?<!0000))(\d{2})|([АВЕКМНОРСТУХ]{2}\d{3}(?<!000))(\d{2,3})|(^Т[АВЕКМНОРСТУХ]{2}\d{3}(?<!000)\d{2,3}))")
  const form = useForm({
    name: 'createUpdateCar',
    initialValues: memoizedInitValues,
    validateInputOnBlur: true,
    validate: yupResolver(CreateCarSchema),
    enhanceGetInputProps: (payload) => {
      if (payload.field === "model") {
        return ({
          disabled: payload.form.values.brand === null
        })
      }
      if (payload.field === "brand") {
        return ({
          onOptionSubmit: (prop: any) => {
            payload.form.values.model = null;
            store.carStore.setBrand(prop);
          }
        })
      }
      if (payload.field === "company_id") {
        return ({
          label: form.values.depend_on === "company" ? 'Компания' : 'Филиал',

        })
      }

      if(payload.field === "depend_on") {
        return ({
          onChange: (event:any) => {
            form.setFieldValue('depend_on', event)
          }
            // payload.form.values.model = null;
            // store.carStore.setBrand(prop);
          ,
          className: '!flex-[0_0_14rem]'
        })
      }
      return ({
        className: 'flex-grow !flex-[1_1_auto]'
      })
    },
  })
    const [step, setStep] = useState(1)
    const [animate, setAnimate] = useState(false)

    const changeStep = (step?: number) => {
        setAnimate((prevState) => !prevState)
        setTimeout(() => {
            setAnimate(false)
            setStep((prevState) => step ? step : prevState += 1)
        }, 1200)
    }
    const companyVar = React.useMemo(() => {
      const  res = form.values.depend_on === "company" ? store.companyStore.getCompaniesAll.filter((c:any) => c.company_type === "Компания-Заказчик" && c.parent === null) : store.companyStore.getFilialsAll.filter((c:any) => store.appStore.appType === "admin" ? c.company_type === "Компания-Заказчик" : c)
      if(res.length === 1) {
        form.values.company_id = String(res[0].id)
      }
      return res
      },[form.values.depend_on])
    const navigate = useNavigate()

    const formDataSelectUsers = React.useMemo(() => {
        return store.usersStore.usersList.users.map((item:any) => ({label: item.employee.first_name + ' ' + item.employee.last_name, value: String(item.employee.id)}))
    },[store.usersStore.companyUsers]);

    const handleCreateCar = React.useCallback(() => {

      // Step 1
      if(step === 1) {
        // console.log(form.values)
        !edit && store.usersStore.clearSelectedUsers()
        const company = store.companyStore.getCompaniesAll.filter((item:any) => item.id == Number(form.values.company_id))[0];
        // console.log(company.company_type);
        form.values.company_type = company.company_type;
        // console.log('submit', form.values);
          store.formStore.setFormDataCreateCar({
            id: store.formStore.formCreateCar.id,
            number: form.values.number,
            height: form.values.height,
            radius: form.values.radius,
            company_id: Number(form.values.company_id),
            company_type: form.values.company_type,
            is_active: form.values.is_active === "true",
            brand: Number(form.values.brand),
            model: Number(form.values.model),
            employees: val(store.usersStore.selectedUsers).map((item: any) => item.employee.id),
          });
          changeStep();
      }
      if(step === 2) {
            const data = {
              id: form.values.id,
              number: form.values.number,
              height: form.values.height,
              radius: form.values.radius,
              company_id: Number(form.values.company_id),
              company_type: form.values.company_type,
              is_active: form.values.is_active === "true",
              brand: Number(form.values.brand),
              model: Number(form.values.model),
              employees: val(store.usersStore.selectedUsers).map((item: any) => item.employee.id),
            }
            if (edit) {
              store.formStore.setFormDataCreateCar(data)
              store.formStore.sendCarFormDataEdit()
            } else {
              store.formStore.setFormDataCreateCar(data)
              store.formStore.sendCarFormData().then(r => {
                console.log(r);
                form.values.id = r.data.id
              })
            }

            changeStep(3)
      }
      if(step === 3) {
        navigate(`/account/cars/${form.values.id}`)
      }
      // changeStep()
    }, [form])
    return (
      <FormProvider form={form}>
        <PanelForForms
          state={false}
          footerClassName={'px-8 pb-8 pt-2'}
          variant={PanelVariant.default}

          actionCancel={<>
            {/*   <Button */}
            {/*     type={'button'} */}
            {/*     text={'Чек'} */}
            {/*     action={(e) => { */}
            {/* 			e.preventDefault() */}
            {/*       console.log(form.errors) */}
            {/*       console.log(form.values) */}
            {/*       form.validate() */}
            {/*       console.log(form.isValid()) */}

            {/* 		}} */}
            {/*     className={'float-right'} */}
            {/*     variant={ButtonVariant['accent-outline']} */}
            {/* /> */}
            {step !== 3 ?  <Button type={'button'}
            text={'Отменить'}
            action={(e) => {
              e.preventDefault()
              navigate(-1)
            }}
            className={'float-right'}
              variant={ButtonVariant.cancel} /> : null
            }</>}
          actionBack={step === 2 ?  <Button text={'Назад'}
                      action={() => changeStep(1)}
                      className={' lg:mb-0 mb-5 mr-auto'}
                      variant={ButtonVariant['accent-outline']} /> : null}
          actionNext={
            <Button
              type={step === 1 ? 'button' : step === 3 ? '' : 'submit'}
              // type={'button'}
              action={handleCreateCar}
              disabled={!form.isValid()}
              text={step === 1 ? 'Дальше' : step === 3 ? 'Перейти к автомобилю' : 'Сохранить'}
              className={'float-right'}
              variant={ButtonVariant.accent} />
          }
        >
          <form onSubmit={form.onSubmit((props) => console.log('form', props))}
            onReset={form.onReset}
            style={{ display: 'contents' }}>
            <Progress total={3} current={step} />
            <PanelForForms
              state={step !== 1}
              animate={animate}
              className={'!bg-transparent'}
              bodyClassName={'!flex flex-wrap gap-x-6 gap-y-3'}
              variant={PanelVariant.textPadding}
              background={PanelColor.default}
              header={
                <>
                  <Heading
                    text={'Шаг 1. Основная информация'}
                    color={HeadingColor.accent}
                    variant={HeadingVariant.h2}
                  />
                  <div className={''}>
                    Укажите основную информацию об автомобиле для добавления в список
                  </div>
                </>
              }
            >
              <Select
                label={'Марка'}
                searchable
                {...form.getInputProps('brand')}
                data={val(store.catalogStore.carBrands).map((item:any) => ({ label: item.name, value: String(item.id) }))}
                />
              <Select
                {...form.getInputProps('model')}
                placeholder={'Выберите модель'}
                label={'Модель'}
                searchable
                clearable
                className={'w-full flex-grow  !flex-[1_0_20rem]'}
                data={store.carStore.getBrandModels}
              />
              <InputBase
                classNames={{
                input: 'uppercase'
              }}
                component={IMaskInput}
                //@ts-ignore
                {...{
                  mask: "a 000 aa 000 ", alwaysShowMask: true, formatChars: { "9": "[0-9]", "a": "[A-Za-z]", "*": "[A-Za-z0-9]" },
                }}
                //@ts-ignore
                showMask={true}
                {...form.getInputProps('number')}
                label={'Гос. номер'}
                placeholder={'А 100 ТТ 777'}/>
              <NumberInput  {...form.getInputProps('height')}
                label={'Высота автомобиля, cм'}
                hideControls
                allowNegative={false}
                placeholder={'Введите высоту'}/>
              <Select
                {...form.getInputProps('radius')}
                label={'Радиус колес, дюймы'}
                data={Array.from(Object.keys(CAR_RADIUSTEXT))}
                placeholder={'Радиус колес, дюймы'}
              />
              <Select
                label={'Статус'}
                defaultValue={form.values.is_active}
                {...form.getInputProps('is_active')}
                data={[
                { label: 'Активен', value: 'true' },
                { label: 'Неактивен', value: 'false' },
              ]} placeholder={'Выбрать статус'}
              />
              {/* <Select */}
              {/*   {...form.getInputProps('city')} */}
              {/*   label={'Город'} allowDeselect={false} */}
              {/*   data={val(store.catalogStore.cities).filter((c:any) => c.is_active).map((o: any) => ({ */}
              {/*     label: o.name, */}
              {/*     value: String(o.id), */}
              {/*   }))} */}
              {/*   placeholder={'Выбрать город'} */}
              {/* /> */}
              <hr className={'col-span-full flex-[1_100%]'}/>
              <Select

                label={'Принадлежит'}
                {...form.getInputProps('depend_on', { dependOn: 'type' })}
                defaultValue={form.values.depend_on}
                onOptionSubmit={() => form.setValues({...form.values, company_id: null, group: null})}
                data={[
                  { label: 'Компании', value: 'company' },
                  { label: 'Филиалы', value: 'filials' },
                ]}
              />
              <Select
                searchable
                label={'Компании'}
                {...form.getInputProps('company_id', { dependOn: 'type' })}

                data={companyVar.map((item) => ({ label: item.name, value: String(item.id) }))}
              />

            </PanelForForms>
            <PanelForForms
              state={step !== 2}
              animate={animate}
              className={'!bg-transparent'}
              bodyClassName={'!flex flex-wrap gap-x-6 gap-y-3'}
              variant={PanelVariant.textPadding}
              background={PanelColor.default}
              header={
                <>
                  <Heading
                    text={'Шаг 2. Добавьте сотрудников для автомобиля'}
                    color={HeadingColor.accent}
                    variant={HeadingVariant.h2}
                  />
                  <div className={''}>
                    Вы можете добавить или выбрать сотрудника из списка зарегистрированных пользователей
                  </div>
                </>
              }
            >
           <Observer children={(): any =>
                        //@ts-ignore
                        <div className={'asd order-2 flex-[1_100%]'}><Heading text={'Добавленные:'}
                          variant={HeadingVariant.h4} />
                          <div className={'grid grid-cols-3 gap-6'}>  {store.usersStore.selectedUsers.size > 0 && store.usersStore.selectedUsers.toJSON().map((el: any) => {
                            return <FormCard actions={null}
                              className={'relative'}
                              title={el[1].employee.first_name}
                              children={<><CloseButton style={{ position: "absolute", right: '1rem', top: '1rem' }}
                                onClick={() => {

                                  store.usersStore.removeFromSelectedUsers(el[1].employee.id)
                                }} />
                                <div className={'text-xs -mt-3 pb-4 uppercase text-gray-2'}>{el[1].group.name}</div>
                                <ul>
                                  <li>{el[1].employee.phone}</li>
                                  <li>{el[1].employee.email}</li>
                                </ul>
                                <div> {el[1].employee.is_active ? <span className={'text-accent  mt-5 block'}>Активен</span> : <span className={'text-red-500 mt-5 block'}>Не активен</span>}</div>
                              </>}
                              titleColor={HeadingColor.accent}
                              titleVariant={HeadingVariant.h5} />
                          })}</div>
                        </div>} />
                      <Observer children={() => <FormCard title={"Добавить нового сотрудника"}
                        titleColor={HeadingColor.accent}
                        titleVariant={HeadingVariant.h4}
                        actions={<Button text={"Добавить сотрудника"}
                          size={ButtonSizeType.sm}
                          variant={ButtonVariant.accent}
                          directory={ButtonDirectory.directory}
                          action={async () => {
                            store.appStore.setModal({
                              className: "!px-10 gap-4 !justify-stretch",
                              component: <FormModalAddUser group={await store.permissionStore.loadCompanyPermissions(Number(form.values.company_id))}
                                company_id={Number(form.values.company_id)} />,
                              text: `Вы уверены, что хотите удалить ${"name"}`,
                              state: true
                            });
                          }} />} />} />

                      <FormCard title={"Выбрать сотрудника из зарегистрированных пользователей"}
                        titleColor={HeadingColor.accent}
                        titleVariant={HeadingVariant.h4}
                        actions={<Button text={"Выбрать сотрудника"}
                          size={ButtonSizeType.sm}
                          variant={ButtonVariant.accent}
                          directory={ButtonDirectory.directory}
                          action={() => {
                            store.appStore.setModal({
                              className: '!px-10 gap-4 !justify-stretch grid-cols-1',
                              component: (
                                <FormModalSelectUsers company_id={Number(form.values.company_id)}
                                  users={formDataSelectUsers} />
                              ),
                              text: `Вы уверены, что хотите удалить ${'name'}`,
                              state: true,
                            })
                          }} />} />
            </PanelForForms>
            <PanelForForms
              state={step !== 3}
              animate={animate}
              className={'!bg-transparent'}
              bodyClassName={'!flex flex-wrap gap-x-6 gap-y-3'}
              variant={PanelVariant.textPadding}
              background={PanelColor.default}
              header={
                <>
                  <Heading
                    text={'Шаг 3. Автомобиль зарегистрирован'}
                    color={HeadingColor.accent}
                    variant={HeadingVariant.h2}
                  />
                  <div className={''}>
                    Вы можете добавить лимиты для зарегистрированного автомобиля или добавить их позже в соответствующем разделе
                  </div>
                </>
              }
            >
              <CreateField title={"Создать прайс-лист"} />
            </PanelForForms>
          </form>
        </PanelForForms>
      </FormProvider>

            )
            }

export default observer(FormCreateUpdateCar)
