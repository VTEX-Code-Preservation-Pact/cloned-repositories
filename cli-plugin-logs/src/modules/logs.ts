import { AppLogsEventSource, ManifestEditor, logger } from 'vtex'

export default async (app: string, options: any) => {
  if (options.all) {
    app = ''
  } else if (await ManifestEditor.isManifestReadable()) {
    const manifest = await ManifestEditor.getManifestEditor()

    app = app || manifest.name
  } else if (!app) {
    logger.error('App could not be specified. Did you forget --all?')

    return
  }

  const appLogsEventSource = AppLogsEventSource.createDefault({ app, showSeenLogs: options.past })

  appLogsEventSource.createLogEventSource()

  logger.info('Press CTRL+C to abort')
}
