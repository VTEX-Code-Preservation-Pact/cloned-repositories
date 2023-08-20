type ServiceErrorArgs = {
  message: string
  reason: string
  status?: number
}

export class ServiceError extends Error {
  constructor({ message, reason, status }: ServiceErrorArgs) {
    super(message)
    this.reason = reason ?? 'INTERNAL_SERVER_ERROR'
    this.status = status ?? 500
  }

  public readonly reason: string
  public readonly status: number
}
