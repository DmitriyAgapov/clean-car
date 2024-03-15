import React from "react";
import { observer, Observer } from "mobx-react-lite";
import { FileButton, InputLabel } from "@mantine/core";
import BidImg from "components/common/layout/Modal/BidImg";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from "stores/store";

const UploadedPhotos = () => {
	const store = useStore()
	return <div className={`grid grid-cols-3  gap-4 col-span-full ${!(store.bidsStore.formResult.company !== 0 && store.bidsStore.formResult.company !== null && store.bidsStore.formResult.company !== "0") ? 'pointer-events-none grayscale' : ""}`}>
			<InputLabel className={'col-span-2'}>Фотографии До</InputLabel>

			<div className={'flex col-span-2  gap-3 items-center justify-items-center'}>
				{store.bidsStore.getPhotos.map(
					(item: any, index: number) => <BidImg h={'4rem'}
						w={'4rem'} key={index} item={item} />,
				)}
			</div>
			<p className={'col-span-2'}>Пожалуйста, прикрепите минимум 2 фото</p>
			<FileButton onChange={(e) => store.bidsStore.sendFiles(e, true)} multiple accept='image/png,image/jpeg'>
				{(props) => (
					<Button
						className={'col-span-1'}
						variant={ButtonVariant['accent-outline']}
						size={ButtonSizeType.sm}
						{...props}
						text={'Добавить фото'}
					></Button>
				)}
			</FileButton>
		</div>
}
export default observer(UploadedPhotos)
