# Orders Tracking Example

A boilerplate app implementing an event handler receiving invoice/tracking notifications from OMS.

## How to Use

This app handles events sent by the app `vtex.sno`, as you can see by looking at `node/service.json`.

```json
{
  "memory": 256,
  "ttl": 10,
  "timeout": 2,
  "minReplicas": 2,
  "maxReplicas": 4,
  "workers": 1,
  "events": {
    "snoHandler": {
      "sender": "vtex.sno",
      "topics": ["invoice-notification"]
    }
  }
}
```

Normally `vtex.sno` sends events only in `master` workspace. If you want to use it in a developer workspace, you have to do the following:

1. Create your development workspace by running `vtex use {workspaceName}`
2. Go to `https://{accountName}.myvtex.com/admin/apps/vtex.sno/setup`
3. Change the `Target Workspace` variable to the name of the workspace you have created previously.
4. Now you can link this app (`vtex.sno`) in your desired workspace and receive order status updates.

Here is an example body that you can expect to receive:

```json
{
  "recorder": {
    "_record": {
      "x-vtex-meta": {},
      "x-vtex-meta-bucket": {}
    }
  },
  "invoiceNumber": "691",
  "trackingNumber": null,
  "trackingUrl": null,
  "invoiceKey": null,
  "courier": null,
  "orderId": "00-v70368842atmc-01",
  "type": "Output",
  "eventType": "InvoiceNotification",
  "eventId": "01ac8957-f5b1-48b8-b865-33811d154791_00-v70368842atmc-01_691_InvoiceNotification_0"
}```

If you want to understand further how invoices work, check out [this documentation](https://developers.vtex.com/reference/tracking#updatetrackingstatus).
