import type { IStyleSettings } from './interfaces'

const defaultButtonText = ''
const defaultFont = '"Calibri", sans-serif'
const defaultRadio = 8

export const fonts = {
  sansSerifFamily: [
    'SANS SERIF',
    'Helvetica',
    'Arial',
    'Verdana',
    'Tahoma',
    'Open Sans',
  ],
  serifFamily: [
    'SERIF',
    'Times New Roman',
    'Georgia',
    'Garamond',
    'Lora',
    'PT Serif',
  ],
}

export const defaultStyleSettingState: IStyleSettings = {
  modalStyles: {
    font: defaultFont,
    button: {
      borderRadius: defaultRadio,
      normal: {
        textColor: '#FFFFFF',
        backgroundColor: '#EB5B2B',
        outlineColor: '#EB5B2B',
      },
      hover: {
        textColor: '#FFFFFF',
        backgroundColor: '#F47146',
        outlineColor: '#EB5B2B',
      },
    },
    icons: {
      color: '#222326',
    },
    backgroundColor: '#FFFFFF',
  },
  buttonStyles: {
    font: 'Helvetica',
    value: defaultButtonText,
    borderRadius: defaultRadio,
    normal: {
      textColor: '#FF572D',
      backgroundColor: '#FFFFFF',
      outlineColor: '#1B998B',
    },
    hover: {
      textColor: '#FF572D',
      backgroundColor: '#FFFFFF',
      outlineColor: '#1B998B',
    },
    width: 100,
  },
}
