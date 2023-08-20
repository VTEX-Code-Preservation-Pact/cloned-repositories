import { EventLoopDelayMonitor, monitorEventLoopDelay } from 'perf_hooks'
import { Gauge } from 'prom-client'
import { nanosecondsToSeconds } from '../../../../utils'
import { createEventLoopLagMaxInstrument, createEventLoopLagPercentilesInstrument } from '../instruments'
import { EventLoopMetricLabels } from '../MetricNames'

export class EventLoopLagMeasurer {
  private eventLoopDelayMonitor: EventLoopDelayMonitor

  private percentilesInstrument: Gauge<string>
  private maxInstrument: Gauge<string>

  constructor() {
    this.eventLoopDelayMonitor = monitorEventLoopDelay({ resolution: 10 })
    this.percentilesInstrument = createEventLoopLagPercentilesInstrument()
    this.maxInstrument = createEventLoopLagMaxInstrument()
  }

  public start() {
    this.eventLoopDelayMonitor.enable()
  }

  public async updateInstrumentsAndReset() {
    this.maxInstrument.set(nanosecondsToSeconds(this.eventLoopDelayMonitor.max))
    this.setPercentileObservation(95)
    this.setPercentileObservation(99)
    this.eventLoopDelayMonitor.reset()
  }

  private setPercentileObservation(percentile: number) {
    this.percentilesInstrument.set(
      { [EventLoopMetricLabels.PERCENTILE]: percentile },
      nanosecondsToSeconds(this.eventLoopDelayMonitor.percentile(percentile))
    )
  }
}
