import React, { FC } from 'react'

import Authentication from './authentication'
import { DividerArea } from './divider'
import Ping from './ping'
import Sandbox from './sandbox'
import ToggleArea from './toggle'

const Settings: FC = () => {
  return (
    <>
      <DividerArea />
      <ToggleArea />
      <DividerArea />
      <Sandbox />
      <DividerArea />
      <Authentication />
      <DividerArea />
      <Ping />
    </>
  )
}

export default Settings
