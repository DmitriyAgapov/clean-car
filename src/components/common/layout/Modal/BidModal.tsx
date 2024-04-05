import { CloseIcon, FileButton, Image, Modal, Text } from "@mantine/core";
import React from "react";
import { Observer } from "mobx-react-lite";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from "stores/store";
import styles from "./Modal.module.scss";
import { SvgClose } from "components/common/ui/Icon";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { useParams, useRevalidator } from "react-router-dom";
import BidImg from "components/common/layout/Modal/BidImg";
import { BidsStatus } from "stores/bidsStrore";
import { useSWRConfig } from "swr";

export function BidModal(props: { opened: boolean; onClose: () => void;}) {
	const store = useStore()
	let revalidator = useRevalidator()
	const { mutate } = useSWRConfig()
	const params = useParams()
	const handleChangeBidStatus = React.useCallback((status: BidsStatus) => {

		(async () => {
			console.log('status', store.bidsStore.PhotoId)
			if (params.company_id && params.id) {
				await store.bidsStore.updateBitStatus(params.company_id, params.id, status, store.bidsStore.PhotoId).finally(() => store.bidsStore.clearPhotos())
				console.log(`bids/${params.company_id}/${params.id}`);
				await mutate(`bids/${params.company_id}/${params.id}`)
				revalidator.revalidate()

			}
		})()
	}, [])
	const memoFileUpload = React.useMemo(() => {
		console.log(store.bidsStore.getPhotos.filter((p:any) => !p.is_before).length === 0);
		return <Observer
			children={() => (<div className={'grid grid-cols-3  gap-4 col-span-full'}>


				<div className={'flex col-span-2  gap-3 items-center col-span-full justify-items-center my-8'}>
					{store.bidsStore.getPhotos.map(
						(item: any, index: number) => <BidImg company_id={params.company_id} h={'4rem'}
							w={'4rem'} key={index} item={item} />,
					)}
					{store.bidsStore.photo.photosPreviewAr.map(
						(item: any, index: number) => (
							<div className={'group max-w-[6rem] relative'}>
								<CloseIcon
									onClick={() => {
										if(params.company_id) {
											store.bidsStore.removeFile(params.company_id, item.name)
										}}}
									className={
										'bg-white cursor-pointer group-hover:text-white group-hover:bg-accent  border-1 text-gray-2 absolute right-0 top-0 block rounded-full !w-4 !h-4'
									}
								/>
								<Image src={item.result} h={'4rem'} w={'4rem'} style={{objectFit: "cover"}} alt={String(item.name)} />
							</div>
						),
					)}
				</div>

				<footer className={'col-span-full'}>
					<FileButton onChange={(e) => store.bidsStore.sendFiles(e, false, params.id, params.company_id)} multiple accept='image/png,image/jpeg'>
					{(props) => (
						<Button
							className={'col-span-1'}
							variant={ButtonVariant['accent-outline']}
							size={ButtonSizeType.base}
							{...props}
							text={'Добавить фото'}
						></Button>
					)}
				</FileButton>
					<Button type={'button'} text={'Завершить заявку'} variant={ButtonVariant.accent}  disabled={store.bidsStore.getPhotos.filter((p:any) => !p.is_before).length === 0} action={() => {
						handleChangeBidStatus(BidsStatus["Выполнено"])
						props.onClose()
					}}/>
				</footer>
			</div>)}   />
	}, [store.bidsStore.getPhotos])

	return (
		<Modal.Root size={685} opened={props.opened} onClose={props.onClose} centered>
			<Modal.Overlay className={'bg-black/80'}/>
			<Modal.Content radius={20} className={styles.ModalBid}>
				<Modal.Header className={'static '}>
					<Modal.Title><Heading className={'!mb-0'} color={HeadingColor.accent} text={'Завершение заявки'} variant={HeadingVariant.h2}/></Modal.Title>
					<Modal.CloseButton className={"hover:rotate-90 hover:bg-transparent transition-all absolute top-5 right-5"} icon={<SvgClose className={'close__modal'} />}/>
				</Modal.Header>
				<Modal.Body>
				<Text className={''}>Для завершения заявки, загрузите фото после, минимум 2 штуки</Text>
				{memoFileUpload}
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	)
}
