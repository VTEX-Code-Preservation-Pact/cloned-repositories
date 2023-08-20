export const getDocumentTypes = async (
  _: unknown,
  __: unknown,
  { clients: { documents: DocumentsClient } }: Context
) => ((await DocumentsClient.getDocumentTypes()) as { data: unknown }).data
