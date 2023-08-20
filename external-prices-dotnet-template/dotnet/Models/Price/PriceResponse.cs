using System.Runtime.Serialization;

namespace service.Models.Price
{
    [DataContract]
    public class PriceResponse
    {
        public PriceResponse(PriceResponseItem priceResponseItem)
        {
            Item = priceResponseItem;
            Message = "Price quoted successfully.";
        }

        [DataMember(Name = "message")] public string Message { get; set; }
        [DataMember(Name = "item")] public PriceResponseItem Item { get; set; }
    }
}