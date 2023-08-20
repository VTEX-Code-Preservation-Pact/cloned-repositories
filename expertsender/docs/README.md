# ExpertSender

Open the VTEX APP Store and install the app on your store.

or

Run the following command:

```sh
vtex install vtex.expertsender@1.x
```

Next, open the app settings on your admin and fill the form with Click Domain, `aid`, and `wid`.

### Setup in Cart and Checkout page

Open your admin in the Checkout section in the `checkout6-custom.js`:

https://ACCOUNT.myvtex.com/admin/portal/#/sites/default/code/files/checkout6-custom.js

Add the following snippet in the file and replace `"YOUR-AID"`, `"YOUR-WID"`, and `"YOUR-CLICKDOMAIN"` with the proper values:

```js
// ExpertSender
(function () {
  window.adraker = {
    aid: "YOUR-AID",
    wid: "YOUR-WID",
    clickDomain: "YOUR-CLICKDOMAIN"
  };
  var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
  g.type = 'text/javascript'; g.async = true; g.defer = true;
  g.src = "//adraker-dev.azureedge.net/web.min.js?id=" + aid + "," + wid;
  s.parentNode.insertBefore(g, s);
})();
```

Click Save.
