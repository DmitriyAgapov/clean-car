import React, { useEffect, useState } from "react";
import { Button, Group, Image, Text, Modal } from '@mantine/core'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css';
import { observer } from "mobx-react-lite";
import BidImg from "components/common/layout/Modal/BidImg";
import { useDisclosure } from "@mantine/hooks";
import styles from "components/common/layout/Modal/Modal.module.scss";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { SvgBackArrow, SvgClose } from "components/common/ui/Icon";
import { Controller } from 'swiper/modules';

const CarouselCustom = ({items}:{items:any []}) => {

	const [controlledSwiper, setControlledSwiper] = useState<any>(null);
	const [opened, { close, open }] = useDisclosure(false)

	const itemsMemoized = React.useMemo(() => {
		return items.map((i:any) => <SwiperSlide  key={i.id} className={'border-accent  border rounded-md relative overflow-hidden'} onClick={(event) => {
			open()
			}}>
			<BidImg item={i}  mih={'10rem'} mah={'10rem'} miw={'100%'} h={'100%'} style={{objectFit: "cover", cursor: "pointer"}} maw={'10rem'} />
			</SwiperSlide>
		)
	}, [items])
	const MemoFullImg = () => {
		const swiper = useSwiper()

		const [ind, setInd] = useState(swiper.clickedIndex)
		const [img, setImg] = useState(items[ind]);
		const handleImg = React.useCallback((index: number) => {
			if(index > ind) {
				if(index < items.length) {
					setInd(index)
				} else {
					setInd(0)
				}
			}
			if(index < ind) {
				if(index < 0) {
					setInd(items.length -1 )
				} else {
					setInd(index)
				}
			}
		}, [ind]);

		React.useEffect(() => {
			setImg(items[ind])
		}, [ind]);

		return <Modal.Root size={'auto'} style={{aspectRatio: 4/3, background: 'none'}} opened={opened} onClose={close}  centered={true}>
			<Modal.Overlay className={'bg-black/80'}/>
			<Modal.Content radius={20} className={styles.ModalBidFullImg} bg={'transparent !important'}	h={500}>

				<Modal.Body>
					<Image
						src={img.foto}
						style={{objectFit: "contain", aspectRatio: 16/9}}

						maw={650}
					/>
				</Modal.Body>
				<Modal.Header className={'static max-w-64 mx-auto'}>
					{items.length !== 1 && <Button  type={'button'} onClick={() => handleImg(ind - 1)}  className={'!outline-none'}><SvgBackArrow className={'w-8 h-8'}/></Button>}
					<div className={'text-4xl font-medium mx-auto'} style={{letterSpacing: '0.05em'}}>
						<span className={'text-accent'}>{ind + 1}/</span>
						<span  className={'text-gray-2'}>{swiper.slides.length}</span>
					</div>
					{items.length !== 1 && <Button type={'button'} onClick={() => handleImg(ind + 1)} className={'!outline-none'}><SvgBackArrow className={'w-8 h-8 rotate-180'}/></Button>}
				</Modal.Header>

			</Modal.Content>

		</Modal.Root>
	}

	if(items && items.length !==0) return (
		<>
			<Swiper spaceBetween={20}
				slidesPerView={3}
				modules={[Controller]}
				onSlideChange={() => console.log('slide change')}
				onSwiper={setControlledSwiper}>
				{itemsMemoized}
				{opened && <MemoFullImg />}
			</Swiper>
			{controlledSwiper && <div className={'text-xs font-medium mx-auto mt-4'}  style={{letterSpacing: '0.05em'}}>
				<span className={'text-accent'}>{controlledSwiper.activeIndex + 1}/</span>
				<span className={'text-gray-2'}>{controlledSwiper.slides?.length}</span>
			</div>}
		</>
	);
	return null
};

export default observer(CarouselCustom);
