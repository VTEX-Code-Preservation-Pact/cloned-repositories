import type { TypeColorStyle } from '../interfaces'
import { useStyleSettings } from './context'

export const useModalMenu = () => {
  const {
    state: {
      modalStyles: {
        font,
        icons: { color: iconsColor },
        backgroundColor,
        button: { borderRadius, hover: hoverStyles, normal: noramlStyles },
      },
    },
    dispatch,
  } = useStyleSettings()

  const handleFontAction = (fontValue: string) =>
    dispatch({ type: 'SET_MODAL_FONT', args: { font: fontValue } })

  const handleIconsColorAction = (color: string) =>
    dispatch({ type: 'SET_MODAL_ICONS_COLOR', args: { iconsColor: color } })

  const handleBorderRadiusAction = (radio: number) =>
    dispatch({ type: 'SET_MODAL_RADIO', args: { borderRadiusBtn: radio } })

  const handleBackgroundAction = (color: string) =>
    dispatch({
      type: 'SET_MODAL_BACKGROUND_COLOR',
      args: { backgroundColor: color },
    })

  const handleButtonStyleAction = (type: TypeColorStyle, color: string) => {
    switch (type) {
      case 'normal_text':
        dispatch({
          type: 'SET_MODAL_BTN_NORMAL_TEXT_COLOR',
          args: { color },
        })
        break

      case 'normal_background':
        dispatch({
          type: 'SET_MODAL_BTN_NORMAL_BACKGROUND_COLOR',
          args: { color },
        })
        break

      case 'normal_outline':
        dispatch({
          type: 'SET_MODAL_BTN_NORMAL_OUTLINE_COLOR',
          args: { color },
        })
        break

      case 'hover_text':
        dispatch({
          type: 'SET_MODAL_BTN_HOVER_TEXT_COLOR',
          args: { color },
        })
        break

      case 'hover_background':
        dispatch({
          type: 'SET_MODAL_BTN_HOVER_BACKGROUND_COLOR',
          args: { color },
        })
        break

      case 'hover_outline':
        dispatch({
          type: 'SET_MODAL_BTN_HOVER_OUTLINE_COLOR',
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
        color = noramlStyles.textColor
        break

      case 'normal_background':
        color = noramlStyles.backgroundColor
        break

      case 'normal_outline':
        color = noramlStyles.outlineColor
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
    font,
    iconsColor,
    backgroundColor,
    borderRadius,
    handleFontAction,
    handleIconsColorAction,
    handleBackgroundAction,
    handleBorderRadiusAction,
    handleButtonStyleAction,
    getColorStyle,
  }
}
