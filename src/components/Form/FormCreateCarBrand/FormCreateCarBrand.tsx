import { Form, Formik } from 'formik'
import React from 'react'
import { Await, useLoaderData, useNavigate, useParams, useRevalidator } from "react-router-dom";
import * as Yup from "yup";
import SelectCustom from "components/common/ui/Select/Select";
import { useStore } from "stores/store";
import CreateInput from "components/common/ui/CreateInput/CreateInput";
import { SelectCreatable } from "components/common/ui/CreatableSelect/CreatableSelect";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import agent from "utils/agent";
import { CarType } from "stores/carStore";

import { values as val } from 'mobx'
import { Select, TextInput } from '@mantine/core'
import ComboboxCustom from 'components/common/ui/Combobox/Combobox';
const dataCreate = {
  initValues: {
    brandId: 0,
    brand: null,
    modelName: '',
    car_type: '',
  },
  validateSchema: Yup.object().shape({
    brandId: Yup.string(),
    brand: Yup.string(),
    modelName: Yup.string(),
    car_type: Yup.string().required('Выберите тип'),
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
      placeholder: 'Модель',
      fieldName: 'modelName',
      type: 'text',
    },
    {
      label: 'Тип',
      placeholder: 'Выберите тип',
      fieldName: 'car_type',
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


const FormCreateCarBrand = (props: any) => {
  const store = useStore()
  const { textData }: any = useLoaderData()
  const params = useParams()
  const brand = store.catalogStore.getCurrentCarModelWithBrand
  const navigate = useNavigate()
  const edit = props?.edit ?? false
  const result = (Object.keys(CarType) as (keyof typeof CarType)[]).map(
    (key, index) => {
      return {
        label: CarType[key],
        value: CarType[key]
      };
    },
  );
  let revalidator = useRevalidator()
  // @ts-ignore
  return (
    <Formik  validationSchema={dataCreate.validateSchema} initialValues={props?.edit ? {
      id: params.id,
      car_type: props.car_type,
      modelName: props.modelName,
      brand: props.brand,
      brandId: props.brandId
    } : dataCreate.initValues} onSubmit={(props) => {

        // @ts-ignore
      if(!edit) {
        store.catalogStore.createCarBrand({ car_type: props.car_type, model: props.modelName, brandId: props.brandId, brandName: typeof props.brand === "string" ? props.brand : null})
        .then(r => r)
        .then((r) => {
          if(r && r.status < 399) {
            revalidator.revalidate();
            navigate(`/account/references/car_brands/${r?.data.id}`)
          }
        })
      } else {

      const modelId = params.id;
      // @ts-ignore
        store.catalogStore.updateCarBrand({id: modelId, car_type: props.car_type, model: props.modelName, brandId: props.brandId, brandName: typeof props.brand === "string" ? props.brand : null})
      .then(r => r)
      .then((r) => {
        if(r && r.status < 399) {
          revalidator.revalidate();
          navigate(`/account/references/car_brands/${r?.data.id}`)
          }
        })    //

      }
    }} >
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
                            text={'Удалить'}
                            action={async () => {
                              agent.Catalog.deleteCarModel(props.id)
                              .then((r) => {
                                console.log(r)
                              })
                              .catch((errors) => console.log(errors))
                              .finally(() => {
                                navigate('/account/references/car_brands', { replace: false })
                                store.appStore.closeModal()
                              })
                            }}
                            variant={ButtonVariant['accent-outline']}
                          />,
                        ],
                        //@ts-ignore
                        text: `Вы уверены, что хотите удалить ${props.brand} ${props.modelName}`,
                        state: true,
                      })
                    }}
                    className={'justify-self-start mr-auto'}
                  />}
                  <Button
                    text={'Отменить'}
                    action={() => navigate(-1)}
                    className={'float-right'}
                    variant={ButtonVariant.cancel}
                  />
                  <Button
                    text={'Сохранить'}
                    type={'submit'}
                    // action={submitForm}
                    className={'float-right'}
                    disabled={!isValid}
                    variant={ButtonVariant.accent}
                  />
                </div>
              </>
            }
            headerClassName={'flex gap-10'}

            header={
            <Await resolve={brand}>
              <p>{
          // @ts-ignore
                store.catalogStore.getCurrentCarModelWithBrand && store.catalogStore.getCurrentCarModelWithBrand.name ? textData.editPageDesc : textData.createPageDesc}</p>
            </Await>
            }
          >
          <SelectCreatable defaultValue={props?.edit ? props.brand : null} items={val(store.catalogStore.carBrands).map((item:any)=> ({label: item.name, value: String(item.id)}))} createAction={(e) => setFieldValue('brandId', Number(e.id))} label={values.brand !== null ? 'Создать марку' : 'Марка'}/>
          {/* <ComboboxCustom defaultValue={props?.edit ? props.brand : null} action={(e) => setFieldValue('brandId', Number(e.id))} name={'brand'} items={val(store.catalogStore.carBrands).map((item:any)=> item)}/> */}
          <TextInput    onChange={(e) => values.modelName = e.target.value} defaultValue={props?.edit ? props.modelName : null} placeholder={dataCreate.inputs[1].placeholder} name={dataCreate.inputs[1].fieldName}  type={'text'} label={dataCreate.inputs[1].placeholder}/>
          <Select  withCheckIcon={false}   required onChange={(e) =>  setFieldValue('car_type', e)} defaultValue={props?.edit ? props.car_type : null} label={dataCreate.inputs[2].label} placeholder={dataCreate.inputs[2].placeholder} name={dataCreate.inputs[2].fieldName} data={result.map((item) => ({
          label: item.label,
          value: String(item.value)
            }))}/>
          </Panel>
        </Form>
      )}
    </Formik>
  )
}
export default FormCreateCarBrand
