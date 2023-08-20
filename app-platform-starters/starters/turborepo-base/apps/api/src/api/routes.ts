import { Router } from 'express'
import { publicMessage } from './publicMessage'

const router = Router()

// path is /api/public
router.get('/public', (req, res) => {
  const message: string = publicMessage()
  res.send({ msg: message })
})

export default router
