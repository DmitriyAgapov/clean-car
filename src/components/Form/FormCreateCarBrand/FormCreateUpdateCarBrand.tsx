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
import { useLocalStore } from "stores/localStore";
import { SvgLoading } from "components/common/ui/Icon";
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

const FormCreateUpdateCarBrand = () => {
  const localStore = useLocalStore()
  console.log(localStore.data);
  const data = localStore.getData
  console.log(data);

  const store = useStore()
  const params = useParams()
  const brand = store.catalogStore.getCurrentCarModelWithBrand
  const navigate = useNavigate()

  const result = (Object.keys(CarType) as (keyof typeof CarType)[]).map(
    (key, index) => {
      return {
        label: CarType[key],
        value: CarType[key]
      };
    },
  );
  let initValues = React.useMemo(()=> {

    let _initValues: {
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
    if (data && data.edit) {
      _initValues = {
        id: params.id ? params.id : null,
        car_type: data.car_type,
        modelName: data.name,
        brand: data.brand.name,
        brandId: data.brand.id
      }
    }
    return _initValues
  }, [data, localStore.isLoading, params.id])


  let revalidator = useRevalidator()
  const formData = useForm({
    name: 'FormCreateUpdateCarReference',
    initialValues: initValues,
    validateInputOnBlur: true,
    onValuesChange: (values, previous) => console.log(values),
    validate: yupResolver(CreateCarBrandSchema),
    enhanceGetInputProps: (payload) => {
      // if(payload.field === "brand") {
      //   return ({
      //     defaultValue: "1"
      //   })
      // }
      return {
        className: 'mb-2 w-full flex-grow  !flex-[1_0_20rem]',
      }
    },
  })
  React.useEffect(() => {
    if(data && !localStore.isLoading) {
      formData.setValues({
        id: data.id ? data.id : null,
        car_type: data.car_type,
        modelName: data.name,
        brand: data.brand?.name,
        brandId: data.brand?.id
      })
    }
  }, [data, localStore])

  const handleSubmit = React.useCallback(() => {

    // @ts-ignore
    if(!data.edit) {
      store.catalogStore.createCarBrand({ car_type: formData.values.car_type, model: formData.values.modelName, brandId: formData.values.brandId, brandName: typeof formData.values.brand === "string" ? formData.values.brand : null})
      .then(r => r)
      .then((r) => {
        if(r && r.status < 399) {
          // revalidator.revalidate();
          navigate(`/account/references/car_brands/${r?.data.id}`)
        }
      })
    } else {

      const modelId = params.id;
      // @ts-ignore
      store.catalogStore.updateCarBrandNew({id: modelId, car_type:formData.values.car_type, model: formData.values.modelName, brandId: formData.values.brandId, brandName: typeof formData.values.brand === "string" ? formData.values.brand : null})
      .then(r => r)
      .then((r) => {
        if(r && r.status < 399) {
          // revalidator.revalidate();
          navigate(`/account/references/car_brands/${r?.data.id}`)
        }
      })    //

    }
  }, [formData.values, params])
  if(localStore.isLoading) return <SvgLoading/>
  // @ts-ignore
  return (

    <FormProvider form={formData}>
      <PanelForForms className={'col-span-full tablet:grid grid-rows-[auto_1fr_auto]'}
        variant={PanelVariant.textPadding}
        background={PanelColor.glass}
        bodyClassName={'tablet:grid gap-6 tablet:grid-cols-3 items-start'}
        footerClassName={'!block px-8 !pb-8 !pt-2 tablet-max:px-5 tablet-max:pb-24'}
        actionBack={<>{data.edit && <Button text={'Удалить'}
          action={async () => {
            store.appStore.setModal({
              actions: [
                <Button text={'Нет'}
                  action={() => store.appStore.closeModal()}
                  variant={ButtonVariant.default} />,
                <Button text={'Удалить'}
                  action={async () => {
                    await agent.Catalog.deleteCarModel(Number(params.id)).then((r) => {
                      console.log(r)
                    }).catch((errors) => console.log(errors)).finally(() => {
                      navigate('/account/references/car_brands', { replace: false })
                      store.appStore.closeModal()
                    })
                  }}
                  variant={ButtonVariant['accent-outline']} />,
              ],
              //@ts-ignore
              text: `Вы уверены, что хотите удалить ${brands} ${modelName}`,
              state: true,
            })
          }}
          className={'justify-self-start !mr-auto'} />}
          {/*   <Button action={() => { */}
          {/*   formData.validate() */}
          {/*   console.log(formData.values) */}
          {/*   console.log(formData.errors) */}
          {/*   console.log(formData.isValid()) */}
          {/* }} text={'CHeck'}/> */}
        </>}
        actionCancel={<Button text={'Отменить'}
          action={() => navigate(-1)}
          className={'float-right'}
          variant={ButtonVariant.cancel} />}
        actionNext={<Button text={'Сохранить'}
          type={'button'}
          action={handleSubmit}
          className={'float-right'}
          disabled={!formData.isValid()}
          variant={ButtonVariant.accent} />}
        headerClassName={'flex gap-10'}
        header={
          <Await resolve={brand}>
            <p>{
              // @ts-ignore
              store.catalogStore.getCurrentCarModelWithBrand && store.catalogStore.getCurrentCarModelWithBrand.name ? textDataCars.editPageDesc : textDataCars.createPageDesc}</p>
          </Await>
        }>

        <form
          style={{ display: 'contents' }}>
          <SelectCreatable       {...formData.getInputProps('brand')}
            defaultValue={data.edit ? initValues.brand : null}
            items={val(store.catalogStore.carBrands).map((item: any) => ({ label: item.name, value: String(item.id) }))}
            createAction={(e) => formData.setFieldValue('brandId', Number(e.id))}
            label={data && data.brand ? 'Создать марку' : 'Марка'} />
          <TextInput       {...formData.getInputProps('modelName')}
            // defaultValue={props?.edit ? props.modelName : null}
            placeholder={dataCreate.inputs[1].placeholder}
            name={dataCreate.inputs[1].fieldName}
            type={'text'}
            label={dataCreate.inputs[1].placeholder} />
          <Select       {...formData.getInputProps('car_type')}

            // onChange={(e) => formData.setFieldValue('car_type', e)}
            // defaultValue={props?.edit ? props.car_type : null}
            label={dataCreate.inputs[2].label}
            placeholder={dataCreate.inputs[2].placeholder}
            name={dataCreate.inputs[2].fieldName}
            data={result.map((item) => ({
              label: item.label,
              value: String(item.value)
            }))} />
        </form>
      </PanelForForms>

    </FormProvider>
  )
}
export default observer(FormCreateUpdateCarBrand)
