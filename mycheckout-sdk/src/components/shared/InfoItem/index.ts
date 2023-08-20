import { InfoItem as InfoItemHOC } from './InfoItem'
import { InfoItemContent } from './InfoItemContent/InfoItemContent'
import { InfoItemIcon } from './InfoItemIcon/InfoItemIcon'
import type { InfoItemHOCProps } from '../interfaces/interfaces'
import { InfoItemEdit } from './InfoItemEdit/InfoItemEdit'

export const InfoItem: InfoItemHOCProps = Object.assign(InfoItemHOC, {
  Content: InfoItemContent,
  Edit: InfoItemEdit,
  Icon: InfoItemIcon,
})

export default InfoItem
