# Orders Tracking Boilerplate
    
## How to create a new tracking app?

1. Copy the provided `tracking-integration-boilerplate` 
2. Suppose that your app name is `vtex.custom-tracking-integration`
3. Create a private endpoint that responds in the path: `/_v/tracking/config`
    * In this path you will configure what service you will use to track the packages that you receive
    * This is an example of a valid configuration:
    
    ```
    {
        "displayName": "Custom Tracking Integration",
        "webHookUrl": "{{vtexio-public}}/_v/vtex.custom-tracking-integration/trackPackages",
        "requiredExtraConfigs": [
            {
                "title": "myCustomField"
            }
        ]
    }
    ```
    
This example is saying that:
* The display name (the name that we will use to show to the user) is `My Custom Tracking` 
* The webhook URL that the tracking service has to call, when a matched package arrives, is `{{vtexio-public}}/_v/vtex.my-custom-tracking/trackPackages`
    - When you use `{{vtexio-public}}` the tracking service knows how to convert it to the current `account` and `workspace` that should be used
* You new app is telling to the tracking service that it needs an extra field and that it is called `myCustomField`. This field will be presented to the users so that they can fill it in.
    - This field will be sent to your app in a dictionary with its value.

4. On your configuration route, remember to create a policy that allows the `vtex.tracking-builder` to reach it: 

For instance:
```
"routes": {
    "trackingConfig": {
      "path": "/_v/tracking/config",
      "public": false,
      "policies": [{
        "effect": "allow",
        "actions": ["get"],
        "principals": [
            "vrn:apps:*:*:*:app/vtex.tracking-builder@*"
        ]
      }]
    }
  }
```

#### How is the request that my app will receive?

```
POST {configured endpoint}

{
    "account": "",
    "workspace": "",
    "appName": "",
    "config": {
        "myCustomField": "user-defined-value"
    },
    "packages" : [
        {
            "orderId": "",
            "invoiceNumber": "",
            "trackingNumber": ""
        }
    ]
}
```

#### What my app has to return? 

```
[
    {
        "package": {
            "orderId": "RECEIVED-ORDER-ID",
            "invoiceNumber": "RECEIVED-INVOICE-NUMBER",
            "trackingNumber": "RECEIVED-TRACKING-NUMBER"
        },
        "trackingHistory": {
            "delivered": false | true,
            "returned": false | true,
            "stopTracking": false | true,
            "events": [
                {
                    "city": "City",
                    "state": "State",
                    "description": "Event Description",
                    "date": "2019-01-01T14:34:30.313Z"
                }
            ]
        }
    }
]
```
