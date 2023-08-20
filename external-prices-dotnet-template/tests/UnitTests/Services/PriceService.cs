using FluentAssertions;
using Moq;
using NUnit.Framework;
using service.Models;
using service.Services;
using service.Services.Remote;

namespace UnitTests.Services
{
    [TestFixture]
    public class PriceServiceTest
    {
        private PriceService _priceService;
        private Mock<IErpService> _erpServiceMock;

        [SetUp]
        public void Setup()
        {
            _erpServiceMock = new Mock<IErpService>();
            _priceService = new PriceService(_erpServiceMock.Object);
        }

        [Test]
        public void GetPrice_InputValid_ReturnQuote()
        {
            var quote = new ErpQuoteDto()
            {
                SkuId = "SKU_ID"
            };
            _erpServiceMock.Setup(x => x.GetQuote(It.IsAny<ErpQuoteDto>())).ReturnsAsync(quote);
            
            var ret = _priceService.GetQuote(new QuoteDto()).Result;
            ret.Should().BeEquivalentTo(new QuoteDto()
            {
                SkuId = "SKU_ID"
            });
        }
        
    }
}