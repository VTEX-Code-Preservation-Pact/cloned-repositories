import React from 'react'

import EnumTable from '../components/EnumTable'
import ObjectsTable from '../components/ObjectsTable'
import ArrayTable from '../components/ArrayTable'
import { capitalizeFirst } from '../utils/capitalizeFirst'

export const mapCustomTypes = (
  propsObj: Record<string, ObjSchemaInterface>,
  messages: Record<string, Record<string, string>>
) => {
  const mappedTypes: JSX.Element[] = []
  const mappedProps: Record<string, ObjSchemaInterface> = propsObj
  for (const key in mappedProps) {
    let currentComponent: JSX.Element | null = null
    const currentProp = mappedProps[key]
    if (currentProp.enum) {
      currentProp.type = `${capitalizeFirst(key)}Enum`
      currentComponent = (
        <EnumTable
          enumProps={currentProp}
          messages={messages}
          propTitle={currentProp.type}
        />
      )
    } else if (currentProp.type === 'object') {
      currentProp.type = capitalizeFirst(key)
      currentComponent = (
        <ObjectsTable
          objectProp={currentProp.properties}
          propTitle={currentProp.type}
          messages={messages}
        />
      )
    } else if (currentProp.type === 'array') {
      currentProp.type = `${capitalizeFirst(key)}[]`
      if (currentProp.items) {
        currentComponent = (
          <ArrayTable
            propArray={currentProp.items}
            propTitle={currentProp.type}
            messages={messages}
          />
        )
      }
    }
    currentProp.type = capitalizeFirst(currentProp.type)
    if (currentComponent) {
      mappedTypes.push(currentComponent)
    }
  }

  return { mappedTypes, mappedProps }
}
