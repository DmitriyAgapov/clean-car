import React from "react";
import styles from "./DataListInput.module.scss";

type DataListInputProps = {}
const DataListInput = ({ label, name, values}: {label: string, name: string, values: any[]}) => {
	return (<div className={styles.DataListInput}>
		<label htmlFor={name}>{label}
			<input list={name + "-list"} id={name} name={name} />
		</label>
		<datalist id={name + "-list"}>
			{values.map((v, index) => <option value={v} key={v + index}>{v}</option>)}

		</datalist>

	</div>);
};

export default DataListInput;
