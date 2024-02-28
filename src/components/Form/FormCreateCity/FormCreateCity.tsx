import { Form, Formik, FormikHelpers } from "formik";
import React from 'react'
import { Await, useLoaderData, useLocation, useNavigate, useRevalidator } from "react-router-dom";
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
import { Select } from "@mantine/core";
const dataCreate = {
    initValues: {
      id: 0,
        city: '',
        timezone: '',
        status: 'true',
    },
    validateSchema: Yup.object().shape({
        city: Yup.string().required('Обязательное поле'),
        timezone: Yup.string().required('Обязательное поле'),
        status: Yup.string().required('Обязательное поле'),
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
            type: 'select',
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
const FormCreateCity = (props: any) => {

  const { data, page, pageRequest, textData }: any = useLoaderData()
  const location = useLocation()
  const navigate = useNavigate()
  const store = useStore()
  const editStatus = props?.edit ?? false

  const  editInitValues = {
          id: data.results.id,
          city: data.results.name,
          timezone: data.results.timezone,
          status: String(data.results.is_active),
  }
  let revalidator = useRevalidator();

  return (
      <Formik initialValues={editStatus ? editInitValues : dataCreate.initValues}  validationSchema={dataCreate.validateSchema}
        onSubmit={(values, isSubmitting) => {
            if(location.pathname.includes('edit')) {
              textData.editAction(values.id, values.city, values.status === "true", values.timezone)
              .then((r: any) => {
                if(r.status === 200) {
                  revalidator.revalidate()
                  navigate(`${location.pathname.split('/').slice(0, location.pathname.split('/').length - 1).join('/')}`, {replace: false})
                }
              })
            } else {
              textData.createAction(values.city, values.status === "true", values.timezone)
              .then((r: any) => {
                if(r.status === 201) {
                  revalidator.revalidate()
                  navigate(`${location.pathname.split('/').slice(0, location.pathname.split('/').length - 1).join('/')}`, {replace: false})
                }
              })
            }
        }}>
        {({ errors, setFieldValue, touched,isSubmitting, values, submitForm,isValid }) => (
          <Form  style={{display: 'contents'}}>
          <Panel
            state={false}
            className={'col-span-full grid grid-rows-[auto_1fr_auto]'}
            variant={PanelVariant.textPadding}
            background={PanelColor.glass}
            bodyClassName={'grid gap-6 lg:grid-cols-3 items-start'}
            footer={
              <>

                {/* <div className={'flex gap-5 flex-1'}> */}
                  {editStatus && <Button
                    text={'Удалить'}
                    action={async () => {
                      store.appStore.setModal({
                        actions: [
                          <Button text={'Нет'} action={() => store.appStore.closeModal()} variant={ButtonVariant.default} />,
                          <Button
                            text={'Удалить'}
                            action={async () => {
                              agent.Catalog.deleteCity(data.results.id).then(() => {
                                navigate('/account/references/cities', { replace: false })
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
                    className={'justify-self-end float-right'}
                    variant={ButtonVariant['accent-outline']}
                  />
                  <Button
                    text={'Сохранить'}
                    type={'submit'}

                    className={'justify-self-end float-right'}
                    disabled={!isValid}
                    variant={ButtonVariant.accent}
                  />
                {/* </div> */}
              </>
            }
            headerClassName={'flex gap-10'}

            header={
              <p>{data.results.name ? textData.editPageDesc : textData.createPageDesc}</p>
            }
          >
              <CreateInput
                  value={values.city}
                  name={dataCreate.inputs[0].fieldName}
                  action={() => console.log()}
                  text={dataCreate.inputs[0].label}
                  placeholder={dataCreate.inputs[0].placeholder}
                  type={dataCreate.inputs[0].type}
              />
              <Select
                  // value={values.timezone}
                  label={dataCreate.inputs[1].label}
                  placeholder={dataCreate.inputs[1].placeholder}
                  name={dataCreate.inputs[1].fieldName}
                  onOptionSubmit={(value) => setFieldValue(dataCreate.inputs[1].fieldName, value)}
                  defaultValue={values.timezone}
                  data={[
                      {
                          label: 'UTC+2 (Калининград)',
                          value: 'UTC+2',
                      },
                      {
                          label: 'UTC+3 (Москва)',
                          value: 'UTC+3',
                      },
                      {
                          label: 'UTC+4 (Самара)',
                          value: 'UTC+4',
                      },
                      {
                          label: 'UTC+5 (Екатеринбург)',
                          value: 'UTC+5',
                      },
                      {
                          label: 'UTC+6 (Омск)',
                          value: 'UTC+6',
                      },
                      {
                          label: 'UTC+7 (Красноярск)',
                          value: 'UTC+7',
                      },
                      {
                          label: 'UTC+8 (Иркутск)',
                          value: 'UTC+8',
                      },
                      {
                          label: 'UTC+9 (Якутск)',
                          value: 'UTC+9',
                      },
                      {
                          label: 'UTC+10 (Владивосток)',
                          value: 'UTC+10',
                      },
                      {
                          label: 'UTC+11 (Магадан)',
                          value: 'UTC+11',
                      },
                      {
                          label: 'UTC+12 (Камчатск)',
                          value: 'UTC+12',
                      },
                  ]}
              />
              <Select
                  // value={values.status}
                  onOptionSubmit={(value) => {
                    console.log(values);
                    setFieldValue(dataCreate.inputs[2].fieldName, value === "true")
                  }}
                  label={dataCreate.inputs[2].label}
                  placeholder={dataCreate.inputs[2].placeholder}
                  name={dataCreate.inputs[2].fieldName}
                  defaultValue={'true'}
                  data={[
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
