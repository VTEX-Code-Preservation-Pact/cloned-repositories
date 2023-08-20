using System;
using System.Runtime.Serialization;
using System.Collections.Generic;

namespace service.Models
{
    [DataContract]
    public class QuoteDto
    {
        [DataMember(Name = "index")] public int Index { get; set; }
        [DataMember(Name = "skuId")] public string SkuId { get; set; }
        [DataMember(Name = "price")] public double Price { get; set; }
    }
}