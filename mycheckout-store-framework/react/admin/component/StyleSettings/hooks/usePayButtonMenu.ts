import type { TypeColorStyle } from '../interfaces'
import { useStyleSettings } from './context'

export const usePayButtonMenu = () => {
  const {
    state: {
      buttonStyles: {
        borderRadius,
        font,
        hover: hoverStyles,
        normal: normalStyles,
        value: valueButton,
        width,
      },
    },
    dispatch,
  } = useStyleSettings()

  const handleNameAction = (value: string) =>
    dispatch({ type: 'SET_PAYBUTTON_VALUE', args: { value } })

  const handleFontAction = (fontValue: string) =>
    dispatch({ type: 'SET_PAYBUTTON_FONT', args: { font: fontValue } })

  const handleBorderRadiusAction = (radio: number) =>
    dispatch({ type: 'SET_PAYBUTTON_RADIO', args: { borderRadius: radio } })

  const handleWidthAction = (value: number) =>
    dispatch({ type: 'SET_PAYBUTTON_WIDTH', args: { width: value } })

  const handleButtonStyleAction = (type: TypeColorStyle, color: string) => {
    switch (type) {
      case 'normal_text':
        dispatch({
          type: 'SET_PAYBUTTON_NORMAL_TEXT_COLOR',
          args: { color },
        })
        break

      case 'normal_background':
        dispatch({
          type: 'SET_PAYBUTTON_NORMAL_BACKGROUND_COLOR',
          args: { color },
        })
        break

      case 'normal_outline':
        dispatch({
          type: 'SET_PAYBUTTON_NORMAL_OUTLINE_COLOR',
          args: { color },
        })
        break

      case 'hover_text':
        dispatch({
          type: 'SET_PAYBUTTON_HOVER_TEXT_COLOR',
          args: { color },
        })
        break

      case 'hover_background':
        dispatch({
          type: 'SET_PAYBUTTON_HOVER_BACKGROUND_COLOR',
          args: { color },
        })
        break

      case 'hover_outline':
        dispatch({
          type: 'SET_PAYBUTTON_HOVER_OUTLINE_COLOR',
          args: { color },
        })
        break

      default:
        break
    }
  }

  const getColorStyle = (type: TypeColorStyle) => {
    let color = ''

    switch (type) {
      case 'normal_text':
        color = normalStyles.textColor
        break

      case 'normal_background':
        color = normalStyles.backgroundColor
        break

      case 'normal_outline':
        color = normalStyles.outlineColor
        break

      case 'hover_text':
        color = hoverStyles.textColor
        break

      case 'hover_background':
        color = hoverStyles.backgroundColor
        break

      case 'hover_outline':
        color = hoverStyles.outlineColor
        break

      default:
        break
    }

    return color
  }

  return {
    borderRadius,
    font,
    valueButton,
    width,
    getColorStyle,
    handleBorderRadiusAction,
    handleButtonStyleAction,
    handleFontAction,
    handleNameAction,
    handleWidthAction,
  }
}
