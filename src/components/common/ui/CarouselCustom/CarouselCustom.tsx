import React, { useState } from 'react'
import { Image, Modal } from '@mantine/core'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css'

import { observer } from 'mobx-react-lite'
import BidImg from 'components/common/layout/Modal/BidImg'
import { useDisclosure, useMediaQuery, useViewportSize } from '@mantine/hooks'
import styles from 'components/common/layout/Modal/Modal.module.scss'
import { SvgBackArrow } from 'components/common/ui/Icon'
import { Controller, Zoom } from 'swiper/modules'
import 'swiper/css/zoom';

const MemoFullImg = ({ items, opened, action }: {opened:boolean,action: () => void, items: any[]}) => {

	const [controlledSwiper, setControlledSwiper] = useState<any>(null);
	const [ind, setInd] = useState(0)

	// const [img, setImg] = useState(items[ind])
	const handleImg = React.useCallback(
		(index: number) => {
			if (index > ind) {
				if (index < items.length) {
					setInd(index)
				} else {
					setInd(0)
				}
			}
			if (index < ind) {
				if (index < 0) {
					setInd(items.length - 1)
				} else {
					setInd(index)
				}
			}
		},
		[ind],
	)
	const isMobile = useMediaQuery('(max-width: 50em)');
	React.useEffect(() => {
		// setImg(items[ind])
	}, [controlledSwiper?.activeIndex])

	return (
		<Modal.Root size={isMobile ? "auto" : '75rem'} fullScreen={false}
			xOffset={0}
			yOffset={'10dvh'}
			style={{ background: 'none' }} opened={opened} onClose={action} centered={true} >
			<Modal.Overlay className={'bg-black/80'} />

			<Modal.Content radius={20} className={styles.ModalBidFullImg} bg={'transparent !important'}
				// display={'flex'}
				// style={{flexDirection: "column"}}
				// h={"100%"}
				mah={"100lvh"}>
				<Modal.CloseButton w={48} h={48} pos={"absolute"} right={0} top={"-0.5rem"} style={{zIndex: 998}}/>
				<Modal.Body className={'tablet-max:flex !px-0 !pb-0 !pt-8 overflow-hidden flex-1'}  mah={"85lvh"}>

					<Swiper
						spaceBetween={20}
						slidesPerView={1}
						modules={[Controller, Zoom]}
						// autoHeight
						className={'max-h-svh max-w-6xl'}
						zoom={true}
						// on={{
						// 	sliderMove: (swiper:any,event:any) => console.log(event, swiper)}}
						onSlideChange={(event: any) => setInd(event.activeIndex)}
						onSwiper={setControlledSwiper}
					>
						{items.map((i) => (
							<SwiperSlide key={i.id}
								// className={'relative overflow-hidden'}
								// style={{ aspectRatio: '1/1' }}

								// onTouchEnd={(event) => console.log(event)}
							>
								<div className={"swiper-zoom-container"} style={{height: "auto"}}>
									<Image
										src={i}
											w={"100%"}
											h={"100%"}
										// mih={'10rem'}
										// miw={"100%"}
										// h={'100%'}
										style={{ objectFit: "contain", cursor: "pointer"}}
										// mah={"60lvh"}
										className={""} />
								</div>
							</SwiperSlide>
							))}
					</Swiper>

					{/* <Image */}
					{/* 	src={img.foto} */}
					{/* 	style={{objectFit: "cover"}} */}
					{/* 	// onTouchMove={(event) => console.log('eve', event)} */}
					{/* 	maw={650} */}
					{/* /> */}

				</Modal.Body>
				<Modal.Header className={'static  mx-auto gap-4 items-center justify-center'}>
					{items.length !== 1 && (
						<SvgBackArrow className={`w-8 h-8  ${(items.length - 1 >= ind && ind !== 0 ) ? "text-accent" : "text-gray-2"}`} onClick={() => {
							if(items.length - 1 >= ind && ind !== 0 ) {

								controlledSwiper.slidePrev()
								handleImg(ind - 1)
							}
						}
						} />
					)}
					<div
						className={'text-4xl font-medium gap-0.5 flex  justify-center'}
						style={{ letterSpacing: '0.05em' }}
					>
						<span className={'text-accent'}>{ind + 1}</span>
						<span className={'text-gray-2'}>/</span>
						<span className={'text-gray-2'}>{items.length}</span>
					</div>
					{items.length !== 1 && (
						<SvgBackArrow
							className={`w-8 h-8 rotate-180 ${items.length - 1 > ind ? "text-accent" : "text-gray-2"}`}
							onClick={() => {
								if(items.length - 1 > ind) {
									controlledSwiper.slideNext()
									handleImg(ind + 1)
								}
							}}
						/>
					)}
				</Modal.Header>
			</Modal.Content>
		</Modal.Root>
	)
}

const CarouselCustom = ({items, closeBtn = true}:{items:any [], closeBtn: boolean}) => {

	const [controlledSwiper, setControlledSwiper] = useState<any>(null);
	const [opened, { close, open }] = useDisclosure(false)
	const { height, width } = useViewportSize();

	const itemsMemoized = React.useMemo(() => {

		return items.map((i:any) => <SwiperSlide  key={i.id} className={'border-accent  border rounded-md relative overflow-hidden'} style={{aspectRatio: "1/1"}} onClick={(event) => {
			open()
			}}>
			<div className={'swiper-zoom-container'} data-swiper-zoom="5">
					<Image src={i}  mah={'80lvh'}  w={'100%'} h={'100%'}  style={{objectFit: "cover", cursor: "pointer", aspectRatio: "1/1", flex: "1"}}/>
			</div>
			</SwiperSlide>
		)
	}, [items])


	const [ind, setInd] = useState(0)

	if(items && items.length !==0) return (
		<>
			<Swiper spaceBetween={20}
				slidesPerView={width < 739 ? 1 : 3}
				modules={[Controller, Zoom]}
				zoom={true}
				// on={{
				// 	sliderMove: (swiper:any,event:any) => console.log(event, swiper)}}
				onSlideChange={(event: any) => setInd(event.activeIndex)}
				onSwiper={setControlledSwiper}>
				{itemsMemoized}

			</Swiper>

			{controlledSwiper && <div className={'text-4xl tablet:text-sm font-medium gap-0.5 flex  tablet-max:justify-center  mx-auto mt-4 tablet-max:text-center'}  style={{letterSpacing: '0.05em'}}>
				<span className={'text-accent'}>{ind + 1}</span>
				<span className={'text-gray-2'}>/</span>
				<span className={'text-gray-2'}>{items.length}</span>
			</div>}
			{opened && <MemoFullImg opened={opened} items={items} action={close}/>}
		</>
	);
	return null
};

export default observer(CarouselCustom);
