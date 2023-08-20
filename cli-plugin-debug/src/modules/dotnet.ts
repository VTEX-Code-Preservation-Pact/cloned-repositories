import { Runtime, ManifestEditor, logger } from 'vtex'

export default async (debugInst: string) => {
  const manifest = await ManifestEditor.getManifestEditor()
  const { name, vendor, builders } = manifest

  if (!builders?.dotnet) {
    logger.error('This command can only be used for dotnet apps')

    return
  }

  const runtimeClient = Runtime.createClient()

  await runtimeClient.debugDotnetApp(name, vendor, manifest.major, debugInst)
}
