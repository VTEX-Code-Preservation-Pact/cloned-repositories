import React, { createContext, useContext } from 'react'

const ModalContext = createContext<ModalContext>({ closeModal: () => {} })

interface ModalContext {
  closeModal: () => void
}

const withModal = <P extends object>(
    WrappedComponent: React.ComponentType<P>
  ): React.FC<P & ModalContext> => 
  (props: P) => (
    <ModalContext.Consumer>
      {context => <WrappedComponent {...props} {...context} />}
    </ModalContext.Consumer>
)

const useModal = () => useContext(ModalContext)

export default { useModal, withModal, Provider: ModalContext.Provider }
