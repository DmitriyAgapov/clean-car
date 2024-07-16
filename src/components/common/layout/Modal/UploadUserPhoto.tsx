import { Modal, NumberInput, Select, Textarea } from '@mantine/core'
import React from 'react'
import { useStore } from 'stores/store'
import styles from './Modal.module.scss'
import { SvgClose } from 'components/common/ui/Icon'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { useForm } from '@mantine/form'
import { useSWRConfig } from 'swr'
import ImageCrop from "components/common/ui/Image/ImageCrop";

interface UpBalanceParams {
    opened: boolean;
    onClose: () => void;
    id: number;
}

export function UploadUserPhoto({opened, onClose, id} :  UpBalanceParams) {
      const store = useStore()
      const { mutate } = useSWRConfig()
      const formData = useForm({
          name: 'upBalance',
          onValuesChange: values => console.log(values),
          initialValues: {
              amount: 0,
              purpose: "1",
              company_id: id.toString()
          }
      })
	return (
        <Modal.Root size={"xl"} opened={opened} onClose={onClose} centered>
            <Modal.Overlay className={'bg-black/90'} />
            <Modal.Content radius={20} className={styles.ModalUpBalance}>
                <Modal.Header className={'static '}>
                    <Modal.Title>
                        <Heading
                            text={"Фотография в вашем профиле"}
                            variant={HeadingVariant.h2}
                            color={HeadingColor.accent}
                            // className={'pb-12'}
                        />
                      <p className={'text-white text-xs mb-4'}>Выбранная область будет показываться на вашей странице.
                            Если изображение ориентировано неправильно, фотографию можно повернуть.</p>
                    </Modal.Title>

                    <Modal.CloseButton
                        className={'hover:rotate-90 hover:bg-transparent transition-all absolute top-5 right-5 outline-0 focus-visible:outline-0'}
                        icon={<SvgClose className={'close__modal'} />}
                    />
                </Modal.Header>
                <Modal.Body className={'!p-0  overflow-hidden pb-8'}>
                    <ImageCrop />
                </Modal.Body>
                <footer className={'tablet-max:!justify-stretch pt-4'}>
                    <Button
                        text={'Отменить'}
                        action={onClose}
                        variant={ButtonVariant.cancel}
                      size={ButtonSizeType.base}
                    />
                    <Button

                        text={'Сохранить'}
                        action={async () => {
                           store.userStore.upLoadImage()
                              .then((r:any) => {
                                if(r.status === 200) {
                                  store.userStore.myProfileData.image = null
                                  store.userStore.loadMyProfile().then(onClose)
                           }})
                        }}
                        variant={ButtonVariant['accent-outline']}
                    />
                </footer>
            </Modal.Content>
        </Modal.Root>
    )
}
