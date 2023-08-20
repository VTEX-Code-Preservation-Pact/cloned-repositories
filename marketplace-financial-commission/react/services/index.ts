import { config } from '../utils/config'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export async function searchDashboard(startDate: string, endDate: string) {
  try {
    const dateIni = `dateIni=${startDate}`
    const dateEnd = `dateEnd=${endDate}`
    const url = config.getUrl(`dashboard/searchDashboard?${dateIni}&${dateEnd}`)
    const response = await fetch(url, {
      method: 'GET',
      headers,
    })

    return await response.json()
  } catch (e) {
    throw e
  }
}

export async function getSellers() {
  try {
    const response = await fetch(config.getUrl('sellers/getsellers'), {
      method: 'GET',
      headers,
    })

    const res = await response.json()

    return res
  } catch (e) {
    throw e
  }
}

export async function getTemplate() {
  try {
    const response = await fetch(config.getUrl('_v/segment/template'), {
      method: 'GET',
      headers,
    })

    const res = await response.json()

    return res
  } catch (e) {
    throw e
  }
}

export async function sendEmail(data: Invoice) {
  try {
    const payload = {
      email: data.seller?.contact.email,
      jsonData: { ...data },
    }

    const response = await fetch(config.getUrl('_v/mail'), {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })

    return response.status
  } catch (e) {
    throw e
  }
}
