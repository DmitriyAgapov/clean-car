import React from 'react'
import styles from './Map.module.scss'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { DivIcon } from 'leaflet'
import { useStore } from 'stores/store'
import Heading, { HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import DList from "components/common/ui/DList/DList";
import { values } from "mobx";
// type MapProps = {}
const ElMapPanel = (item:any) => {

    const store = useStore()
    return <div className={'bg-black/80 rounded-sm border border-accent px-2 py-4'}>
        <Heading text={item.name} className={'text-white font-normal font-sans'} variant={HeadingVariant.h6}/>
        <p className={'text-white'}>{item.performerprofile.address}</p>
        <hr className={'border-gray-2'}/>
        <DList className={'uppercase !text-white text-xs'} label={'Время работы'}  title={item.performerprofile.working_time} />
        <Button text={'Выбрать'} variant={ButtonVariant.accent} className={'!rounded-md !text-xs'} action={() => store.bidsStore.formResultSet({performer: item.id})} size={ButtonSizeType.xs}/>
    </div>
}

const ElMap = (item: any) => {

    return (
        <Marker

            icon={new DivIcon({ className: styles.marker, html: `<i class="block rounded-full w-3 h-3 bg-accent"/>` })}
            position={[item.performerprofile.lat, item.performerprofile.lon]}
        >
            <Popup className={'border-none child:contents'} >
                <ElMapPanel {...item}/>

            </Popup>
        </Marker>
    )
}
const MapWithDots = () => {
    const store = useStore()

    const performersAr = store.bidsStore.AvailablePerformers

    const performers = values(performersAr)
    const arY = performers.map((item: any) => Number.parseFloat(item.performerprofile.lat))
    const arX = performers.map((item: any) => Number.parseFloat(item.performerprofile.lon))
    const bounds = performers.map((item: any) => [Number.parseFloat(item.performerprofile.lat), Number.parseFloat(item.performerprofile.lon)])

    const centerLat = (Math.min(...arY) + Math.max(...arY)) / 2
    const centerLon = (Math.min(...arX) + Math.max(...arX)) / 2


  return (
        <div className={'rounded-md overflow-hidden bg-black/80 content-start col-span-2 row-start-1 col-start-3 row-span-2'} style={{minHeight: '500px', height:' 100%', width: '100%', position: 'relative', display: 'block' }}>
            <MapContainer
                attributionControl={false}
                className={styles.Map}
                style={{ width: '100%', height: '100%' }}
              // @ts-ignore
                bounds={bounds}

                scrollWheelZoom={false}
            >
                <TileLayer


                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {performers.map((item: any) => (
                    <ElMap {...item} />
                ))}
            </MapContainer>
        </div>
    )
}

export default MapWithDots
