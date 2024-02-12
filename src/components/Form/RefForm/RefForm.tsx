import { Form, Formik } from "formik";
import React from "react";
import { CreateField } from "components/Form/FormCreateCompany/Steps/StepSuccess";
import { CreateFormikInput } from "components/common/ui/CreateInput/CreateInput";

const RefForm = (data:any) => {
	return <Formik initialValues={data.initValues} onSubmit={data.onSubmit}>
		<Form>
			<CreateFormikInput label={'asd'} fieldName={'asd'} fieldType={'text'} placeholder={'asd'}/>
		</Form>
	</Formik>
}
export default RefForm
