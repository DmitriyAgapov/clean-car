import React from "react";
import { Image } from "@mantine/core";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const CarouselCustom = ({items}:{items:any []}) => {
	if(items && items.length !==0) return (
		<Swiper
			spaceBetween={20}
			slidesPerView={3}
			onSlideChange={() => console.log('slide change')}
			onSwiper={(swiper:any) => console.log(swiper)}
		>
			{items.map((i:any) => <SwiperSlide key={i.id} className={'border-accent  border rounded-md relative overflow-hidden'}>
				<Image   src={i.img} mih={'10rem'} miw={'100%'} h={'100%'} style={{objectFit: "cover"}} maw={'10rem'} alt={''}/>
			</SwiperSlide> )}
		</Swiper>
	);
	return null
};

export default CarouselCustom;
