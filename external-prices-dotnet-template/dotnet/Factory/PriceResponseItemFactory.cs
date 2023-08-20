using System;
using service.Models;
using service.Models.Price;

namespace service.Factory
{
    public class PriceResponseItemFactory
    {
        public static PriceResponseItem BuildFrom(QuoteDto quoteDto)
        {
            return new PriceResponseItem
            {
                Index = quoteDto.Index,
                SkuId = quoteDto.SkuId,
                Price = Convert.ToInt64(quoteDto.Price),
                PriceTable = ""
            };
        }
    }
}