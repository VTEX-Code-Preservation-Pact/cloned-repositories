import type { AddButonStyleArgs } from './interfaces'

export const setStyles = (
  element: Element,
  styles: Array<{ name: string; value: string }>
) => {
  let stylesToString = ''

  const lastStyles = element
    .getAttribute('style')
    ?.split(';')
    .map((elementStyle) => {
      const [name, value] = elementStyle?.split(':')

      return {
        name,
        value,
      }
    })

  styles.forEach(({ name, value }) => (stylesToString += `${name}:${value};`))

  lastStyles?.forEach(({ name, value }) => {
    const exist = !!styles?.find((style) => style.name === name)?.name

    if (!exist && name) {
      stylesToString += `${name}:${value};`
    }
  })

  element.setAttribute('style', stylesToString)
}

export const setStylesButton = (
  element: Element,
  styles: AddButonStyleArgs
) => {
  const {
    backgroundColor,
    borderRadius,
    outlineColor,
    textColor,
    font,
    width,
  } = styles

  const stylesArgs = [
    { name: 'background-color', value: backgroundColor },
    { name: 'border-radius', value: `${borderRadius}px` },
    { name: 'border', value: `solid 1px ${outlineColor}` },
    { name: 'color', value: textColor },
    { name: 'width', value: `${width}%` },
  ]

  if (font) stylesArgs.push({ name: 'font-family', value: font })
  if (borderRadius) {
    stylesArgs.push({
      name: 'border-radius',
      value: `${borderRadius}px`,
    })
  }

  setStyles(element, stylesArgs)
}

export const addButtonEvent = (
  event: string,
  element: Element,
  styles: AddButonStyleArgs
) => element.addEventListener(event, () => setStylesButton(element, styles))
