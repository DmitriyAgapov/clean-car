import { CloseIcon, FileButton, Image, InputLabel, Modal, Text } from "@mantine/core";
import React from "react";
import { Observer } from "mobx-react-lite";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from "stores/store";
import styles from "./Modal.module.scss";
import { SvgClose } from "components/common/ui/Icon";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { useParams } from "react-router-dom";

export function BidModal(props: { opened: boolean; onClose: () => void;}) {
	const store = useStore()
	const params = useParams()
	const memoFileUpload = React.useMemo(() => {
		return <Observer
			children={() => (<div className={'grid grid-cols-3  gap-4 col-span-full'}>


				<div className={'flex col-span-2  gap-3 items-center justify-items-center my-8'}>
					{store.bidsStore.photo.photosPreviewAr.map(
						(item: any, index: number) => (
							<div className={'group max-w-[6rem] relative'}>
								<CloseIcon
									onClick={() => store.bidsStore.removeFile(item.name)}
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
					<FileButton onChange={store.bidsStore.addFiles} multiple accept='image/png,image/jpeg'>
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
					<Button text={'Завершить заявку'} variant={ButtonVariant.accent} action={() => store.bidsStore.uploadPhotos(false, params.company_id as string, params.id as string).then(r => {
						store.bidsStore.loadBidPhotos(params.company_id as string, params.id as string)
						.then(() => props.onClose())
					})}/>
				</footer>
			</div>)}   />
	}, [])

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
