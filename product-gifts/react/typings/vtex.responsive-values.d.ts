declare module 'vtex.responsive-values' {
  enum InputDevices {
    mobile = 'mobile',
    phone = 'phone',
    tablet = 'tablet',
    desktop = 'desktop',
  }

  enum OutputDevices {
    phone = 'phone',
    tablet = 'tablet',
    desktop = 'desktop',
  }

  type ResponsiveInput<T> = { [P in keyof typeof InputDevices]?: T }
  type MaybeResponsiveInput<T> = T | ResponsiveInput<T>

  type ResponsiveOutput<T> = { [P in keyof typeof OutputDevices]: T }

  export function useResponsiveValue<T>(args: MaybeResponsiveInput<T>): T
}
