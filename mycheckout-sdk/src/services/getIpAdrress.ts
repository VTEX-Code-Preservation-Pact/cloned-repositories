export const getIpAddress = async () => {
  const requestOptions = {
    method: 'GET',
  }

  const response = await fetch(
    'https://api.ipify.org?format=json',
    requestOptions
  )

  const { ip: ipAddress } = await response.json()

  return ipAddress
}
