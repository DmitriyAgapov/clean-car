import React, { ReactNode } from 'react'
import styles from './Modal.module.scss'
import { useStore } from 'stores/store'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { SvgClose } from 'components/common/ui/Icon'
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";

type ModalProps = {
  state: boolean
  text: string
  header?: string
  actions: ReactNode[] | ReactNode | null
}
const SvgCloseStyled = styled(SvgClose)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`
const Modal = (): JSX.Element | null => {
  const store = useStore()
  const { state, text,header, actions } = store.appStore.modal
  if (state) {
    return (
      <div className={styles.Modal}>
        <Panel
          footer={actions}
          variant={PanelVariant.modal}
          background={PanelColor.glass}
          className={'relative z-[999]  gap-10'}
          header={header  ? <Heading text={header} variant={HeadingVariant.h2} color={HeadingColor.accent}/> : null}
        >
          {text}
          <a
            data-close={'true'}
            onClick={(event) => {
              if (event.stopPropagation) {
                event.stopPropagation()
                store.appStore.closeModal()
              }
            }}
          >
            <SvgClose className={'close__modal'} />
          </a>
        </Panel>
      </div>
    )
  }
  return null
}

export default observer(Modal)
