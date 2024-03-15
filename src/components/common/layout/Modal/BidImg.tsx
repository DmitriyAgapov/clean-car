import { CloseIcon, Image, LoadingOverlay } from "@mantine/core";
import React from "react";
import { useStore } from "stores/store";
import { useDisclosure } from "@mantine/hooks";
import { observer } from "mobx-react-lite";

const BidImg = ({ item, ...props }: any) => {
    const store = useStore()
    const [visible, { toggle }] = useDisclosure(true)
    return (
        <div className={'group relative'}>
            {((store.bidsStore.formResult.company !== 0 && store.bidsStore.formResult.company !== null) || props.company_id) && (
                <CloseIcon
                    onClick={() => store.bidsStore.removeFile(props.company_id ? props.company_id : store.bidsStore.formResult.company, item.id)}
                    className={
                        'bg-white cursor-pointer group-hover:text-white group-hover:bg-accent  border-1 text-gray-2 absolute right-0 top-0 block rounded-full !w-4 !h-4'
                    }
                />
            )}
            <LoadingOverlay
                visible={visible}
                zIndex={1000}
                overlayProps={{ color: 'rgba(33,36,46,0.7)', radius: 'sm', blur: 2 }}
            />
            <Image
              {...props}
                loading={'lazy'}
                // style={{opacity: visible ? 0 : 1}}
                src={item.foto}
                onLoad={toggle}

                alt={String(item.id)}
            />
        </div>
    )
}
export default observer(BidImg)
