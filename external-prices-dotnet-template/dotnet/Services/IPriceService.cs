using System.Threading.Tasks;
using service.Models;

namespace service.Services
{
    public interface IProductService
    {
        Task<QuoteDto> GetQuote(QuoteDto quoteDto);
    }
}