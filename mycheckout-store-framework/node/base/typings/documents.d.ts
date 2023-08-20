interface PaginatedDocumentResponse {
  count: number
  total: number
  current: number
  prev: number
  next: number
  data: DocumentTypes[]
}

interface DocumentTypes {
  id: string
  name: string
  type: string
}

interface DocumentServiceImpl {
  getDocumentTypes(): unknown
}
