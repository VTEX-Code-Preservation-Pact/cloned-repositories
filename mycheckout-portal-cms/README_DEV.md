## Development

Download the base code from the following link.
https://git-codecommit.us-east-1.amazonaws.com/v1/repos/checkoutless-portal-cms

In the root folder install the npm dependencies and then run the project with the following commands.

```tsx
npm install
npm run build
```

The project uses Webpack, therefore while the project is running, it will listen to all the changes that are made on the implementation of the code and will generate the dist/bundle.js file each time it saves its changes. This generated file must have it in a public URL so that the HTLM site where you are using it can access its updated content through a Script tag.

```tsx
<script src={url} type="text/javascript"></script>
```

If you want to optimize the loading time of the bundle.js file on a server in the cloud, you can use tools such as Requestly that allows you to redirect the call of the file in the cloud, to a local server that you can create yourself and have your file there.

### Checkout

In the JS file of the Checkout, add the URL of the Script.

```tsx
$(document).ready(function () {
  const script = document.createElement('script')

  script.src =
    'https://mycheckout-portal-cms.s3.us-east-2.amazonaws.com/bundle.js'
  script.type = 'text/javascript'
  script.async = false

  document.body.appendChild(script)
})
```

Add a div element with the kuikpay class in the DOM element where you want the Kuikpay button to be displayed.

```tsx
...
var newDiv = document.createElement("div");
newDiv.setAttribute("id", "kuikpay");

var currentDiv = document.getElementsByClassName("summary-template-holder")[0];
currentDiv.parentNode.insertBefore(newDiv, currentDiv);
...
```
