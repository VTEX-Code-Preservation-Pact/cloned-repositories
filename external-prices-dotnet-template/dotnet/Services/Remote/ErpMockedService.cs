using System.Threading.Tasks;
using service.Models;

namespace service.Services.Remote
{
    public class ErpMockedService : IErpService
    {
        public async Task<ErpQuoteDto> GetQuote(ErpQuoteDto erpQuoteDto)
        {
            return new ErpQuoteDto
            {
                SkuId = erpQuoteDto.SkuId,
                Price = int.Parse(erpQuoteDto.SkuId) * 10,
            };
        }
    }
}