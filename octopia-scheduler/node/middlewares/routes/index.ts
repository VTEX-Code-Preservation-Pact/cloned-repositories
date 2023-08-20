import { method } from '@vtex/api'

import { errorHandler } from './errorHandler'
import { getAllSchedulers } from './schedulers/getAll'
import { getSchedulerById } from './schedulers/getById'
import { createOrUpdateScheduler } from './schedulers/createOrUpdate'
import { deleteScheduler } from './schedulers/delete'

export const applicationRoutes = {
  getAllSchedulers: method({
    GET: [errorHandler, getAllSchedulers],
  }),
  getSchedulerById: method({
    GET: [errorHandler, getSchedulerById],
  }),
  createOrUpdateScheduler: method({
    PUT: [errorHandler, createOrUpdateScheduler],
  }),
  deleteScheduler: method({
    DELETE: [errorHandler, deleteScheduler],
  }),
}
