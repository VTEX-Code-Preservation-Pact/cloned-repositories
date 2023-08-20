using Microsoft.AspNetCore.Mvc;
using Vtex.Api.Context;
using System.Threading.Tasks;
using System;
using Newtonsoft.Json;
using service.Factory;
using service.Models.HealthCheck;
using service.Models.Price;
using service.Services;

namespace service.Controllers
{
    public class RoutesController : Controller
    {
        private readonly IIOServiceContext _context;
        private readonly IProductService _productService;

        public RoutesController(IIOServiceContext context, IProductService productService)
        {
            _context = context;
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult> HealthCheck()
        {
            return Ok(new HealthCheckResponse());
        }

        [HttpPost]
        public async Task<ActionResult> GetPrice([FromBody] PriceRequest request)
        {
            try
            {
                var result = await _productService.GetQuote(request.Item);
                return Ok(new PriceResponse(PriceResponseItemFactory.BuildFrom(result)));
            }
            catch (JsonSerializationException ex)
            {
                _context.Vtex.Logger.Error("RouteController", "GetPrice", "Error finding product price,", ex);
                return BadRequest("One or more query parameters are invalid.");
            }
            catch (Exception ex)
            {
                _context.Vtex.Logger.Error("RouteController", "GetPrice", "Error finding product price,", ex);
                return Problem("Unexpected error.");
            }
        }
    }
}