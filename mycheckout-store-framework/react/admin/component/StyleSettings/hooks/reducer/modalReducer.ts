import type { Actions, ModalStyles } from '../../interfaces'

export const modalReducer = (
  state: ModalStyles,
  action: Actions
): ModalStyles => {
  switch (action.type) {
    case 'SET_MODAL_FONT': {
      const { args } = action

      return {
        ...state,
        font: args.font,
      }
    }

    case 'SET_MODAL_ICONS_COLOR': {
      const { args } = action
      const { icons } = state

      return {
        ...state,
        icons: {
          ...icons,
          color: args.iconsColor,
        },
      }
    }

    case 'SET_MODAL_BACKGROUND_COLOR': {
      const { args } = action

      return {
        ...state,
        backgroundColor: args.backgroundColor,
      }
    }

    case 'SET_MODAL_RADIO': {
      const { args } = action
      const { button } = state

      return {
        ...state,
        button: {
          ...button,
          borderRadius: args.borderRadiusBtn,
        },
      }
    }

    case 'SET_MODAL_BTN_NORMAL_TEXT_COLOR': {
      const { args } = action
      const { button } = state
      const { normal } = button

      return {
        ...state,
        button: {
          ...button,
          normal: {
            ...normal,
            textColor: args.color,
          },
        },
      }
    }

    case 'SET_MODAL_BTN_NORMAL_BACKGROUND_COLOR': {
      const { args } = action
      const { button } = state
      const { normal } = button

      return {
        ...state,
        button: {
          ...button,
          normal: {
            ...normal,
            backgroundColor: args.color,
          },
        },
      }
    }

    case 'SET_MODAL_BTN_NORMAL_OUTLINE_COLOR': {
      const { args } = action
      const { button } = state
      const { normal } = button

      return {
        ...state,
        button: {
          ...button,
          normal: {
            ...normal,
            outlineColor: args.color,
          },
        },
      }
    }

    case 'SET_MODAL_BTN_HOVER_TEXT_COLOR': {
      const { args } = action
      const { button } = state
      const { hover } = button

      return {
        ...state,
        button: {
          ...button,
          hover: {
            ...hover,
            textColor: args.color,
          },
        },
      }
    }

    case 'SET_MODAL_BTN_HOVER_BACKGROUND_COLOR': {
      const { args } = action
      const { button } = state
      const { hover } = button

      return {
        ...state,
        button: {
          ...button,
          hover: {
            ...hover,
            backgroundColor: args.color,
          },
        },
      }
    }

    case 'SET_MODAL_BTN_HOVER_OUTLINE_COLOR': {
      const { args } = action
      const { button } = state
      const { hover } = button

      return {
        ...state,
        button: {
          ...button,
          hover: {
            ...hover,
            outlineColor: args.color,
          },
        },
      }
    }

    case 'SET_MODAL_STYLES': {
      const { args } = action

      return {
        ...state,
        ...args.styles,
      }
    }

    default:
      return state
  }
}
