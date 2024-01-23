import { Form, Formik } from 'formik'
import React from 'react'
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import catalogStore from "stores/catalogStore";
import SelectCustom from "components/common/ui/Select/Select";
import { useStore } from "stores/store";
import CreateInput from "components/common/ui/CreateInput/CreateInput";
import { SelectCreatable } from "components/common/ui/CreatableSelect/CreatableSelect";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import agent from "utils/agent";
const dataCreate =  {
  initValues: {
    brand: '',
      model: '',
      car_class: '',
  },
  validateSchema: Yup.object().shape({
    brand: Yup.string().required('Обязательное поле'),
    model: Yup.string().required('Обязательное поле'),
    car_class: Yup.string().required('Обязательное поле'),
  }),
    submitAction: () => console.log('sumbit brands'),
    inputs: [
    {
      label: 'Марка',
      placeholder: 'Выберите марку',
      fieldName: 'brand',
      type: 'select',
      options: catalogStore.getCarBrands,
      createOption: catalogStore.createCarBrand,
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
      optione: [
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
const FormCreateCarBrand = () => {
  const { data, page, pageRequest, textData }: any = useLoaderData()
  console.log(data);
  const store = useStore()
  const navigate = useNavigate()
  const editStatus = !!data.results.name
  const submitForm = (props:any) => {
    console.log(props);
  }
  return (
    <Formik validationSchema={dataCreate.validateSchema} initialValues={dataCreate.initValues} onSubmit={submitForm} >
      {({ errors, touched, values, submitForm,isValid }) => (
        <Form  style={{display: 'contents'}}>
          <Panel
            state={false}
            className={'col-span-full grid grid-rows-[auto_1fr_auto]'}
            variant={PanelVariant.textPadding}
            background={PanelColor.glass}
            bodyClassName={'grid gap-6 lg:grid-cols-3 items-start'}
            footer={              <>

                <div className={'flex justify-end gap-5 w-full'}>
                  {editStatus && <Button
                    text={'Удалить'}
                    action={async () => {
                      store.appStore.setModal({
                        actions: [
                          <Button text={'Нет'} action={() => store.appStore.closeModal()} variant={ButtonVariant.default} />,
                          <Button
                            text={'Да, удалять'}
                            action={async () => {
                              agent.Catalog.deleteCity(data.results.id).then(() => {
                                navigate('/account/references/cities/', { replace: false })
                              })
                              .finally(          () => store.appStore.closeModal())
                            }}
                            variant={ButtonVariant['accent-outline']}
                          />,
                        ],
                        text: `Вы уверены, что хотите удалить ${data.results.name}`,
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
                    disabled={!isValid}
                    variant={ButtonVariant.accent}
                  />
                </div>
              </>
            }
            headerClassName={'flex gap-10'}

            header={
              <p>{data.results.name ? textData.editPageDesc : textData.createPageDesc}</p>
            }
          >
        <SelectCreatable label={dataCreate.inputs[0].label} createaction={() => console.log('create')} items={store.catalogStore.carBrands.map((item:any) => ({
          label: item.name,
          value: String(item.id)
        }))}/>
        <CreateInput  placeholder={dataCreate.inputs[1].placeholder} name={dataCreate.inputs[1].fieldName}  type={'text'} text={dataCreate.inputs[1].placeholder} action={() => console.log('')}/>
        <SelectCustom label={dataCreate.inputs[2].label} placeholder={dataCreate.inputs[2].placeholder} name={dataCreate.inputs[2].fieldName} options={store.catalogStore.carBrands.map((item:any) => ({
          label: item.name,
          value: String(item.id)
        }))}/>
          </Panel>
        </Form>
      )}
    </Formik>
  )
}
export default FormCreateCarBrand
