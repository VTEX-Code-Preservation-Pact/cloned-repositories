import { infiniteScroll } from './InfinityScroll'
import { pagination } from './Pagination'

const render = (seeMore: string) => {
  switch (seeMore) {
    case 'pagination': {
      pagination()
      break
    }

    case 'infinite': {
      infiniteScroll()
      break
    }

    default: {
      infiniteScroll()
    }
  }
}

render('infinite')
