using System.Runtime.Serialization;

namespace service.Models
{
    [DataContract]
    public class ErpQuoteDto
    {
        [DataMember(Name = "skuId")] public string SkuId { get; set; }

        [DataMember(Name = "price")] public double Price { get; set; }
    }
}