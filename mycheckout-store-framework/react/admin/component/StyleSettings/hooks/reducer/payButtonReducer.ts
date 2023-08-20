import type { Actions, PayButtonStyles } from '../../interfaces'

export const payButtonReducer = (
  state: PayButtonStyles,
  action: Actions
): PayButtonStyles => {
  switch (action.type) {
    case 'SET_PAYBUTTON_VALUE': {
      const { args } = action

      return {
        ...state,
        value: args.value,
      }
    }

    case 'SET_PAYBUTTON_FONT': {
      const { args } = action

      return {
        ...state,
        font: args.font,
      }
    }

    case 'SET_PAYBUTTON_RADIO': {
      const { args } = action

      return {
        ...state,
        borderRadius: args.borderRadius,
      }
    }

    case 'SET_PAYBUTTON_WIDTH': {
      const { args } = action

      return {
        ...state,
        width: args.width,
      }
    }

    case 'SET_PAYBUTTON_NORMAL_TEXT_COLOR': {
      const { args } = action
      const { normal } = state

      return {
        ...state,
        normal: {
          ...normal,
          textColor: args.color,
        },
      }
    }

    case 'SET_PAYBUTTON_NORMAL_BACKGROUND_COLOR': {
      const { args } = action
      const { normal } = state

      return {
        ...state,
        normal: {
          ...normal,
          backgroundColor: args.color,
        },
      }
    }

    case 'SET_PAYBUTTON_NORMAL_OUTLINE_COLOR': {
      const { args } = action
      const { normal } = state

      return {
        ...state,
        normal: {
          ...normal,
          outlineColor: args.color,
        },
      }
    }

    case 'SET_PAYBUTTON_HOVER_TEXT_COLOR': {
      const { args } = action
      const { hover } = state

      return {
        ...state,
        hover: {
          ...hover,
          textColor: args.color,
        },
      }
    }

    case 'SET_PAYBUTTON_HOVER_BACKGROUND_COLOR': {
      const { args } = action
      const { hover } = state

      return {
        ...state,
        hover: {
          ...hover,
          backgroundColor: args.color,
        },
      }
    }

    case 'SET_PAYBUTTON_HOVER_OUTLINE_COLOR': {
      const { args } = action
      const { hover } = state

      return {
        ...state,
        hover: {
          ...hover,
          outlineColor: args.color,
        },
      }
    }

    case 'SET_PAYBUTTON_STYLES': {
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
