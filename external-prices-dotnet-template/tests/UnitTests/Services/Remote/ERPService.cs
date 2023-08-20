using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using Moq;
using NUnit.Framework;
using service.Models;
using service.Services.Remote;
using service.Util.Provider;

namespace UnitTests.Services.Remote
{
    
    [TestFixture]
    public class ERPServiceTest
    {
        
        private Mock<IRequestProvider> _requestProviderMock;
        private ErpService _erpService;

        [SetUp]
        public void Setup()
        {
            _requestProviderMock = new Mock<IRequestProvider>();
            _erpService = new ErpService(_requestProviderMock.Object);
        }

        [Test]
        public void GetPrice_InputValid_ReturnQuote()
        {
            var response = new HttpResponseMessage(HttpStatusCode.Accepted) {Content = new StringContent("{}")};
            _requestProviderMock.Setup(x => x.SendAsync(It.IsAny<string>(), It.IsAny<HttpMethod>(), It.IsAny<Dictionary<string,string>>(), It.IsAny<string>())).ReturnsAsync(response);
            
            var quote = _erpService.GetQuote(new ErpQuoteDto());
            Assert.IsNotNull(quote);
        }
        
    }
}