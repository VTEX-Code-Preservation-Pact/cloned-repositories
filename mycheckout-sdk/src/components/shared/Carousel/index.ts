import { Carousel as CarouselHOC } from './Carousel'
import { CarouselItem } from './CarouselItems/CarouselItem'
import type { CarouselHOCProps } from '../interfaces/interfaces'

export const Carousel: CarouselHOCProps = Object.assign(CarouselHOC, {
  Item: CarouselItem,
})

export default Carousel
