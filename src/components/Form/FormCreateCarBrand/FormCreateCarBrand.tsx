import { Form, Formik } from 'formik'
import React from 'react'
import { Await, useLoaderData, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import SelectCustom from "components/common/ui/Select/Select";
import { useStore } from "stores/store";
import CreateInput from "components/common/ui/CreateInput/CreateInput";
import { SelectCreatable } from "components/common/ui/CreatableSelect/CreatableSelect";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import agent from "utils/agent";
import { observer, Observer } from "mobx-react-lite";
import { CarType } from "stores/carStore";

import { values as val } from 'mobx'
import { Select, TextInput } from '@mantine/core'
import ComboboxCustom from 'components/common/ui/Combobox/Combobox';
const dataCreate = {
  initValues: {
    brand: 0,
    model: '',
    car_class: '',
  },
  validateSchema: Yup.object().shape({
    brand: Yup.string(),
    model: Yup.string(),
    car_class: Yup.string(),
  }),
  submitAction: () => console.log('sumbit brands'),
  inputs: [
    {
      label: 'Марка',
      placeholder: 'Выберите марку',
      fieldName: 'brand',
      type: 'select',
      options: [],
    },
    {
      label: 'Модель',
      placeholder: 'Выберите модель',
      fieldName: 'model',
      type: 'text',
    },
    {
      label: 'Тип автомобиля',
      placeholder: 'Выберите тип',
      fieldName: 'car_class',
      type: 'text',
      options: [
        {
          label: 'B',
          value: '2',
        },
        {
          label: 'C',
          value: '3',
        },
      ],
    },
  ],
}
const FormCreateCarBrand = ({ edit = false }:{edit?: boolean|undefined}) => {
  const store = useStore()
  const { textData }: any = useLoaderData()
  const params = useParams()
  const brand = store.catalogStore.getCurrentCarModelWithBrand
  const navigate = useNavigate()
  React.useEffect(() => {
    store.catalogStore.getCarModelWithBrand(Number(params.id)).then(r => console.log(r))
  }, [])
  const submitForm = React.useCallback((props:any) => {
    store.catalogStore.createCarBrand({car_class: props.car_class, model: props.model, brandId: (typeof props.brand === "number") ? props.brand : null, brandName: (typeof props.brand === "string") ? props.brand : null})
    .then(r => r)
    .then((r) => navigate(`/account/references/car_brands/${r.id}`))    //
  }, [])
  const result = (Object.keys(CarType) as (keyof typeof CarType)[]).map(
    (key, index) => {
      return {label: CarType[key],
        value: CarType[key]
      };
    },
  );
  console.log(val(store.catalogStore.carBrands))
  // @ts-ignore
  return (
    <Formik validationSchema={dataCreate.validateSchema} initialValues={dataCreate.initValues} onSubmit={submitForm} >
      {({ errors, touched, setFieldValue, values, submitForm,isValid }) => (
        <Form  style={{display: 'contents'}}>
          <Panel
            className={'col-span-full grid grid-rows-[auto_1fr_auto]'}
            variant={PanelVariant.textPadding}
            background={PanelColor.glass}
            bodyClassName={'grid gap-6 lg:grid-cols-3 items-start'}
            footer={              <>

                <div className={'flex justify-end gap-5 w-full'}>
                  {edit && <Button
                    text={'Удалить'}
                    action={async () => {
                      store.appStore.setModal({
                        actions: [
                          <Button text={'Нет'} action={() => store.appStore.closeModal()} variant={ButtonVariant.default} />,
                          <Button
                            text={'Да, удалять'}
                            action={async () => {
                            //   agent.Catalog.(data.results.id).then(() => {
                            //     navigate('/account/references/cities/', { replace: false })
                            //   })
                            //   .finally(          () => store.appStore.closeModal())
                            }}
                            variant={ButtonVariant['accent-outline']}
                          />,
                        ],
                        //@ts-ignore
                        text: `Вы уверены, что хотите удалить ${brand.name}`,
                        state: true,
                      })
                    }}
                    className={'justify-self-start mr-auto'}
                  />}
                  <Button
                    text={'Отменить'}
                    action={() => navigate(-1)}
                    className={'float-right'}
                    variant={ButtonVariant['accent-outline']}
                  />
                  <Button
                    text={'Сохранить'}
                    type={'submit'}
                    className={'float-right'}
                    action={(e) => console.log(e)}
                    disabled={!isValid}
                    variant={ButtonVariant.accent}
                  />
                </div>
              </>
            }
            headerClassName={'flex gap-10'}

            header={
            <Await resolve={brand}>
              {/* // @ts-ignore */}
              <p>{
          // @ts-ignore
                store.catalogStore.getCurrentCarModelWithBrand && store.catalogStore.getCurrentCarModelWithBrand.name ? textData.editPageDesc : textData.createPageDesc}</p>
            </Await>
            }
          >
            <ComboboxCustom items={val(store.catalogStore.carBrands).map((item:any)=> item.name)}/>
          {/*   <Observer children={() => <SelectCreatable defaultValue={store.catalogStore.getCurrentCarModelWithBrand.brand?.name} label={dataCreate.inputs[0].label} createAction={(e) => { */}

          {/*     console.log(store.catalogStore.getCurrentCarModelWithBrand.brand.name) */}
          {/*     // setFieldValue('brand', {e?.value && setFieldValue('brand', Number(e.value)) */}
          {/*   } } items={val(store.catalogStore.carBrandsCurrent).map((item:any) => ({ */}
          {/* label: item.name, */}
          {/* value: String(item.id) */}
          {/*   }))}/>}/> */}
          <TextInput defaultValue={store.catalogStore.getCurrentCarModelWithBrand.name}  placeholder={dataCreate.inputs[1].placeholder} name={dataCreate.inputs[1].fieldName}  type={'text'} label={dataCreate.inputs[1].placeholder} onChange={(e:any) => console.log('1223', e.target.value)}/>
        <Select defaultValue={store.catalogStore.getCurrentCarModelWithBrand.car_type} label={dataCreate.inputs[2].label} placeholder={dataCreate.inputs[2].placeholder} name={dataCreate.inputs[2].fieldName} data={result.map((item) => ({
          label: item.label,
          value: String(item.value)
            }))}/>
          </Panel>
        </Form>
      )}
    </Formik>
  )
}
export default observer(FormCreateCarBrand)
