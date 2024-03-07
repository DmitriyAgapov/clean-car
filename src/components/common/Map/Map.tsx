import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from './Map.module.scss'
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L, { DivIcon } from 'leaflet'
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
        <p className={'text-white'}>{item.address}</p>
        <hr className={'border-gray-2'}/>
        <DList className={'uppercase !text-white text-xs'} label={'Время работы'}  title={item.working_time} />
        <Button text={'Выбрать'} variant={ButtonVariant.accent} className={'!rounded-md !text-xs'} action={() => store.bidsStore.formResultSet({performer: item.id})} size={ButtonSizeType.xs}/>
    </div>
}

const ElMap = (item: any) => {

    return (
        <Marker

            icon={new DivIcon({ className: styles.marker, html: `<i class="block rounded-full w-3 h-3 bg-accent"/>` })}
            position={[item.lat, item.lon]}
        >
            <Popup className={'border-none child:contents'} >
                <ElMapPanel {...item}/>

            </Popup>
        </Marker>
    )
}
const MapWithDots = () => {
    const store = useStore()
    const [map, setMap] = useState(null)
    const performersAr = store.bidsStore.AvailablePerformers
    const performers = values(performersAr)

    const arY = performers.map((item: any) => Number.parseFloat(item.lat))
    const arX = performers.map((item: any) => Number.parseFloat(item.lon))
    const fitB = performers.map((item: any) => ([Number.parseFloat(item.lat), Number.parseFloat(item.lon)]))
    const bounds = performers.map((item: any) => [Number.parseFloat(item.lon), Number.parseFloat(item.lat)])

    const centerLat = (Math.min(...arY) + Math.max(...arY)) / 2
    const centerLon = (Math.min(...arX) + Math.max(...arX)) / 2

    useEffect(() => {
        // @ts-ignore
        let polygon = L.polygon(fitB, {color: 'red'});
        // @ts-ignore
        if(map) {
            // @ts-ignore
            map.fitBounds(polygon.getBounds())
        }
    }, [map])


  const displayMap = useMemo(
    () => (
      // @ts-ignore
      <MapContainer/* @ts-ignore */ ref={setMap} attributionControl={false} center={[centerLon, centerLat]} className={styles.Map} style={{ width: '100%', height: '100%' }} scrollWheelZoom={false} zoom={12}>

        <TileLayer/* attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' */ url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {performers.map((item: any) => (
          <ElMap {...item} />
        ))}
      </MapContainer>
    ),
    [])
  if(performersAr.size > 0) return (
        <div className={'rounded-md overflow-hidden bg-black/80 content-start col-span-2 row-start-1 col-start-3 row-span-2'} style={{minHeight: '24rem', height:' 100%', width: '100%', position: 'relative', display: 'block' }}>
            {displayMap}
        </div>
    )
    return null
}

export default MapWithDots
