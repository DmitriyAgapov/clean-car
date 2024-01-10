import React, { useEffect, useState } from 'react'
import styles from "./RequestErrors.module.scss";
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import { useFormikContext } from 'formik'

type RequestErrorsProps = {}
const RequestErrors = () => {
	const store = useStore()
const {setFieldError, setErrors, errors} = useFormikContext();
	const [errorsComp, setErrorsComp] = useState<any>(null)
		function handleCheckErrors(err:any) {
			let ar: any[] = []
			if (store.usersStore.loadingErrors !== '') {
				const temp = Array.from(Object.entries(err))
				if (temp && temp.length > 0) {
					ar = temp.map((item: any) => {
						setFieldError(item[0], item[1])
						return <div className={''}>{item[1]}</div>
					})
				}
			}
			if(ar.length > 0) setErrorsComp(ar)
		}
		React.useEffect(() => {
			// console.log('store.usersStore.loadingErrors', store.usersStore.loadingErrors);
			handleCheckErrors(store.usersStore.loadingErrors)
		},[store.usersStore.loadingErrors])

		// if(errorsComp && errorsComp.length > 0) return (<div className={'text-red-500 flex-[1_100%] -order-1 text-right'}>{errorsComp}</div>)
		return null
	}
export default observer(RequestErrors);
