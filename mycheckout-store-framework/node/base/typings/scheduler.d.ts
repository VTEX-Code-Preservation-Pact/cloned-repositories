interface SchedulerArgs {
  id: string
  scheduler: { expression: string; endDate: string }
  request: {
    uri: string
    method: string
    body: unknown
  }
}
