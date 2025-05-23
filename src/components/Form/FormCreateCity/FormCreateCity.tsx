import { Form, Formik, FormikHelpers } from "formik";
import React from 'react'
import { Await, useLoaderData, useLocation, useNavigate, useParams, useRevalidator } from "react-router-dom";
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
import { textDataCities } from "routes/reference/City/cities";
import { mutate, useSWRConfig } from "swr";
import { backToUrlLevel, logger } from "utils/utils";
import PanelForForms from "components/common/layout/Panel/PanelForForms";
const dataCreate = {
    initValues: {
      id: 0,
        city: '',
        timezone: '',
        status: "true",
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
                    label: 'Активен',
                    value: 'true',
                },
                {
                    label: 'Неактивен',
                    value: 'false',
                },
            ],
        },
    ],
}
const FormCreateCity = (props: any) => {

  const location = useLocation()
  const navigate = useNavigate()
  const revalidator = useRevalidator();
  const store = useStore()
  const params = useParams()
  const editStatus = props?.edit ?? false
  const  editInitValues = {
          id: props.id,
          city: props.city,
          timezone: props.timezone,
          status: props.is_active === "true",
  }
  // console.log(`refCity_${params.id}`);
  // console.log(props);
  const {mutate} = useSWRConfig()
  // console.log(editInitValues);
  return (

      <Formik  initialValues={editStatus ? editInitValues : dataCreate.initValues}  validationSchema={dataCreate.validateSchema}
        onSubmit={async (values, isSubmitting) => {
          // console.log(values.status, 'values', values);
          const _status = typeof values.status === "boolean" ? values.status : values.status == "true"
            if(location.pathname.includes('edit')) {
              textDataCities.editAction(values.id, values.city, _status, values.timezone)
              .then((r: any) => {
                if(r.status === 200) {

                  mutate(`@"refCity_2","2"`, {name: r.data.name}).then(r => {
                    // console.log('mutate', `@"refCity_2","2"`);
                    // console.log('mutated', `/catalog/cities/${params.id}/retrieve/`);
                  })
                  store.catalogStore.getAllCities().then(() => console.log('cities updated')).then(() => {
                    revalidator.revalidate()
                    navigate(`${location.pathname.split('/').slice(0, location.pathname.split('/').length - 1).join('/')}`)
                  })
                }
              })
            } else {
              textDataCities.createAction(values.city, _status, values.timezone)
              .then((r: any) => {
                if(r.status === 201) {
                  revalidator.revalidate()
                  mutate(`/catalog/cities/${params.id}/retrieve/`)
                  store.catalogStore.getAllCities().then(() => console.log('cities updated')).then(() => {
                    revalidator.revalidate()
                    mutate(`refCity_${params.id}`).then(r => navigate(`${location.pathname.split('/').slice(0, location.pathname.split('/').length - 1).join('/')}`))
                  })
                }
              })
            }
        }}>
        {({ errors, setFieldValue, touched,isSubmitting, values, submitForm,isValid }) => (
          <Form  style={{display: 'contents'}}>
          <PanelForForms
            state={false}
            className={'col-span-full grid grid-rows-[auto_1fr_auto] self-stretch'}

            background={PanelColor.glass}
            footerClassName={'!block px-8 !pb-8 !pt-2 tablet-max:px-5 tablet-max:pb-24'}
            bodyClassName={'ablet:grid gap-6 tablet:grid-cols-3 items-start'}
            actionBack={editStatus && <Button
              text={'Удалить'}
              action={async () => {
                store.appStore.setModal({
                  actions: [
                    <Button text={'Нет'} action={() => store.appStore.closeModal()} variant={ButtonVariant.default} />,
                    <Button
                      text={'Удалить'}
                      action={async () => {
                        agent.Catalog.deleteCity(props.id)
                        .then(() => {
                          navigate('/account/references/cities', { replace: false })
                        })
                        .finally(          () => store.appStore.closeModal())
                      }}
                      variant={ButtonVariant['accent-outline']}
                    />,
                  ],
                  text: `Вы уверены, что хотите удалить ${props.city}`,
                  state: true,
                })

              }}
              className={'justify-self-start mr-auto'}
            />}
            actionCancel={<Button
              text={'Отменить'}
              action={() => navigate(-1)}
              className={!editStatus ? 'mr-auto' : ''}
              variant={ButtonVariant.cancel}
            />}
            actionNext={ <Button
              text={'Сохранить'}
              type={'submit'}

              className={'justify-self-end float-right'}
              disabled={!isValid}
              variant={ButtonVariant.accent}
            />}

            headerClassName={'flex gap-10'}

            header={
              <p>{props.city ? textDataCities.editPageDesc : textDataCities.createPageDesc}</p>
            }
          >
              <CreateInput
                className={'pb-4'}
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
                  defaultValue={values.status.toString()}
                  data={[
                      {
                          label: 'Активен',
                          value: 'true',
                      },
                      {
                          label: 'Неактивен',
                          value: 'false',
                      },
                  ]}
              />

          </PanelForForms>
          </Form>
          )}

      </Formik>

  )
}
export default FormCreateCity
