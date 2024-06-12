import { CloseIcon, Image, LoadingOverlay } from "@mantine/core";
import React from "react";
import { useStore } from "stores/store";
import { useDisclosure } from "@mantine/hooks";
import { observer } from "mobx-react-lite";

const BidImg = ({ item, containerClassName, closeBtn = true, closeAction, ...props }: any) => {

    const store = useStore()
    const [visible, { toggle, close, open }] = useDisclosure(true)
    return (
        <div className={'group relative' + " " + containerClassName}>
            {((store.bidsStore.formResult.company !== 0 && store.bidsStore.formResult.company !== null) || props.company_id) && closeBtn && (
                <CloseIcon
                    onClick={closeAction}
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
                // loading={'lazy'}
                // style={{opacity: visible ? 0 : 1}}
                src={item}
                onLoad={close}

                alt={String(item.name)}
            />
        </div>
    )
}
export default observer(BidImg)
