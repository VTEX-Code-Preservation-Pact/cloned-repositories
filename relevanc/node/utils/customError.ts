type CustomErrorProps = {
  message: string
  reason: string
  status: number
  data?: unknown
}

export class CustomError extends Error {
  constructor({ message, reason, status, data = null }: CustomErrorProps) {
    super(message)
    this.reason = reason ?? this.message
    this.status = status
    this.data = data
  }

  public readonly reason: string
  public readonly status: number
  public readonly data: unknown
}
