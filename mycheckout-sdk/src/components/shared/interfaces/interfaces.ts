import type { Props as CarouselProps } from '../Carousel/Carousel'
import type { Props as InfoItemContentProps } from '../InfoItem/InfoItemContent/InfoItemContent'
import type { Props as InfoItemEditProps } from '../InfoItem/InfoItemEdit/InfoItemEdit'
import type { Props as InfoItemIconProps } from '../InfoItem/InfoItemIcon/InfoItemIcon'
import type { Props as InfoItemProps } from '../InfoItem/InfoItem'
import type { Props as TitleItemProps } from '../Title/TitleItem/TitleItem'
import type { Props as TitleProps } from '../Title/Title'
import type { Props as CarouselItemProps } from '../Carousel/CarouselItems/CarouselItem'

export interface InfoItemContextProps {
  disabled?: boolean
}

export interface CarouselContextProps {
  data: unknown[]
}

export interface TitleHOCProps {
  (props: TitleProps): JSX.Element
  Item: (props: TitleItemProps) => JSX.Element
}

export interface InfoItemHOCProps {
  (props: InfoItemProps): JSX.Element
  Icon: (props: InfoItemIconProps) => JSX.Element
  Content: (props: InfoItemContentProps) => JSX.Element
  Edit: (props: InfoItemEditProps) => JSX.Element
}

export type Message = {
  type: 'success' | 'info'
  header?: string
  text?: string
}

export interface SharedContexProps {
  toastMessage: Message
  setToastMessage: React.Dispatch<React.SetStateAction<Message>>
}

export interface CarouselHOCProps {
  (props: CarouselProps): JSX.Element
  Item: (props: CarouselItemProps) => JSX.Element
}
