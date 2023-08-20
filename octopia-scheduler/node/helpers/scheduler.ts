import type {
  SchedulerConfiguration,
  SchedulerConfigurationPayload,
} from 'vtex.octopia-scheduler'

/**
 * Function to create the scheduler configuration
 * @param args
 * @returns SchedulerConfiguration
 */
export function createSchedulerConfiguration(
  args: SchedulerConfigurationPayload
): SchedulerConfiguration {
  const {
    type,
    production,
    account,
    workspace,
    id,
    endDate,
    expression,
    uri,
    headers = defaultHeaders(),
    body = defaultBody(type),
  } = args

  return {
    id: id ?? createId(type),
    scheduler: {
      expression: expression ?? defaultExpression(type),
      endDate: endDate ?? createEndDate(production),
    },
    retry: {
      delay: {
        addMinutes: 2,
        addHours: 0,
        addDays: 0,
      },
      times: 2,
      backOffRate: 2,
    },
    request: {
      uri: uri ?? defaultUri(workspace, account, type),
      method: 'POST',
      headers,
      body,
    },
  }
}

function createId(type: SchedulerConfigurationPayload['type']) {
  return `${type.toUpperCase()}_SCHEDULER`
}

function createEndDate(production: boolean) {
  const endDate = new Date()

  // If the environment is not production, the endDate will be 24 hours from now
  endDate.setHours(endDate.getHours() + 24)

  // If the environment is production, the endDate will be 10 years from now
  if (production) {
    endDate.setFullYear(endDate.getFullYear() + 10)
  }

  return endDate.toISOString()
}

function defaultExpression(type: SchedulerConfigurationPayload['type']) {
  return type === 'offers' ? '0 0/12 * * *' : '0 * * * *'
}

function defaultUri(
  workspace: string,
  account: string,
  type: SchedulerConfigurationPayload['type']
) {
  return `https://${workspace}--${account}.myvtex.com/_v/octopia-integration/${type}`
}

function defaultHeaders() {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
}

function defaultBody(type: SchedulerConfigurationPayload['type']) {
  return {
    text: `${type} scheduler`,
  }
}
