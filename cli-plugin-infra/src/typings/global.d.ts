interface InfraResourceVersions {
  versions: {
    [region: string]: string[]
  }
}

interface InfraVersionMap {
  latest: {
    [name: string]: string
  }
  update: InfraUpdate
}

interface InfraUpdate {
  [name: string]: {
    latest: string
    current: string
  }
}
