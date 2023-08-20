import { FunctionComponent } from 'react'

declare global {
  interface StoreFunctionComponent<P = {}> extends FunctionComponent<P> {
    schema?: object
    getSchema?(props?: P): object
  }
}
