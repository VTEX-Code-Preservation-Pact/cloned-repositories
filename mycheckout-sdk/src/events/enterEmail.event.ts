interface Props {
  option: string
}
export const EnterEmailEvent = ({ option }: Props) => {
  try {
    option
  } catch (e) {
    console.error('Error - Enter email event: ', e)
  }
}
