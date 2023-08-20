/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

type SvgrComponent = React.StatelessComponent<React.SVGAttributes<SVGElement>>

declare module '*.svg' {
  const svgUrl: string
  const svgComponent: SvgrComponent
  export default svgUrl
  export { svgComponent as ReactComponent }
}

declare module '*.graphql' {
  import type { DocumentNode } from 'graphql'

  const value: DocumentNode
  export default value
}

declare const $: any
declare const Payment: any
declare const PaymentezLoad: any
declare const PaymentForm: any
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __RUNTIME__: any
declare const MercadoPago: any
declare const SecureFields: any
declare const SecureFieldsLoad: any
declare const SecureFieldsCVCLoad: any
