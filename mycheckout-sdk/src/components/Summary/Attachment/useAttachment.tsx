import { useActions } from '../../../contexts/ActionsProviderV2'
import type { Offering } from '../../../interfaces'

interface Props {
  offering: Offering
  index: number
}

const useAttachment = ({ offering, index }: Props) => {
  const { addItemOffering, removeItemOffering } = useActions()

  const handleAdd = () => {
    addItemOffering({
      itemIndex: index,
      offeringId: offering.id,
    })
  }

  const handleDelete = () => {
    removeItemOffering({
      itemIndex: index,
      offeringId: offering.id,
    })
  }

  return { handleAdd, handleDelete }
}

export default useAttachment
