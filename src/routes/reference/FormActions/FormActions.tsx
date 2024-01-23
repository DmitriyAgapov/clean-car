import { Button } from "@mantine/core";
import React from 'react'
const FormActions = (props:any) => {
	return (
		<>
			<Button type={'reset'} name={'suymbit'} >reset</Button>
			<Button type={'submit'} name={'suymbit'} >sumbit</Button>
		</>
	)
}
export default FormActions
