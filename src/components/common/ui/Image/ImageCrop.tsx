import React, { ChangeEvent, useState, useRef, useEffect } from 'react';
import { getMimeType } from 'advanced-cropper/extensions/mimes';
import { Cropper, CropperRef, ImageRestriction  } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css';
import { FileButton, Button } from '@mantine/core'
import { observer } from 'mobx-react-lite';
import { useStore } from "stores/store";

interface Image {
    type?: string
    src: string
}

const ImageCrop = observer(() => {
    const store = useStore()
    const inputRef = useRef<HTMLInputElement>(null)
    const cropperRef = useRef<CropperRef>(null)
    const { image } = store.userStore.myProfileState;

    const onUpload = () => {
        const canvas = cropperRef.current?.getCanvas();
        if (canvas) {
            const form = new FormData();
            canvas.toBlob((blob) => {
                if (blob) {
                    form.append('file', blob);
                    fetch('https://dev.server.clean-car.net/api/accounts/update_avatar/', {
                        method: 'PUT',
                        body: form,
                    });
                }
            }, 'image/jpeg');
        }
    };

    // @ts-ignore
    const defaultSize = ({ imageSize, visibleArea }) => {
        console.log(imageSize, visibleArea)
        return {
            width: (visibleArea || imageSize).width,
            height: (visibleArea || imageSize).height,
        };
    }
    useEffect(() => {
        // @ts-ignore
        if(cropperRef && cropperRef.current) store.userStore.cropperRef = cropperRef
    }, [cropperRef]);

    useEffect(() => {
        //@ts-ignore
            cropperRef && cropperRef.current && cropperRef.current.refresh()

        // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
        return () => {
            if (image && image.src) {
                URL.revokeObjectURL(image.src)
            }
        }
    }, [image])
	return (
        <div className='upload-example mx-auto' style={{ aspectRatio: "4 / 3", height: "auto"}}>
            <Cropper  className="upload-example__cropper" ref={cropperRef} src={image && image.src}  stencilProps={{
	            aspectRatio: 1/1,

            }}/>
            {/* <div className='buttons-wrapper'> */}
            {/*     <FileButton */}
	          {/*       // @ts-ignore */}
	          {/*       onChange={store.userStore.onLoadImage} accept='image/png,image/jpeg'> */}
            {/*         {(props:any) => ( */}
            {/*             <Button  {...props}  className="button">Upload image</Button> */}
            {/*         )} */}
            {/*     </FileButton> */}
            {/*     /!* <button className='button' onClick={onUpload}> *!/ */}
            {/*     /!*     <input ref={inputRef} type='file' accept='image/*' onChange={onLoadImage} /> *!/ */}
            {/*     /!*     Upload image *!/ */}
            {/*     /!* </button> *!/ */}
            {/* </div> */}
        </div>
    )
})
export default ImageCrop
