using System.Threading.Tasks;
using service.Factory;
using service.Models;
using service.Services.Remote;

namespace service.Services
{
    public class PriceService : IProductService
    {
        private readonly IErpService _erpService;

        public PriceService(IErpService erpService)
        {
            _erpService = erpService;
        }

        public async Task<QuoteDto> GetQuote(QuoteDto quoteDto)
        {
            var erpQuoteDtoReq = ErpQuoteFactory.BuildFrom(quoteDto);
            var erpQuoteDtoResp = await _erpService.GetQuote(erpQuoteDtoReq);
            return QuoteFactory.MergeQuoteDto(quoteDto, QuoteFactory.BuildFrom(erpQuoteDtoResp));
        }
    }
}