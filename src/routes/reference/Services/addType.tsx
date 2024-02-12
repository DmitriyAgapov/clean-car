import { Form, Formik, FormikHelpers } from "formik";
import { CreateFormikInput } from "components/common/ui/CreateInput/CreateInput";
import React, { useEffect, useState } from "react";
import SelectCustom from "components/common/ui/Select/Select";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import agent from "utils/agent";
import { useStore } from "stores/store";
import { useNavigate, useRevalidator } from "react-router-dom";


const AddType = ({ id, subtype_id, edit = false, data }: { id: number,   edit?: boolean, data?: any ,subtype_id?: number}) => {
	let revalidator = useRevalidator();
	const [init, setInit] = useState<{name: string, is_active: boolean}| any>(null)
	useEffect(() => {
		if (edit) {
			agent.Catalog.getServiceSubtype(subtype_id as number).then((r:any) => setInit(r.data));
		}
	}, [edit]);
	const store = useStore();
	const navigate = useNavigate();
	const initValues = {
		subtypeName: edit ? data.subtypeName : "",
		status: edit ? data.status : "",
		service_type: id
	};
	return (
		<Formik initialValues={(edit && init) ? data : initValues}
			onSubmit={(values, submitForm) => {
				console.log(values);
			}}>
			{({ errors, touched, values, submitForm, isValid }) => (
				<Form className={"grid gap-4"}>
					<CreateFormikInput fieldName={"subtypeName"}
						placeholder={"Введите название"}
						fieldType={"text"}
						label={"Название опции"} />
					<SelectCustom value={values.status} name={"status"}
						options={[
							{ label: "Активно", value: "true" },
							{ label: "Неактивно", value: "false" }
						]}
						label={"Выберите статус"} />
					<footer className={"pt-8 mt-auto"}>
						<Button text={"Отменить"}
							action={() => store.appStore.closeModal()}
							variant={ButtonVariant.default} />
						<Button text={"сохранить"}
							action={async () => {
								//@ts-ignore
								if (edit) {
									await agent.Catalog.editSubtype({id: id, subtype_id: Number(values.service_type),  name: values.subtypeName, is_active: values.status === "true"}).then(() => {
										revalidator.revalidate();
										// navigate(`/account/references/services/${id}`, { replace: true })
									}).finally(() => store.appStore.closeModal());
								} else {
									await agent.Catalog.createSubtype(Number(id), values.subtypeName, values.status === "true").then(() => {
										revalidator.revalidate();
									}).finally(() => store.appStore.closeModal());
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
export default AddType;
