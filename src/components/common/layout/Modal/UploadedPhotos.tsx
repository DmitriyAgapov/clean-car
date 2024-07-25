import React from "react";
import { observer, Observer } from "mobx-react-lite";
import { FileButton, InputLabel } from "@mantine/core";
import BidImg from "components/common/layout/Modal/BidImg";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from "stores/store";
import { useFormContext } from "components/Form/FormCreateBid/FormCreateUpdateBid";
import Image from "components/common/ui/Image/Image";

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
		const formData = useFormContext()
		const img = formData.getValues().photo_new
		const handleDeleteImg = React.useCallback((props:any) => {
			const newphoto = formData.values.photo_new.filter((number:number, index:number) => index !== props);
			formData.setFieldValue('photo_new', newphoto)
		}, [formData.values.photo_new])

		const uploadedFiles = React.useMemo(() => {
			const _photos:any[] = []
			if(formData.values.photo_new && formData.values.photo_new?.length > 0) {
				// @ts-ignore
				formData.values.photo_new.forEach((el:File, index: number) => _photos.push(
					<BidImg
						id={index}
						closeAction={() => handleDeleteImg(index)}
						h={'100%'}
						key={index}
						item={URL.createObjectURL(el)}
						containerClassName={
							'max-h-[12rem] mobile:max-w-[50%] tablet:max-w-[33%]  desktop:max-w-[12.5%]  p-3'
						}
						className={'aspect-video hover:outline-accent hover:outline rounded cursor-pointer'}
					/>
					))
			}
			return _photos
		}, [img.length])

    return (
        <div
            className={`flex flex-col col-span-full ${!(store.bidsStore.formResult.company !== 0 && store.bidsStore.formResult.company !== null && store.bidsStore.formResult.company !== '0') ? 'pointer-events-none grayscale' : ''}`}
        >
            <InputLabel className={'col-span-2'}>Фотографии До</InputLabel>

            <div className={'flex-1 flex col-span-full -mx-3 mobile:flex-wrap'}>
                {uploadedFiles}
            </div>
            {img?.length < 2 && (
                <p className={'col-span-2'}>Пожалуйста, прикрепите минимум 2 фото</p>
            )}
            <div className={''}>
                <p className={'text-xs mb-0 mt-2'}>
                    Загружено <span className={'text-accent text-lg'}>{img?.length}/</span>
                    <span className={'text-gray-1 text-lg'}>8</span>
                </p>
            </div>
        </div>
    )
}
export const UploadedPhotosFinishedWork = () => {
    const store = useStore()
		const formData = useFormContext()
		const img = formData.getValues().photo_new
		const handleDeleteImg = React.useCallback((props:any) => {
			const newphoto = formData.values.photo_new.filter((number:number, index:number) => index !== props);
			formData.setFieldValue('photo_new', newphoto)
		}, [formData.values.photo_new])

		const uploadedFiles = React.useMemo(() => {
			const _photos:any[] = []
			if(formData.values.photo_new && formData.values.photo_new?.length > 0) {
				// @ts-ignore
				formData.values.photo_new.forEach((el:File, index: number) => _photos.push(
					<BidImg
						id={index}
						closeAction={() => handleDeleteImg(index)}
						h={'100%'}
						key={index}
						item={URL.createObjectURL(el)}
						containerClassName={
							'max-h-[12rem] mobile:max-w-[50%] tablet:max-w-[33%]  desktop:max-w-[12.5%]  p-3'
						}
						className={'aspect-video hover:outline-accent hover:outline rounded cursor-pointer'}
					/>
					))
			}
			return _photos
		}, [img.length])

    return (
        <div
            className={`flex flex-col col-span-full ${!(store.bidsStore.formResult.company !== 0 && store.bidsStore.formResult.company !== null && store.bidsStore.formResult.company !== '0') ? 'pointer-events-none grayscale' : ''}`}
        >
            <InputLabel className={'col-span-2'}>Фотографии До</InputLabel>

            <div className={'flex-1 flex col-span-full -mx-3 mobile:flex-wrap'}>
                {uploadedFiles}
            </div>
            {img?.length < 2 && (
                <p className={'col-span-2'}>Пожалуйста, прикрепите минимум 2 фото</p>
            )}
            <div className={''}>
                <p className={'text-xs'}>
                    Загружено <span className={'text-accent text-lg'}>{img?.length}/</span>
                    <span className={'text-gray-1 text-lg'}>8</span>
                </p>
            </div>
        </div>
    )
}
