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
		{store.bidsStore.getPhotos.length === 0 && <p className={'col-span-2'}>Пожалуйста, прикрепите минимум 2 фото</p>}

		</div>
}
export default observer(UploadedPhotos)

export const UploadedPhotosFirstStep = () => {
	const store = useStore()
	return <div className={`flex flex-col col-span-full ${!(store.bidsStore.formResult.company !== 0 && store.bidsStore.formResult.company !== null && store.bidsStore.formResult.company !== "0") ? 'pointer-events-none grayscale' : ""}`}>
			<InputLabel className={'col-span-2'}>Фотографии До</InputLabel>

			<div className={'flex-1 flex col-span-full -mx-3 mobile:flex-wrap'}>
				{store.bidsStore.getPhotos.map(
					(item: any, index: number) => <BidImg  h={"100%"}
						 key={index} item={item} containerClassName={'max-h-[12rem] mobile:max-w-[50%] tablet:max-w-[33%]  desktop:max-w-[12.5%]  p-3'} className={'aspect-video hover:outline-accent hover:outline rounded cursor-pointer'}/>,
				)}
			</div>
		{store.bidsStore.getPhotos.length < 2 && <p className={'col-span-2'}>Пожалуйста, прикрепите минимум 2 фото</p>}
		<div className={''}>
			<p className={'text-xs'}>Загружено <span  className={'text-accent text-lg'}>{store.bidsStore.getPhotos.length}/</span><span className={'text-gray-1 text-lg'}>8</span></p>
		</div>

		</div>
}
