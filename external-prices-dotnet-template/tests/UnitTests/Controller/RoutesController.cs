using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using service.Controllers;
using service.Models;
using service.Models.Price;
using service.Services;
using service.Util.Provider;

namespace UnitTests.Controller
{
    [TestFixture]
    public class RoutesControllerTest
    {
        private Mock<IProductService> _productServiceMock;
        private RoutesController _routesController;
        private Mock<IRequestProvider> _requestProvider;

        [SetUp]
        public void Setup()
        {
            _productServiceMock = new Mock<IProductService>();
            _requestProvider = new Mock<IRequestProvider>();

            _routesController = new RoutesController(null, _productServiceMock.Object);
            _routesController.ControllerContext = new ControllerContext();
            _routesController.ControllerContext.HttpContext = new DefaultHttpContext();
        }

        [Test]
        public void GetPrice_InputValid_ReturnQuote()
        {
            var request = new PriceRequest
            {
                Item = new QuoteDto()
            };

            var quoteDtoResp = new QuoteDto();
            _productServiceMock.Setup(x => x.GetQuote(request.Item)).ReturnsAsync(quoteDtoResp);
            var result = _routesController.GetPrice(request).Result as ObjectResult;
            Assert.AreEqual(result?.StatusCode, (int) HttpStatusCode.OK);
        }

        [Test]
        public void HealthCheck_ReturnSuccess()
        {
            var request = new PriceRequest
            {
                Item = new QuoteDto()
            };

            var quoteDtoResp = new QuoteDto();
            _productServiceMock.Setup(x => x.GetQuote(request.Item)).ReturnsAsync(quoteDtoResp);
            var result = _routesController.HealthCheck().Result as ObjectResult;
            Assert.AreEqual(result?.StatusCode, (int) HttpStatusCode.OK);
        }
    }
}