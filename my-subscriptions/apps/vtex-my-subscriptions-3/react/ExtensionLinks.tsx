import { FunctionComponent, ReactElement } from 'react'
import { WrappedComponentProps, injectIntl, defineMessages } from 'react-intl'

const messages = defineMessages({
  title: {
    id: 'subscription.title.list',
  },
})

const ExtensionLinks: FunctionComponent<Props> = ({ render, intl }) => {
  return render([
    {
      name: intl.formatMessage(messages.title),
      path: '/subscriptions',
    },
  ])
}

interface RenderArgs {
  name: string
  path: string
}

interface Props extends WrappedComponentProps {
  render: (args: RenderArgs[]) => ReactElement
}

export default injectIntl(ExtensionLinks)
