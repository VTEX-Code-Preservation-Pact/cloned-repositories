using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace service.Util.Provider
{
    public class RequestProvider : IRequestProvider
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly ITokenProvider _tokenProvider;

        public RequestProvider(IHttpClientFactory clientFactory, ITokenProvider tokenProvider)
        {
            _clientFactory = clientFactory;
            _tokenProvider = tokenProvider;
        }

        public async Task<HttpResponseMessage> SendAsync(string url, HttpMethod verb, Dictionary<string, string> queryParams, string body = null)
        {
            var requestMessage = CreateRequest(url, verb, queryParams, body);
            return await _clientFactory.CreateClient().SendAsync(requestMessage);
        }
        
        private HttpRequestMessage CreateRequest(string url, HttpMethod verb, Dictionary<string, string> queryParams, string body = null)
        {
            var requestMessage = new HttpRequestMessage(verb, "")
            {
                RequestUri = BuildUri(url, queryParams),
                Content = new StringContent(body, Encoding.UTF8, "application/json")
            };
            requestMessage.Headers.Add("token", _tokenProvider.GetToken());
            return requestMessage;
        }

        public async Task<T> ReadJsonStream<T>(Stream stream)
        {
            using var reader = new StreamReader(stream);
            var body = await reader.ReadToEndAsync();
            return JsonConvert.DeserializeObject<T>(body);
        }

        public bool IsSuccess(HttpResponseMessage responseMessage)
        {
            return responseMessage.IsSuccessStatusCode || responseMessage.StatusCode == HttpStatusCode.NotModified;
        }

        private Uri BuildUri(string url, Dictionary<string, string> queryParams)
        {
            var array = (
                from key in queryParams.Keys
                select $"{Uri.EscapeDataString(key)}={Uri.EscapeDataString(queryParams[key])}"
            ).ToArray();
            return new Uri(url + "?" + string.Join("&", array));
        }
    }
}