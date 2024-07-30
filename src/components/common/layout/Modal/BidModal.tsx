import { CloseIcon, FileButton, Image, Modal, Text } from "@mantine/core";
import React from "react";
import { observer, Observer } from "mobx-react-lite";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from "stores/store";
import styles from "./Modal.module.scss";
import { SvgClose } from "components/common/ui/Icon";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { useParams, useRevalidator } from "react-router-dom";
import BidImg from "components/common/layout/Modal/BidImg";
import { BidsStatus, BidsStore } from 'stores/bidsStrore'
import { useSWRConfig } from "swr";

const BidModal = (props: { opened: boolean; onClose: () => void; update: () => void}) => {
	const store = useStore()
	const params = useParams()
	const [temp, setTemp] = React.useState<File[]>([])
	const handleChangeBidStatus = React.useCallback(   (status: BidsStatus) => {
			store.bidsStore.sendFiles(temp, false, params.id, params.company_id)
				.then(() => {
					if (params.company_id && params.id) {
					 store.bidsStore.updateBitStatus(params.company_id, params.id, status, store.bidsStore.PhotoId)
						 .then(r =>  {
							 if(r && r.data) {
								 store.bidsStore.clearPhotos()
								 props.update.call(this)
							 }
						 })
					}
				}
			).finally(props.onClose)

	}, [temp, params])
	const handleDeleteImg = React.useCallback((props:any) => {
		// @ts-ignore
		const newphoto = temp.filter((number:number, index:number) => index !== props);
		setTemp(newphoto)
	}, [temp])
	const uploadedFiles = React.useMemo(() => {
		const _photos:any[] = []
		if(temp && temp.length > 0) {
			// @ts-ignore
			temp.forEach((el:File, index: number) => _photos.push(
				<BidImg
			company_id={params.company_id} h={'4rem'}   w={'4rem'}
				id={index}
					closeAction={() => handleDeleteImg(index)}
					key={index}
					item={URL.createObjectURL(el)}
					containerClassName={'max-h-[12rem] mobile:max-w-[50%] tablet:max-w-[33%]  desktop:max-w-[12.5%]  p-3'}
					className={'aspect-video hover:outline-accent hover:outline rounded cursor-pointer'}
				/>
			))
		}
		return _photos
	}, [temp.length])
	const [isSubmitting, setIsSubmitting] = React.useState(false)

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
					<div className={'grid grid-cols-3  gap-4 col-span-full'}>
						<div className={'flex col-span-2  gap-3 items-center col-span-full justify-items-center my-8'}>
							{uploadedFiles}
						</div>
						<footer className={'col-span-full'}>
							<FileButton
								onChange={(e) => {
									const _ar:any[] = [...temp]
									e.forEach((i:any) => _ar.push(i))
									setTemp(_ar)
								}}
								multiple
								accept='image/png,image/jpeg'
							>
								{(props) => (
									<Button
										className={'col-span-1'}
										type={'button'}
										variant={ButtonVariant['accent-outline']}

										disabled={
											temp.length > 7
										}
										{...props}
										text={'Добавить фото'}
									></Button>
								)}
							</FileButton>
							<Button  text={'Завершить заявку'}    loading={isSubmitting} variant={ButtonVariant.accent} type={"button"}  disabled={temp.length < 2} action={() => {
								setIsSubmitting(true)
								handleChangeBidStatus(BidsStatus["Выполнена"])
							}}/>
						</footer>
					</div>
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	)
}
export default observer(BidModal)
