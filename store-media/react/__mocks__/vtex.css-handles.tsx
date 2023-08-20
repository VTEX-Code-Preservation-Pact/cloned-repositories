export const useCssHandles = (cssHandles: string[]) => {
  const handles: Record<string, string> = {}

  cssHandles.forEach((handle) => {
    handles[handle] = handle
  })

  return {
    handles,
    withModifiers: (handle: string, modifier: string) => {
      return `${handle} ${handle}--${modifier}`
    },
  }
}

export const useCustomClasses = (fn: () => unknown) => fn()
