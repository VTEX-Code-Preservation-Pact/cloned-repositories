using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using service.Services;
using service.Services.Remote;
using service.Util.Provider;

namespace Vtex
{
    public class StartupExtender
    {
        // This method is called inside Startup's constructor
        // You can use it to build a custom configuration
        public void ExtendConstructor(IConfiguration config, IWebHostEnvironment env)
        {

        }

        // This method is called inside Startup.ConfigureServices()
        // Note that you don't need to call AddControllers() here
        public void ExtendConfigureServices(IServiceCollection services)
        {
            services.AddHttpClient();
            services.AddControllers().AddNewtonsoftJson();
            services.AddSingleton<IRequestProvider, RequestProvider>();
            services.AddSingleton<ITokenProvider, TokenProvider>();
            services.AddSingleton<IErpService, ErpMockedService>();
            services.AddSingleton<IProductService, PriceService>();
        }

        // This method is called inside Startup.Configure() before calling app.UseRouting()
        public void ExtendConfigureBeforeRouting(IApplicationBuilder app, IWebHostEnvironment env)
        {

        }

        // This method is called inside Startup.Configure() before calling app.UseEndpoint()
        public void ExtendConfigureBeforeEndpoint(IApplicationBuilder app, IWebHostEnvironment env)
        {

        }

        // This method is called inside Startup.Configure() after calling app.UseEndpoint()
        public void ExtendConfigureAfterEndpoint(IApplicationBuilder app, IWebHostEnvironment env)
        {

        }
    }
}