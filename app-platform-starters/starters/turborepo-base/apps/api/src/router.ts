import express from 'express'
import apiRoutes from './api/routes'

const router = express.Router()

// this is a global route
router.get('/health', function (req, res) {
  res.sendStatus(200)
})

router.use('/api', apiRoutes) // use routes from hello world component

export default router
