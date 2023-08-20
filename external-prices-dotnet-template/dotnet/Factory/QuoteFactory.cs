using service.Models;

namespace service.Factory
{
    public class QuoteFactory
    {
        public static QuoteDto BuildFrom(ErpQuoteDto erpQuoteDto)
        {
            return new QuoteDto
            {
                SkuId = erpQuoteDto.SkuId,
                Price = erpQuoteDto.Price,
            };
        }

        public static QuoteDto MergeQuoteDto(QuoteDto initialQuoteDto, QuoteDto updatedQuoteDto)
        {
            return new QuoteDto
            {
                Index = initialQuoteDto.Index,
                SkuId = updatedQuoteDto.SkuId,
                Price = updatedQuoteDto.Price
            };
        }
    }
}