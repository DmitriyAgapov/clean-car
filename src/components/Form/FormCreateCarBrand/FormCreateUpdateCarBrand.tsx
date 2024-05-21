import React from 'react'
import { Await,  useNavigate, useParams, useRevalidator } from "react-router-dom";
import * as Yup from "yup";
import { useStore } from "stores/store";
import { SelectCreatable } from "components/common/ui/CreatableSelect/CreatableSelect";
import { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import agent from "utils/agent";
import { CarType } from "stores/carStore";
import { textDataCars } from 'routes/reference/Cars/cars'
import { values as val } from 'mobx'
import { Select, TextInput } from '@mantine/core'
import { yupResolver } from "mantine-form-yup-resolver";
import { CreateCarBrandSchema } from "utils/validationSchemas";
import PanelForForms from 'components/common/layout/Panel/PanelForForms';
import { createFormContext } from '@mantine/form'
import { observer } from 'mobx-react-lite';
const dataCreate = {
  initValues: {
    brandId: 0,
    brand: 0,
    modelName: '',
    car_type: '',
  },
  validateSchema: Yup.object().shape({
    modelName: Yup.string(),
    car_type: Yup.string(),
  }),
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
export const [FormProvider, useFormContext, useForm] = createFormContext<any>()

const FormCreateUpdateCarBrand = (props: any) => {
  const store = useStore()
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
  let initValues:{
    id: null | number | string,
    brandId: number | string,
    brand: null | string,
    modelName: string,
    car_type: string
  } = {
    id: 0,
    brandId: 0,
    brand: null,
    modelName: '',
    car_type: '',
  }
  if(edit) {
    initValues = {
      id: params.id ? params.id : null,
      car_type: props.car_type,
      modelName: props.modelName,
      brand: props.brand,
      brandId: props.brandId
    }
  }
  const handleSubmit = React.useCallback((props:any) => {

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
  }, [])
  let revalidator = useRevalidator()
  const formData = useForm({
    name: 'FormCreateUpdateFilial',
    initialValues: initValues,
    validateInputOnBlur: true,
    onValuesChange: (values, previous) => console.log(values),
    validate: yupResolver(CreateCarBrandSchema),
    enhanceGetInputProps: (payload) => {
      return {
        className: 'mb-2 w-full flex-grow  !flex-[1_0_20rem]',
      }
    },
  })
  console.log(formData);
  // @ts-ignore
  return (

    <FormProvider form={formData}>
      <form onSubmit={formData.onSubmit(handleSubmit)} style={{display: 'contents'}}>
        <PanelForForms
          className={'col-span-full grid grid-rows-[auto_1fr_auto]'}
          variant={PanelVariant.textPadding}
          background={PanelColor.glass}
          bodyClassName={'grid gap-6 lg:grid-cols-3 items-start'}
          footerClassName={'!block px-8 !pb-8 !pt-2'}
          actionBack={<>{edit && <Button
            text={'Удалить'}
            action={async () => {
              store.appStore.setModal({
                actions: [
                  <Button text={'Нет'} action={() => store.appStore.closeModal()} variant={ButtonVariant.default} />,
                  <Button
                    text={'Удалить'}
                    action={async () => {
                      await agent.Catalog.deleteCarModel(Number(params.id))
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
            className={'justify-self-start !mr-auto'}
          />}
          {/*   <Button action={() => { */}
          {/*   formData.validate() */}
          {/*   console.log(formData.values) */}
          {/*   console.log(formData.errors) */}
          {/*   console.log(formData.isValid()) */}
          {/* }} text={'CHeck'}/> */}
          </>}
          actionCancel={<Button
            text={'Отменить'}
            action={() => navigate(-1)}
            className={'float-right'}
            variant={ButtonVariant.cancel}
          />}
          actionNext={<Button
            text={'Сохранить'}
            type={'submit'}
            // action={submitForm}
            className={'float-right'}
            disabled={!formData.isValid()}
            variant={ButtonVariant.accent}
          />}
          headerClassName={'flex gap-10'}
          header={
            <Await resolve={brand}>
              <p>{
                // @ts-ignore
                store.catalogStore.getCurrentCarModelWithBrand && store.catalogStore.getCurrentCarModelWithBrand.name ? textDataCars.editPageDesc : textDataCars.createPageDesc}</p>
            </Await>
          }
        >
          <SelectCreatable       {...formData.getInputProps('brand')} defaultValue={props?.edit ? props.brand : null} items={val(store.catalogStore.carBrands).map((item:any)=> ({label: item.name, value: String(item.id)}))} createAction={(e) => formData.setFieldValue('brandId', Number(e.id))} label={formData.values.brand !== null ? 'Создать марку' : 'Марка'}/>
          <TextInput       {...formData.getInputProps('modelName')}  defaultValue={props?.edit ? props.modelName : null} placeholder={dataCreate.inputs[1].placeholder} name={dataCreate.inputs[1].fieldName}  type={'text'} label={dataCreate.inputs[1].placeholder}/>
          <Select       {...formData.getInputProps('car_type')}  withCheckIcon={false}   required onChange={(e) =>  formData.setFieldValue('car_type', e)} defaultValue={props?.edit ? props.car_type : null} label={dataCreate.inputs[2].label} placeholder={dataCreate.inputs[2].placeholder} name={dataCreate.inputs[2].fieldName} data={result.map((item) => ({
            label: item.label,
            value: String(item.value)
          }))}/>
        </PanelForForms>
      </form>
    </FormProvider>
  )
}
export default observer(FormCreateUpdateCarBrand)
