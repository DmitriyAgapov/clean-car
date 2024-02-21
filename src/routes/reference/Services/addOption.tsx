import { Form, Formik, FormikHelpers } from "formik";
import { CreateFormikInput } from "components/common/ui/CreateInput/CreateInput";
import React, { useEffect, useState } from "react";
import SelectCustom from "components/common/ui/Select/Select";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import agent from "utils/agent";
import { useStore } from "stores/store";
import { useNavigate, useRevalidator } from "react-router-dom";
import { Select } from "@mantine/core";


const AddOption = ({ id, subtype_id, edit = false, data }: { id: number,  edit?: boolean, data?: any ,subtype_id?: number}) => {
	let revalidator = useRevalidator();
	const [init, setInit] = useState<{name: string, is_active: boolean}| any>(null)

	useEffect(() => {
		if (edit) {
			agent.Catalog.getServiceOption(id).then((r:any) => setInit(r.data));
		}
	}, [edit]);
	const store = useStore();
	const navigate = useNavigate();
	const initValues = {
		subtypeName: edit ? data.subtypeName : "",
		status: edit ? data.status : "true",
		subtype_id: subtype_id
	};

	return (
		<Formik initialValues={(edit && init) ? data : initValues}
			onSubmit={(values, submitForm) => {

			}}>
			{({ errors, touched,setFieldValue, values, submitForm, isValid }) => (
				<Form className={"grid gap-4"}>
					<CreateFormikInput fieldName={"subtypeName"}
						placeholder={"Введите название"}
						fieldType={"text"}
						label={"Название опции"} />
					<Select onOptionSubmit={(e) => setFieldValue('status', e)} defaultValue={values.status}  name={"status"}
						data={[
							{ label: "Активно", value: "true" },
							{ label: "Неактивно", value: "false" }
						]}
						label={"Выберите статус"} />
					<footer className={"pt-8"}>
						<Button text={"Отменить"}
							action={() => store.appStore.closeModal()}
							variant={ButtonVariant.default} />
						<Button text={"сохранить"}
							action={async () => {
								//@ts-ignore
								if (edit) {
									await agent.Catalog.editServiceOption({id: id, subtype_id: Number(values.subtype_id),  name: values.subtypeName, is_active: values.status === "true"}).then(() => {
										revalidator.revalidate();
									}).finally(() => {
										revalidator.revalidate();
										store.appStore.closeModal()
									});
								} else {

									await agent.Catalog.createServiceOption({id: id, subtype_id: Number(values.subtype_id),  name: values.subtypeName, is_active: values.status === "true"}).then(() => {
										revalidator.revalidate();
										// navigate(`/account/references/services/${id}/${values.service_type}`, { replace: true })
									}).finally(() => {
										revalidator.revalidate();
										store.appStore.closeModal()
									});
								}
							}
							}
							variant={ButtonVariant["accent-outline"]} />
					</footer>
				</Form>
			)}
		</Formik>
	);
}
export default AddOption;
