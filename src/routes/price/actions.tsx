import { useStore } from "stores/store";
import { PermissionNames } from "stores/permissionStore";
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import React from 'react'

import { useDisclosure, useViewportSize } from '@mantine/hooks'
import { Drawer } from '@mantine/core'
import { useNavigate, useRevalidator } from 'react-router-dom'
import { observer } from "mobx-react-lite";
const PriceActions = ():any  => {
	const  store = useStore()
	const revalidator = useRevalidator();
	const navigate = useNavigate()
	const [opened, { open, close, toggle }] = useDisclosure(false);
	const { height, width } = useViewportSize();
	const inChangeState = store.priceStore.getPriceOnChange.size > 0

	React.useEffect(() => {
		inChangeState ? open() : close()
	}, [inChangeState])
	if (store.userStore.getUserCan(PermissionNames['Управление прайс-листом'], 'update')) {
		console.log(width);
		return (width < 740 ? (
				<Drawer.Root withinPortal={true}
					opened={inChangeState}
					lockScroll={false}
					onClose={store.priceStore.clearPriceOnChange}
					size={64}
					position="bottom">
					<Drawer.Content bg={"none"}>
						<Drawer.Body className={`flex justify-between gap-4 items-end  mobile_price_actions  w-full rounded`}><Button className={'flex-1'}
							text={'Отменить'}
							action={() => {
								// navigate(location.pathname.split('/').slice(0, -1).join('/'))
								store.priceStore.clearPriceOnChange()
							}}
							size={ButtonSizeType.sm}
							variant={ButtonVariant.cancel} />
							<Button text={'Сохранить'}
								className={'flex-1'}
								disabled={store.priceStore.priceOnChange.size === 0}
								type={'button'}
								action={async () => {
									store.appStore.setAppState(true)
									await store.priceStore.handleSavePrice().then(() => {
										revalidator.revalidate()
										navigate(location.pathname.split('/edit')[0])
									})
								}}
								size={ButtonSizeType.sm}
								variant={ButtonVariant['accent']} /></Drawer.Body>
					</Drawer.Content>
				</Drawer.Root>
			) : (
				<div className={`flex p-6 gap-6 rounded`}

				>
					<Button className={''}
						text={'Отменить'}
						action={() => {
							navigate(location.pathname.split('/').slice(0, -1).join('/'))
							store.priceStore.clearPriceOnChange()
						}}
						size={ButtonSizeType.sm}
						variant={ButtonVariant.cancel} />
					<Button text={'Сохранить'}
						disabled={store.priceStore.priceOnChange.size === 0}
						type={'button'}
						action={async () => {
							store.appStore.setAppState(true)
							await store.priceStore.handleSavePrice().then(() => {
								revalidator.revalidate()
								navigate(location.pathname.split('/edit')[0])
							})
						}}
						size={ButtonSizeType.sm}
						variant={ButtonVariant['accent']} />
				</div>

			)
		)
	}}
export default observer(PriceActions)
