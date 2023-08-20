using service.Models;

namespace service.Factory
{
    public class ErpQuoteFactory
    {
        public static ErpQuoteDto BuildFrom(QuoteDto quoteDto)
        {
            return new ErpQuoteDto
            {
                SkuId = quoteDto.SkuId,
                Price = quoteDto.Price
            };
        }
    }
}