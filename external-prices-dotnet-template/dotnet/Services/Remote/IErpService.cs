using System.Threading.Tasks;
using service.Models;

namespace service.Services.Remote
{
    public interface IErpService
    {
        Task<ErpQuoteDto> GetQuote(ErpQuoteDto erpQuoteDto);
    }
}