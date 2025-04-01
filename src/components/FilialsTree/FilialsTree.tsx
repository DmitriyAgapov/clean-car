import React from 'react';
import styles from './FilialsTree.module.scss';
import { transformCompaniesToTree } from "utils/utils";
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

const LeafFilial = ({ data, className, company_type }:{data: any, company_type: string, className?: string | undefined}):any=> {
	console.log(data);
	if (data) {
		const res = []
		if(data.parent && data.parent.id) {
			res.push(
				<li className={className} key={data.parent.id + "_" + data.id}>
					<Link className={'hover:text-accent'} to={`/account/filials/${company_type}/${data.parent.id}/${data.id}`}>{data.name}</Link>
					<LeafFilial company_type={company_type} data={data.parent} className={"*:ml-4 my-2"}/>
				</li>
			);
		}
		if(data.parent == null) {
			res.push(
				<li className={className} key={"parent_" + data.id}>
					<Link className={'hover:text-accent'} to={`/account/companies/${company_type}/${data.id}`}>{data.name}</Link>
				</li>
			);
		}

		return <ul >{res}</ul>
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
