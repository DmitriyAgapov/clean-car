import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from './Map.module.scss'
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L, { DivIcon } from 'leaflet'
import { useStore } from 'stores/store'
import Heading, { HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import DList from "components/common/ui/DList/DList";
import { values } from "mobx";
import { createBidFormActions } from "components/Form/FormCreateBid/FormCreateUpdateBid";
import { observer } from "mobx-react-lite";
import { useWindowDimensions } from "utils/utils";
// type MapProps = {}
export const WorkLoadStatus = ({status, className, hasDot = true}: {hasDot?:boolean,className?:string, status: number}):any => {
    let result: React.ReactNode
    switch (status) {
        case 1:
            result = (
                <div className={'text-active flex items-center leading-none'}>
                    Свободен
                    {hasDot && <i className={'rounded-full w-4 h-4 bg-current inline-block ml-2'} />}
                </div>
            )
            break
        case 2:
            result = (
                <div className={'text-notice'}>
                    Умеренная загрузка
                    {hasDot && <i className={'rounded-full w-4 h-4 bg-current inline-block ml-2'} />}
                </div>
            )
            break
        case 3:
            result = (
                <div className={'text-error'}>
                    Занят
                    {hasDot && <i className={'rounded-full w-4 h-4 bg-current inline-block ml-2'} />}
                </div>
            )
            break
    }
    return <div className={`absolute top-2.5 right-2.5 ${className}`}>{ result }</div>
}
const ElMapPanel = (item:any) => {
    const store = useStore()
    console.log(item);
    return <div className={'bg-black/90 rounded-md relative border-2 border-accent px-2 w-56 py-4 pt-10 -mb-5 relative z-10 overflow-hidden'}>
        <WorkLoadStatus status={item.workload}/>
        <Heading text={item.name} className={'text-white font-normal text-xs font-sansSerif !mb-1'} variant={HeadingVariant.h6}/>
        <p className={'text-white !mt-1  font-sansSerif '}>{item.address}</p>
        <hr className={'border-gray-2'}/>
        <DList className={'uppercase !text-white text-xs [&_dt]:text-xss [&_dt]:mb-1.5 [&_dd]:text-sm [&_dd]:font-sansSerif [&_dd]:font-medium'} label={'Время работы'}  title={item.working_time} />
        <div className={'flex items-end justify-between text-sm text-active  font-sans '}>
            <span>{item.amount} ₽</span>
            <Button text={'Выбрать'} variant={ButtonVariant.accent} className={'!rounded-md !text-xs mt-4'} action={() => {
            createBidFormActions.setFieldValue('performer', String(item.id));
            createBidFormActions.setTouched({'performer': true});
            createBidFormActions.clearErrors();
            store.bidsStore.formResultSet({performer: item.id})
        }} size={ButtonSizeType.xs}/>
        </div>
    </div>
}

const ElMap = (item: any) => {
    let result: any = "";
    (():any => {
            switch (item.workload) {
            case 1:
                result = "block rounded-full w-3 h-3 bg-accent"
                break
            case 2:
                result = "block rounded-full w-3 h-3 bg-notice"
                break
            case 3:
                result = "block rounded-full w-3 h-3 bg-error"
                break
        }
    })()
    return (
      <Marker

            icon={new DivIcon({ className: styles.marker, html: `<i class="block rounded-full w-3 h-3 ${result}"/>` })}
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
    const {width} = useWindowDimensions()
    console.log(width);
    React.useLayoutEffect(() => {

        // @ts-ignore
        let polygon = L.polygon(fitB, {color: 'red'});
        // @ts-ignore
        if(map) {
            // @ts-ignore
            map.fitBounds(polygon.getBounds())
        }
    }, [map])


  const displayMap = useMemo(

    () => {
    if(!width) return <></>
      // @ts-ignore
      return <MapContainer
        /* @ts-ignore */
        ref={setMap} attributionControl={false} center={[centerLon, centerLat]} className={styles.Map} style={{ width: width && width < 768 ? 'calc(100dvw - 2rem)' : "100%", height: width && width < 768 ? 'calc(100dvw - 2rem)' : "100%"}} scrollWheelZoom={true} zoom={14}>

        <TileLayer
          /* attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' */
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {performers.map((item: any, index: number) => (
          <ElMap {...item} key={`perf_map_${index}`}/>
        ))}
      </MapContainer>
    },
    [width])
  if(performersAr.size > 0) return (
        <div className={'rounded-md overflow-hidden bg-black/80 content-start col-span-3 row-start-1 col-start-3 row-span-2 tablet:min-h-96'} style={{ height:' 100%', width: '100%', position: 'relative', display: 'block' }}>
            {displayMap}
        </div>
    )
    return null
}

export default observer(MapWithDots)
