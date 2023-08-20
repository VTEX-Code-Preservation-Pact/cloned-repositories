using System;
using System.Collections.Generic;

namespace TrackingIntegration.Models
{
    public class TrackingHistory
    {
        public bool Delivered { get; set; }
        public bool Returned { get; set; }
        public bool StopTracking { get; set; }
        public List<EventTrackingData> Events { get; set; }
    }


    public class EventTrackingData
    {
        public string City { get; set; }
        public string State { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
    }
}