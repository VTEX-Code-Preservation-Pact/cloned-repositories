import {
  Combobox as DefaultCombobox,
  ComboboxItem,
  ComboboxPopover,
  useComboboxStore,
} from '@ariakit/react'
import {
  AnyObject,
  Box,
  Flex,
  IconPlus,
  IconX,
  Text,
  csx,
} from '@vtex/admin-ui'
import { FormState } from '@vtex/admin-ui-form'
import { ReactNode, useMemo, useState } from 'react'
import * as styles from './Combobox.styles'

type ComboboxProps = {
  name: string
  label: string
  state: FormState
  list: {
    value: string
    label: string
  }[]
  placeholder?: string
  defaultSelected?: AnyObject[]
  getOptionValue?: (item: AnyObject) => string
  renderOption?: (item: AnyObject) => ReactNode
  isLoading?: boolean
  creatable?: boolean
}

export const Combobox = (props: ComboboxProps) => {
  const {
    list = [],
    label,
    name,
    state,
    placeholder,
    creatable = false,
  } = props
  const watchValue = state.watch(name)

  const [searchValue, setSearchValue] = useState('')

  const filteredList = useMemo(
    () =>
      searchValue
        ? list.filter((item) =>
            item.label.toLowerCase().includes(searchValue.toLowerCase())
          )
        : list,
    [list, searchValue]
  )

  const combobox = useComboboxStore({ gutter: 4, sameWidth: true })

  const handleCreate = () => {
    state.setValue(name, searchValue)
    combobox.setValue(searchValue)
    combobox.setOpen(false)
    setSearchValue('')
  }

  const handleReset = () => {
    state.setValue(name, '')
    combobox.setValue('')
    setSearchValue('')
  }

  const shouldShowCreate = creatable && !!searchValue
  const selectedValue = list.find((item) => item.value === watchValue)

  return (
    <Box csx={styles.wrapper}>
      <label htmlFor={name} className={csx(styles.label)}>
        {label}
      </label>

      {selectedValue ?? watchValue ? (
        <Flex csx={styles.combobox}>
          <Flex csx={styles.selected}>
            <span>{selectedValue?.label ?? watchValue}</span>{' '}
            <button type="button" onClick={handleReset}>
              <IconX size="small" />
            </button>
          </Flex>
        </Flex>
      ) : (
        <DefaultCombobox
          id={name}
          store={combobox}
          placeholder={placeholder}
          onChange={(evt) => setSearchValue(evt.target.value)}
          className={csx(styles.combobox)}
        />
      )}

      <ComboboxPopover store={combobox} className={csx(styles.popover)}>
        <Text
          variant="detail"
          tone="secondary"
          csx={{ padding: '16px 24px 8px' }}
        >
          Select option or create one
        </Text>
        <div className={csx(styles.scrollable)}>
          {filteredList.map((item) => (
            <ComboboxItem
              key={item.value}
              className={csx(styles.comboboxItem)}
              value={item.label}
              onClick={() => {
                state.setValue(name, item.value)
                setSearchValue('')
              }}
            >
              {item.label}
            </ComboboxItem>
          ))}
        </div>
        {shouldShowCreate && (
          <ComboboxItem
            onClick={handleCreate}
            className={csx(styles.createItem)}
          >
            <Flex
              align={'center'}
              csx={{
                gap: '8px',
                height: '36px',
                padding: '18px 24px',
                borderTop: '1px solid #DDDDDD',
              }}
            >
              <IconPlus />
              <Text variant="detail" tone="secondary">
                Create &quot;<strong>{searchValue}</strong>&quot;
              </Text>
            </Flex>
          </ComboboxItem>
        )}
      </ComboboxPopover>
    </Box>
  )
}
