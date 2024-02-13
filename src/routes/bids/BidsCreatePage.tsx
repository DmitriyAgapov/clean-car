import { useStore } from "stores/store";
import { Navigate, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { PermissionNames } from "stores/permissionStore";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelVariant } from "components/common/layout/Panel/Panel";
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { SvgBackArrow } from "components/common/ui/Icon";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import React from "react";
import FormCreateBid from "components/Form/FormCreateBid/FormCreateBid";

const BidsCreatePage = (props:any) => {
	const store = useStore()
	const location = useLocation()
	const navigate = useNavigate()

	const { data, page, pageRequest, loading, textData }: any = useLoaderData()

	if(!store.userStore.getUserCan(PermissionNames["Управление заявками"], 'create')) return <Navigate to={'/account'}/>
	return (
		<Section type={SectionType.default}>
			<Panel variant={PanelVariant.withGapOnly} headerClassName={'flex justify-between'} state={loading} header={<>
				<div>
					<Button text={<><SvgBackArrow />{textData.createPageBack}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() => navigate(-1)} variant={ButtonVariant.text} />
					<Heading text={!props.edit ? textData.createPage : textData.editPage} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} />
				</div>
				{store.userStore.getUserCan(PermissionNames['Управление заявками'], 'create') && (<>
					<Button text={textData.fillTemplate} action={() => {
						store.bidsStore.formResultsClear()
						navigate('create')
					}} trimText={true} className={'inline-flex'} directory={ButtonDirectory.directory} size={ButtonSizeType.sm} />
				</>)}
			</>}>
			</Panel>
			<FormCreateBid />

		</Section>
	)
}
export default BidsCreatePage
