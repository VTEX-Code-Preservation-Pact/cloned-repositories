const useKuikpayButtonPreview = () => {
  const disabled = false

  const handleClick: () => void = () => {}

  const processShowLogo = () => {
    return 'Compra rápida'
  }

  return { disabled, handleClick, processShowLogo }
}

export default useKuikpayButtonPreview
