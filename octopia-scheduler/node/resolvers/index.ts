import { getAllSchedulers } from './schedulers/getAll'
import { getSchedulerById } from './schedulers/getById'
import { createOrUpdateScheduler } from './schedulers/createOrUpdate'
import { deleteScheduler } from './schedulers/delete'

export const resolvers = {
  Query: {
    getAllSchedulers,
    getSchedulerById,
  },
  Mutation: {
    createOrUpdateScheduler,
    deleteScheduler,
  },
}
