using System;
using System.Runtime.Serialization;

namespace service.Models.Price
{
    [DataContract]
    public class PriceResponseItem
    {
        [DataMember(Name = "index")] public int Index { get; set; }
        [DataMember(Name = "skuId")] public string SkuId { get; set; }
        [DataMember(Name = "price")] public long? Price { get; set; }
        [DataMember(Name = "costPrice")] public long? CostPrice { get; set; }
        [DataMember(Name = "listPrice")] public long? ListPrice { get; set; }
        [DataMember(Name = "priceTables")] public string PriceTable { get; set; }
        [DataMember(Name = "priceValidUntil")] public DateTime? PriceValidUntil { get; set; }
    }
}