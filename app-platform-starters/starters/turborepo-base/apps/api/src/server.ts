import { app } from './app'
const PORT = process.env.PORT || 3010

app.listen(PORT, () => {
  const startupMessage = process.env.NODE_ENV === 'dev' ? `[DEVELOPMENT] Express server running on http://localhost:${PORT}` : `Express server listening on port ${PORT}`

  console.log(startupMessage)
})
