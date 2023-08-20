import type { Dispatch } from 'react'

export type Device = 'mobile' | 'desktop'

export type CustomizableComponent = 'modal' | 'payButton'

export type TypeColorStyle =
  | 'normal_text'
  | 'normal_background'
  | 'normal_outline'
  | 'hover_text'
  | 'hover_background'
  | 'hover_outline'
export interface ColorStyles {
  textColor: string
  backgroundColor: string
  outlineColor: string
}

interface ModalButton {
  borderRadius: number
  normal: ColorStyles
  hover: ColorStyles
}

interface ModalIcon {
  color: string
}
export interface ModalStyles {
  font: string
  icons: ModalIcon
  backgroundColor: string
  button: ModalButton
}

export interface PayButtonStyles {
  borderRadius: number
  font: string
  hover: ColorStyles
  normal: ColorStyles
  value: string
  width: number
}

export interface IStyleSettings {
  modalStyles: ModalStyles
  buttonStyles: PayButtonStyles
}

export interface IStyleSettingsCtx {
  alert: IAlert
  componentSelected: CustomizableComponent
  deviceSelected: Device
  loadingStyles: boolean
  state: IStyleSettings
  clearAlert: () => void
  dispatch: Dispatch<Actions>
  restoreStyles: () => Promise<void>
  setAlert: React.Dispatch<React.SetStateAction<IAlert>>
  setComponentSelected: Dispatch<React.SetStateAction<CustomizableComponent>>
  setDeviceSelected: Dispatch<React.SetStateAction<Device>>
  updateStyles: () => Promise<void>
}

export interface IStyleSettingsQuery {
  modal: ModalStyles
  button: PayButtonStyles
}

export interface IAlert {
  message: {
    id: string
  }
  type: 'warning' | 'error' | 'success'
}

export interface AddButonStyleArgs {
  backgroundColor: string
  borderRadius?: number
  font?: string
  outlineColor: string
  textColor: string
  width?: number
}

type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V

export type Actions =
  | Action<'SET_PAYBUTTON_VALUE', { args: { value: string } }>
  | Action<'SET_PAYBUTTON_FONT', { args: { font: string } }>
  | Action<'SET_PAYBUTTON_RADIO', { args: { borderRadius: number } }>
  | Action<'SET_PAYBUTTON_NORMAL_TEXT_COLOR', { args: { color: string } }>
  | Action<'SET_PAYBUTTON_NORMAL_BACKGROUND_COLOR', { args: { color: string } }>
  | Action<'SET_PAYBUTTON_NORMAL_OUTLINE_COLOR', { args: { color: string } }>
  | Action<'SET_PAYBUTTON_HOVER_TEXT_COLOR', { args: { color: string } }>
  | Action<'SET_PAYBUTTON_HOVER_BACKGROUND_COLOR', { args: { color: string } }>
  | Action<'SET_PAYBUTTON_HOVER_OUTLINE_COLOR', { args: { color: string } }>
  | Action<'SET_PAYBUTTON_STYLES', { args: { styles: PayButtonStyles } }>
  | Action<'SET_PAYBUTTON_WIDTH', { args: { width: number } }>
  | Action<'SET_MODAL_FONT', { args: { font: string } }>
  | Action<'SET_MODAL_ICONS_COLOR', { args: { iconsColor: string } }>
  | Action<'SET_MODAL_BACKGROUND_COLOR', { args: { backgroundColor: string } }>
  | Action<'SET_MODAL_RADIO', { args: { borderRadiusBtn: number } }>
  | Action<'SET_MODAL_BTN_NORMAL_TEXT_COLOR', { args: { color: string } }>
  | Action<'SET_MODAL_BTN_NORMAL_BACKGROUND_COLOR', { args: { color: string } }>
  | Action<'SET_MODAL_BTN_NORMAL_OUTLINE_COLOR', { args: { color: string } }>
  | Action<'SET_MODAL_BTN_HOVER_TEXT_COLOR', { args: { color: string } }>
  | Action<'SET_MODAL_BTN_HOVER_BACKGROUND_COLOR', { args: { color: string } }>
  | Action<'SET_MODAL_BTN_HOVER_OUTLINE_COLOR', { args: { color: string } }>
  | Action<'SET_MODAL_STYLES', { args: { styles: ModalStyles } }>
