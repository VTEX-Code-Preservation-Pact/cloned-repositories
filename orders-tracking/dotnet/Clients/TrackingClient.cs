using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using TrackingIntegration.Models;

namespace TrackingIntegration.Clients
{
    public class TrackingClient
    {
        private readonly HttpClient _httpClient;
        private readonly JsonSerializerSettings _jsonSerializerSettings;

        public TrackingClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _jsonSerializerSettings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                NullValueHandling = NullValueHandling.Ignore,
                Converters = new List<JsonConverter>
                {
                    new Newtonsoft.Json.Converters.StringEnumConverter()
                }
            };
        }

        public async Task<List<PackageHistory>> TrackPackagesAsync(TrackingRequest trackingRequest, string authToken)
        {
            var packageHistory = new List<PackageHistory>();

            var myCustomParameter = trackingRequest.Config["myCustomParameter"];

            foreach (var package in trackingRequest.Packages)
            {
                var baseUrl = $"tracking-sandbox.getsandbox.com"; 
                var parameters = $"/trackPackages?myCustomParameter={myCustomParameter}&tracking-number={package.TrackingNumber}&invoice-number={package.InvoiceNumber}";
                var httpUrl = $"http://{baseUrl}{parameters}";
                var httpsUrl = $"https://{baseUrl}{parameters}";

                using (var request = new HttpRequestMessage
                {
                    Method = HttpMethod.Get, //HttpMethod.Post if needed
                    RequestUri = new Uri(httpUrl)
                })
                {
                    request.Headers.Add("X-Vtex-Proxy-To", httpsUrl);
                    request.Headers.Add("Proxy-Authorization", authToken);

                    using (var response = await _httpClient.SendAsync(request))
                    {
                        var responseString = await response.Content.ReadAsStringAsync();
                        //Console.WriteLine(responseString);
                        var resultObject = JsonConvert.DeserializeObject<JToken>(responseString, _jsonSerializerSettings);
                        
                        var trackingHistory = new TrackingHistory
                        {
                            Returned = false,
                            Delivered = false,
                            Events = new List<EventTrackingData>()
                        };
                        
                        //Parse result and return correspondent tracking history 
                        if (resultObject?["events"] is JArray eventsArray)
                        {
                            foreach (var item in eventsArray)
                            {
                                trackingHistory.Events.Add(new EventTrackingData
                                {
                                    City = item["city"].ToString(),
                                    State = item["state"].ToString(),
                                    Description = item["description"].ToString(),
                                    Date = DateTime.Parse(item["date"].ToString())
                                    // DateTime.ParseExact(item["date"].ToString(), "dd-MM-yyyy HH:mm:ss", CultureInfo.InvariantCulture),
                                });

                                if (item["delivered"].ToObject<bool>())
                                {
                                    trackingHistory.Delivered = true;
                                }
                            }
                        }
                        
                        packageHistory.Add(new PackageHistory
                        {
                            Package = package,
                            TrackingHistory = trackingHistory
                        });
                    }
                }
            }

            return packageHistory;
        }
    }
}