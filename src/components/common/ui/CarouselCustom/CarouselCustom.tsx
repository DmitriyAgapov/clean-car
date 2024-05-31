import React, { useState } from 'react'
import { Image, Modal } from '@mantine/core'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css'
import { observer } from 'mobx-react-lite'
import BidImg from 'components/common/layout/Modal/BidImg'
import { useDisclosure, useViewportSize } from '@mantine/hooks'
import styles from 'components/common/layout/Modal/Modal.module.scss'
import { SvgBackArrow } from 'components/common/ui/Icon'
import { Controller } from 'swiper/modules'

const CarouselCustom = ({items}:{items:any []}) => {

	const [controlledSwiper, setControlledSwiper] = useState<any>(null);
	const [opened, { close, open }] = useDisclosure(false)
	const { height, width } = useViewportSize();
	const itemsMemoized = React.useMemo(() => {
		return items.map((i:any) => <SwiperSlide  key={i.id} className={'border-accent  border rounded-md relative overflow-hidden'} style={{aspectRatio: "1/1"}} onClick={(event) => {
			open()
			}}>
			<BidImg item={i}  mih={'10rem'}  miw={'100%'} h={'100%'} style={{objectFit: "cover", cursor: "pointer", aspectRatio: "1/1"}} maw={'10rem'} />
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

		return <Modal.Root size={"lg"} style={{ background: 'none'}} opened={opened} onClose={close}  centered={true}>
			<Modal.Overlay className={'bg-black/80'}/>
			<Modal.Content radius={20} className={styles.ModalBidFullImg} bg={'transparent !important'}	h={"80lvh"}>

				<Modal.Body className={'tablet-max:flex'} >
					<Image
						src={img.foto}
						style={{objectFit: "cover"}}

						maw={650}
					/>
				</Modal.Body>
				<Modal.Header className={'static max-w-64 mx-auto'}>
					{items.length !== 1 && <SvgBackArrow className={'w-8 h-8'} onClick={() => handleImg(ind - 1)}/>}
					<div className={'text-4xl font-medium mx-auto'} style={{letterSpacing: '0.05em'}}>
						<span className={'text-accent'}>{ind + 1}/</span>
						<span  className={'text-gray-2'}>{swiper.slides.length}</span>
					</div>
					{items.length !== 1 && <SvgBackArrow className={'w-8 h-8 rotate-180'} onClick={() => handleImg(ind + 1)}/> }
				</Modal.Header>

			</Modal.Content>

		</Modal.Root>
	}

	if(items && items.length !==0) return (
		<>
			<Swiper spaceBetween={20}
				slidesPerView={width < 739 ? 1 : 3}
				modules={[Controller]}
				onSlideChange={() => console.log('slide change')}
				onSwiper={setControlledSwiper}>
				{itemsMemoized}
				{opened && <MemoFullImg />}
			</Swiper>
			{controlledSwiper && <div className={'text-xs font-medium mx-auto mt-4 tablet-max:text-center'}  style={{letterSpacing: '0.05em'}}>
				<span className={'text-accent'}>{controlledSwiper.activeIndex + 1}/</span>
				<span className={'text-gray-2'}>{controlledSwiper.slides?.length}</span>
			</div>}
		</>
	);
	return null
};

export default observer(CarouselCustom);
