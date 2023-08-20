import {
  LeverApplication,
  LeverOpportunity,
  LeverPaginatedResponse,
} from './lever'

export type CandidateStageChange = {
  data: {
    candidateId: string
    contactId: string
    fromStageId: string
    toStageId: string
    opportunityId: string
  }
  signature: string
  token: string
  id: string
  triggeredAt: number
  event: string
}

export interface CandidateStageChangeRich extends CandidateStageChange {
  fullOpportunity: {
    data: LeverOpportunity
    applications: LeverPaginatedResponse<LeverApplication>
  }
}
