import React from 'react';
import styles from './FilialsTree.module.scss';
import { flattenHierarchy, transformCompaniesToTree } from "utils/utils";
import { Link } from "react-router-dom";

type FilialsTreeProps = {
	data: never[] | undefined | {
		[key:string]: unknown,
		results: any[]
		data: {
			results: any[]
		}
	}
}
const Icon = () =>  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="m19 15-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"></path></svg>
const LeafFilial = ({ data, className, company_type }:{data: any, company_type: string, className?: string | undefined}):any=> {
	console.log();
	if (data) {
		const res = []
		const _ar = flattenHierarchy(data);
		for(const key in _ar){
			res.push(<li className={styles.li} key={_ar[key].name + _ar[key].id}><Icon/>{_ar[key].name}</li>)
		}
		// if(data.parent && data.parent.id) {
		// 	res.push(
		// 		<li className={className} key={data.parent.id + "_" + data.id}>
		// 			<Link className={'hover:text-accent'} to={`/account/filials/${company_type}/${data.parent.id}/${data.id}`}>{data.name}</Link>
		// 			<LeafFilial company_type={company_type} data={data.parent} className={"*:ml-4 my-2"}/>
		// 		</li>
		// 	);
		// }
		// if(data.parent == null) {
		// 	res.push(
		// 		<li className={className} key={"parent_" + data.id}>
		// 			<Link className={'hover:text-accent'} to={`/account/companies/${company_type}/${data.id}`}>{data.name}</Link>
		// 		</li>
		// 	);
		// }

		return <ul className={styles.tree}>{res}</ul>
	}
	return
}

const FilialsTree = (props: any) => {
	const {data} = props.data
	console.log(props.data)
	if(data && data.results) {
		const treeData = transformCompaniesToTree(data?.results);

	}


	return (
		<div className={styles.FilialsTree}>
			<LeafFilial company_type={props.company_type} data={{
				id: props.data?.id,
				name: props.data?.name,
				parent: props.data?.ancestors
			}}/>
		</div>
	);
};

export default FilialsTree;
