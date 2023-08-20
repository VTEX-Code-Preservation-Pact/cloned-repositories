export const categoryMetrics = async (
  _: unknown,
  { data }: { data: unknown },
  { clients: { adminMetrics: AdminMetricsClient } }: Context
) => {
  return AdminMetricsClient.categoryMetrics(data)
}

export const subcategoryMetrics = async (
  _: unknown,
  { category, data }: { category: string; data: unknown },
  { clients: { adminMetrics: AdminMetricsClient } }: Context
) => {
  return AdminMetricsClient.subcategoryMetrics(category, data)
}

export const ticketAverage = async (
  _: unknown,
  { data }: { data: unknown },
  { clients: { adminMetrics: AdminMetricsClient } }: Context
) => {
  return AdminMetricsClient.ticketAverage(data)
}

export const checkout = async (
  _: unknown,
  { data }: { data: unknown },
  { clients: { adminMetrics: AdminMetricsClient } }: Context
) => {
  return AdminMetricsClient.checkout(data)
}

export const button = async (
  _: unknown,
  { data }: { data: unknown },
  { clients: { adminMetrics: AdminMetricsClient } }: Context
) => {
  return AdminMetricsClient.button(data)
}

export const conversionRate = async (
  _: unknown,
  { data }: { data: unknown },
  { clients: { adminMetrics: AdminMetricsClient } }: Context
) => {
  return AdminMetricsClient.conversionRate(data)
}
