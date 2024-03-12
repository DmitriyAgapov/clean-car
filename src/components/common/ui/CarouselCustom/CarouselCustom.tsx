import React from "react";
import { Image } from "@mantine/core";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { observer } from "mobx-react-lite";

const CarouselCustom = ({items}:{items:any []}) => {
	const itemsMemoized = React.useMemo(() => {
		return items.map((i:any) => <SwiperSlide key={i.id} className={'border-accent  border rounded-md relative overflow-hidden'}>
				<Image   src={i.img} mih={'10rem'} mah={'10rem'} miw={'100%'} h={'100%'} style={{objectFit: "cover"}} maw={'10rem'} alt={''}/>
			</SwiperSlide>
		)
	}, [items])
	if(items && items.length !==0) return (
		<Swiper
			spaceBetween={20}
			slidesPerView={3}
			onSlideChange={() => console.log('slide change')}
			onSwiper={(swiper:any) => console.log(swiper)}
		>
			{itemsMemoized}
		</Swiper>
	);
	return null
};

export default observer(CarouselCustom);
