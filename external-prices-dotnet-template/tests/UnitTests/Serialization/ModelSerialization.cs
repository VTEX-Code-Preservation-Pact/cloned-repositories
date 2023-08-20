using AutoFixture;
using FluentAssertions;
using Newtonsoft.Json;
using NUnit.Framework;
using service.Models;

namespace UnitTests.Serialization
{
    [TestFixture]
    public class ModelSerialization
    {
        
        [Test]
        public void Deserialize_InputRandomValues_ReturnQuoteDto()
        {
            var quoteDto = new Fixture().Create<QuoteDto>();
            var json = JsonConvert.SerializeObject(quoteDto);
            var deserializedMessage = JsonConvert.DeserializeObject<QuoteDto>(json);
            deserializedMessage.Should().BeEquivalentTo(quoteDto);
        }
        
        [Test]
        public void Deserialize_InputRandomValues_ReturnErpQuoteDto()
        {
            var erpQuoteDto = new Fixture().Create<ErpQuoteDto>();
            var json = JsonConvert.SerializeObject(erpQuoteDto);
            var deserializedMessage = JsonConvert.DeserializeObject<ErpQuoteDto>(json);
            deserializedMessage.Should().BeEquivalentTo(erpQuoteDto);
        }
        
    }
}