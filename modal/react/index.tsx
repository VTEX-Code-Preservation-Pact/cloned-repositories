import React, {
  Fragment,
  FunctionComponent,
  ReactElement,
  useState,
  useCallback,
  useMemo
} from 'react'
import classNames from 'classnames'
import { generateBlockClass, BlockClass } from '@vtex/css-handles'
import { defineMessages } from 'react-intl'
//@ts-ignore
import { Modal } from 'vtex.styleguide'

import Context from './ModalContext'
//@ts-ignore
import styles from './styles.css'

const { Provider } = Context

interface ModalProps {
  centered: boolean
  closeOnEsc: boolean
  closeOnOverlayClick: boolean
  showCloseIcon: boolean
  children: ReactElement
  buttonLabel: string
  buttonClass: string | null
  showTopBar: boolean
  title?: string
}

interface StorefrontComponent
  extends FunctionComponent<ModalProps & BlockClass> {
  schema?: any
}

const ModalComponent: StorefrontComponent = ({
  centered,
  closeOnEsc,
  closeOnOverlayClick,
  showCloseIcon,
  children,
  buttonLabel,
  buttonClass,
  blockClass,
  showTopBar,
  title,
}) => {
  const [isOpen, setOpen] = useState(false)
  const onClick = useCallback(() => setOpen(true), [])
  const onClose = useCallback(() => setOpen(false), [])

  const buttonClasses = classNames(
    generateBlockClass(styles.button, blockClass),
    't-action pointer pv3 nv3 ph4 nh4 c-action-primary',
    buttonClass,
  )

  const modalContext = useMemo(() => ({ closeModal: onClose }), [onClose]) 

  return (
    <Fragment>
      <div className={buttonClasses} onClick={onClick} role="button">
        {buttonLabel}
      </div>
      <div className={generateBlockClass(styles.container, blockClass)}>
        <Modal
          isOpen={isOpen}
          centered={centered}
          onClose={onClose}
          closeOnEsc={closeOnEsc}
          closeOnOverlayClick={closeOnOverlayClick}
          showCloseIcon={showCloseIcon}
          showTopBar={showTopBar}
          title={title}
        >
          <div
            className={`${generateBlockClass(
              styles.childrenContainer,
              blockClass
            )} flex flex-grow-1`}
          >
            <Provider value={modalContext}>
              {children}
            </Provider>
          </div>
        </Modal>
      </div>
    </Fragment>
  )
}

ModalComponent.defaultProps = {
  centered: false,
  closeOnEsc: true,
  closeOnOverlayClick: true,
  showCloseIcon: true,
  buttonLabel: '',
  buttonClass: null,
  showTopBar: true,
}

const messages = defineMessages({
  modalTitle: {
    defaultMessage: 'Modal Component',
    id: 'admin/editor.modal.title',
  },
  modalDescription: {
    defaultMessage: 'A component that allows to display other blocks inside it as a modal.',
    id: 'admin/editor.modal.description',
  },
  centeredTitle: {
    defaultMessage: 'Centered',
    id: 'admin/editor.modal.centered.title',
  },
  centeredDescription: {
    defaultMessage: 'Set to true if component should be centered on screen',
    id: 'admin/editor.modal.centered.description',
  },
  closeOnEscTitle: {
    defaultMessage: 'Close on Esc',
    id: 'admin/editor.modal.closeOnEsc.title',
  },
  closeOnEscDescription: {
    defaultMessage: 'Set to true if modal should close when esc key is pressed',
    id: 'admin/editor.modal.closeOnEsc.description',
  },
  closeOnOverlayClickTitle: {
    defaultMessage: 'Close on overlay click',
    id: 'admin/editor.modal.closeOnOverlayClick.title',
  },
  closeOnOverlayClickDescription: {
    defaultMessage: 'Set to true if modal should close when pressing on outside area',
    id: 'admin/editor.modal.closeOnOverlayClick.description',
  },
  showCloseIconTitle: {
    defaultMessage: 'Show close icon',
    id: 'admin/editor.modal.showCloseIcon.title',
  },
  showCloseIconDescription: {
    defaultMessage: 'Set to true if modal should display close icon',
    id: 'admin/editor.modal.showCloseIcon.description',
  },
  buttonLabelTitle: {
    defaultMessage: 'Button Label',
    id: 'admin/editor.modal.buttonLabel.title',
  },
  buttonLabelDescription: {
    defaultMessage: 'Set the label displayed on button to open modal',
    id: 'admin/editor.modal.buttonLabel.description',
  },
  buttonClassTitle: {
    defaultMessage: 'Button class',
    id: 'admin/editor.modal.buttonClass.title',
  },
  buttonClassDescription: {
    defaultMessage: 'Pass extra tachyon classes to button container',
    id: 'admin/editor.modal.buttonClass.description',
  },
  blockClassTitle: {
    defaultMessage: 'Block class',
    id: 'admin/editor.modal.blockClass.title',
  },
  blockClassDescription: {
    defaultMessage: 'Unique class name to be appended to block classes',
    id: 'admin/editor.modal.blockClass.description',
  },
})

ModalComponent.schema = {
  title: messages.modalTitle.id,
  description: messages.modalDescription.id,
  type: 'object',
  properties: {
    centered: {
      title: messages.centeredTitle.id,
      description: messages.centeredDescription.id,
      type: 'boolean',
      default: false,
      isLayout: true,
    },
    closeOnEsc: {
      title: messages.closeOnEscTitle.id,
      description: messages.closeOnEscDescription.id,
      type: 'boolean',
      default: true,
      isLayout: true,
    },
    closeOnOverlayClick: {
      title: messages.closeOnOverlayClickTitle.id,
      description: messages.closeOnOverlayClickDescription.id,
      type: 'boolean',
      default: true,
      isLayout: true,
    },
    showCloseIcon: {
      title: messages.showCloseIconTitle.id,
      description: messages.showCloseIconDescription.id,
      type: 'boolean',
      default: true,
      isLayout: true,
    },
    buttonLabel: {
      title: messages.buttonLabelTitle.id,
      description: messages.buttonLabelDescription.id,
      type: 'string',
      default: '',
    },
    buttonClass: {
      title: messages.buttonLabelTitle.id,
      description: messages.buttonLabelDescription.id,
      type: 'string',
      default: null,
      isLayout: true,
    },
    blockClass: {
      title: messages.blockClassTitle.id,
      description: messages.blockClassDescription.id,
      type: 'string',
      default: null,
      isLayout: true,
    },
  },
}

export default ModalComponent
