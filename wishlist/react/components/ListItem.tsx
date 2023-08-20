import classNames from 'classnames'
import React, { Component, ReactNode } from 'react'
import { InjectedIntlProps, injectIntl, defineMessages } from 'react-intl'
import {
  ActionMenu,
  Checkbox,
  IconOptionsDots,
  IconVisibilityOff,
  IconVisibilityOn,
} from 'vtex.styleguide'
import DialogMessage from './Dialog/DialogMessage'
import withSettings from '../withSettings'
import { compose } from 'react-apollo'

interface ListItemProps extends InjectedIntlProps, SettingsProps {
  id: number
  list: List
  isDefault: boolean
  isSelected?: boolean
  showMenuOptions?: boolean
  hideAction?: boolean
  hideBorders?: boolean
  onClick?: (id: number) => void
  onSelected?: (id: number, isSelected?: boolean) => void
  onDeleted?: (listId: string) => Promise<void>
  onUpdated?: (index: number) => void
}

interface ListItemState {
  showDeleteDialog?: boolean
}

const ICON_SIZE = 20
const messages = defineMessages({
  optionConfiguration: {
    defaultMessage: '',
    id: 'store/wishlist-option-configuration',
  },
  optionDelete: {
    defaultMessage: '',
    id: 'store/wishlist-option-delete',
  },
  messageDeleteConfirmation: {
    defaultMessage: '',
    id: 'store/wishlist-delete-confirmation-message',
  },
  defaultListName: {
    id: 'store/wishlist-default-list-name',
    defaultMessage: '',
  },
})

class ListItem extends Component<ListItemProps, {}> {
  public state: ListItemState = {}

  private options = [
    {
      onClick: () =>
        this.props.onUpdated && this.props.onUpdated(this.props.id),
      label: this.props.intl.formatMessage(messages.optionConfiguration),
    },
    {
      onClick: () => this.setState({ showDeleteDialog: true }),
      label: this.props.intl.formatMessage(messages.optionDelete),
    },
  ]

  private isComponentMounted: boolean = false

  public componentDidMount() {
    this.isComponentMounted = true
  }

  public componentWillUnmount() {
    this.isComponentMounted = false
  }

  public render(): ReactNode {
    const {
      id,
      list: { name, isPublic, id: listId },
      isSelected,
      isDefault,
      showMenuOptions,
      hideAction,
      hideBorders,
      intl: { formatMessage },
      onClick,
      onDeleted,
      onSelected,
      settings: { appSettings },
    } = this.props
    const { showDeleteDialog } = this.state
    const defaultListName =
      (appSettings && appSettings.defaultListName) ||
      formatMessage(messages.defaultListName)

    const className = classNames('w-100 flex flex-row items-center pv4', {
      'bg-action-secondary': isDefault && !hideBorders,
      'bb b--muted-4': !hideBorders,
      'c-emphasis': hideBorders && isSelected,
      'c-muted-2': !isSelected || !hideBorders,
      pl4: showMenuOptions,
      ph4: !showMenuOptions,
    })
    const nameClassName = classNames('w-100 mh4 mv1', {
      'flex justify-center pv2': isDefault && !hideBorders,
    })

    return (
      <div className={className}>
        <div
          tabIndex={0}
          role="button"
          className="w-100 flex pointer"
          onClick={() => onClick && onClick(id)}
          onKeyPress={this.handleKeyPress}
        >
          {(!isDefault || hideBorders) && (
            <div className="flex items-center ml2">
              {isPublic ? <IconVisibilityOn /> : <IconVisibilityOff />}
            </div>
          )}
          <span className={nameClassName}>
            {isDefault ? defaultListName : name}
          </span>
        </div>
        {!hideAction &&
          (showMenuOptions
            ? !isDefault && (
                <ActionMenu
                  options={this.options}
                  hideCaretIcon
                  buttonProps={{
                    variation: 'tertiary',
                    icon: <IconOptionsDots size={ICON_SIZE} />,
                    size: 'small',
                  }}
                />
              )
            : !isDefault && (
                <div className="flex items-center c-action-primary">
                  <Checkbox
                    checked={isSelected}
                    onChange={() => onSelected && onSelected(id, isSelected)}
                  />
                </div>
              ))}
        {showDeleteDialog && (
          <DialogMessage
            message={formatMessage(messages.messageDeleteConfirmation, {
              listName: name,
            })}
            onClose={() => this.setState({ showDeleteDialog: false })}
            onSuccess={() =>
              onDeleted &&
              onDeleted(listId || '')
                .then(
                  () =>
                    this.isComponentMounted &&
                    this.setState({ showDeleteDialog: false })
                )
                .catch(
                  () =>
                    this.isComponentMounted &&
                    this.setState({ showDeleteDialog: false })
                )
            }
          />
        )}
      </div>
    )
  }

  private handleKeyPress = (e: React.KeyboardEvent<{}>) => {
    const { onClick, id } = this.props
    if (e.key == 'Enter') {
      onClick && onClick(id)
    }
  }
}

export default compose(
  injectIntl,
  withSettings
)(ListItem)
