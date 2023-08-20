using System.Runtime.Serialization;

namespace service.Models.Price
{
    [DataContract]
    public class PriceRequest
    {
        [DataMember(Name = "item")] public QuoteDto Item { get; set; }

        //TODO implement get function with session parameters - custom session keys
        [DataMember(Name = "context")] public PriceRequestContext Context { get; set; }
    }
}