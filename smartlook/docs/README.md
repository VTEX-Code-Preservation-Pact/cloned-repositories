# Smartlook

Open the VTEX APP Store and install the app on your store.

or

Run the following command:

```sh
vtex install vtex.smartlook@0.x
```

Next, open the app settings on your admin and fill the form with Site ID.

### Setup in Cart and Checkout page

Open your admin in the Checkout section in the `checkout6-custom.js`:

https://ACCOUNT.myvtex.com/admin/portal/#/sites/default/code/files/checkout6-custom.js

Add the following snippet in the file and replace `"YOURSITEID"` with your Site ID:

```js
// Smartlook
window.smartlook||(function(d) {
    var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
    var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
    c.charset='utf-8';c.src='https://rec.smartlook.com/recorder.js';h.appendChild(c);
    })(document);
    smartlook('init', 'YOURSITEID');
```

Click Save.
