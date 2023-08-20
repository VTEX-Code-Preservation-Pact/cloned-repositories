# External Prices App

A reference IO app to integrate external price sources with VTEX Pricing Hub.

## Implementation

1. Fork this app.
2. In the `manifest.json` file:
    * Change the `vendor` field to the name of the account you are using.
    * Change the `name` field to one of your choosing.
    * Add your service host (e.g. `myhost.com`) in an `outbound-access` policy.
3. In the `dotnet/Constants.cs` file, add your service endpoint as follows:

    ```
    namespace service
    {
        public static class Constants
        {
            public const string ErpPricesUrl = "http://myservice.com";
        
        }
    }
    ```


4. Change the `dotnet/Services/Remote/ErpService.cs` file to parse data received by the external pricing app and return it in a way that Pricing Hub can understand. See more details on the specification of this format in the [Pricing Hub documentation](https://developers.vtex.com/vtex-rest-api/docs/pricing-hub).


> ⛔ Do not change the `"routes"` in `dotnet/service.json` nor the files in `node/typings/`, since they were created to reflect Pricing Hub behavior.


