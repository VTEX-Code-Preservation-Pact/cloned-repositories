using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using TrackingIntegration.Clients;
using TrackingIntegration.Models;

namespace TrackingIntegration.Controllers
{
    public class RoutesController : Controller
    {
        [HttpGet]
        [ResponseCache(Duration = 0, NoStore = true)]
        public ActionResult TrackingConfig()
        {
            return Ok(JObject.Parse(@"
            {
                ""displayName"": ""Tracking Boilerplate"",
                ""webHookUrl"": ""{{vtexio-public}}/_v/your-company.tracking-integration-boilerplate/trackPackages"",
                ""requiredExtraConfigs"": [
                    {
                      ""key"": ""myCustomParameter"",
                      ""name"": ""My Custom Parameter"",
                      ""description"": ""Parameter needed for .. reason""
                    }
                ]
            }"));
        }

        [HttpPost]
        [ResponseCache(Duration = 0, NoStore = true)]
        public async Task<ActionResult> TrackPackages([FromServices]TrackingClient trackingClient, [FromBody, Required]TrackingRequest trackingRequest)
        {
            return Ok(await trackingClient.TrackPackagesAsync(trackingRequest, Request.Headers["X-Vtex-Credential"]));
        }
    }
}