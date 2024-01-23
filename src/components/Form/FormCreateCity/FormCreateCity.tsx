import { Form, Formik, FormikHelpers } from "formik";
import React from 'react'
import { Await, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import catalogStore from "stores/catalogStore";
import SelectCustom from "components/common/ui/Select/Select";
import { useStore } from "stores/store";
import CreateInput from "components/common/ui/CreateInput/CreateInput";
import { SelectCreatable } from "components/common/ui/CreatableSelect/CreatableSelect";

import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import FormActions from "routes/reference/FormActions/FormActions";
import agent from "utils/agent";
import { observer } from "mobx-react-lite";
const dataCreate = {
    initValues: {
      id: 0,
        city: '',
        timezone: '',
        status: '',
    },
    validateSchema: Yup.object().shape({
        city: Yup.string().required('Обязательное поле'),
        timezone: Yup.string().required('Обязательное поле'),
        status: Yup.string(),
    }),
    submitAction: () => console.log('sumbit brands'),
    inputs: [
        {
            label: 'Город',
            placeholder: 'Введите название города',
            fieldName: 'city',
            type: 'text',
        },
        {
            label: 'Часовой пояс',
            placeholder: 'Введите часовой пояс',
            fieldName: 'timezone',
            type: 'text',
        },
        {
            label: 'Статус',
            placeholder: 'Выберите статус',
            fieldName: 'status',
            type: 'select',
            options: [
                {
                    label: 'Активно',
                    value: 'true',
                },
                {
                    label: 'Неактивно',
                    value: 'false',
                },
            ],
        },
    ],
}
const FormCreateCity = () => {

  const { data, page, pageRequest, textData }: any = useLoaderData()
  const location = useLocation()
  const navigate = useNavigate()
  const store = useStore()
  const editStatus = !!data.results.name
  const  editInitValues = {
          id: data.results.id,
          city: data.results.name,
          timezone: data.results.timezone,
          status: String(data.results.is_active),
  }
  console.log(editInitValues);
  return (
      <Formik initialValues={data.results.name ? editInitValues : dataCreate.initValues}  validationSchema={dataCreate.validateSchema}
        onSubmit={(values, isValid) => {
            console.log('submit form', location.pathname.includes('edit'))
          if(location.pathname.includes('edit')) {
            textData.editAction(values.id, values.city, values.status === "true", values.timezone).then((r: any) => console.log('r', r)).catch((e: any) => console.log('e'))
          } else {
            textData.createAction(values.city, values.status === "true").then((r: any) => console.log('r', r)).catch((e: any) => console.log('e'))
          }
        }}>
        {({ errors, touched,isSubmitting, values, submitForm,isValid }) => (
          <Form  style={{display: 'contents'}}>
          <Panel
            state={false}
            className={'col-span-full grid grid-rows-[auto_1fr_auto]'}
            variant={PanelVariant.textPadding}
            background={PanelColor.glass}
            bodyClassName={'grid gap-6 lg:grid-cols-3 items-start'}
            footer={
              <>

                <div className={'flex justify-self-start gap-5 w-full'}>
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
                    action={
                    async () =>
                      !isSubmitting &&
                      navigate(`${location.pathname.split('/').slice(0, location.pathname.split('/').length - 1).join('/')}`)}
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

              <CreateInput

                  name={dataCreate.inputs[0].fieldName}
                  action={() => console.log()}
                  text={dataCreate.inputs[0].label}
                  placeholder={dataCreate.inputs[0].placeholder}
                  type={dataCreate.inputs[0].type}
              />
              <CreateInput
                value={
                  // @ts-ignore
                  values[dataCreate.inputs[1].fieldName]}
                  placeholder={dataCreate.inputs[1].placeholder}
                  name={dataCreate.inputs[1].fieldName}
                  type={'text'}
                  text={dataCreate.inputs[1].placeholder}
                  action={() => console.log('')}
              />
              <SelectCustom
                value={
                  // @ts-ignore
                  values[dataCreate.inputs[2].fieldName]}
                  label={dataCreate.inputs[2].label}
                  placeholder={dataCreate.inputs[2].placeholder}
                  name={dataCreate.inputs[2].fieldName}
                defaultValue={"true"}
                  options={[
                      {
                          label: 'Активно',
                          value: 'true',
                      },
                      {
                          label: 'Неактивно',
                          value: 'false',
                      },
                  ]}
              />

          </Panel>
          </Form>
          )}

      </Formik>

  )
}
export default FormCreateCity
