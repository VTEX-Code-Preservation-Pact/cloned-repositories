using Newtonsoft.Json;

namespace TrackingIntegration.Models
{
    public class Package
    {
        /// <summary>
        ///     ID of the packages' order
        /// </summary>
        [JsonProperty(PropertyName = "orderId")]
        public string OrderId { get; set; }

        /// <summary>
        ///     ID of the order's invoice
        /// </summary>
        [JsonProperty(PropertyName = "invoiceNumber")]
        public string InvoiceNumber { get; set; }

        /// <summary>
        ///     Tracking number used in queries to the Courier
        /// </summary>
        [JsonProperty(PropertyName = "trackingNumber")]
        public string TrackingNumber { get; set; }
    }
}