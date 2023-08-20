📢 Use this project, [contribute](https://github.com/vtex-apps/cookie-script) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Cookie Script

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

[Cookie Script](https://cookie-script.com/) app brings the [solution](https://apps.vtex.com/vtex-cookie-script/p) to make your website cookies comply with GDPR and CCPA.

![image](https://user-images.githubusercontent.com/284515/86488877-d35b0f80-bd38-11ea-95f9-7610985e19d5.png)

Learn how to install and configure the app on the following sections.


## Installing Cookie Script app

It is possible to install the Cookie Script in your store either by using [App Store](https://apps.vtex.com/vtex-cookie-script/p) or the [VTEX IO CLI](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-vtex-io-cli-installation-and-command-reference).


  ### Using VTEX App Store
 
  
1. Access the **Apps** section in your account's admin page and look for the Cookie Script box;
2. Then, click on the **Install** button;
3. You'll see a warning message about needing to enter the necessary configurations. Scroll down and type in your **Cookie Script ID**.
4. Click on **Save**.

### Using VTEX IO Toolbelt
 

1. In your terminal, [install](https://vtex.io/docs/recipes/development/installing-an-app/) the `vtex.cookie-script@0.x` app. 
3. To confirm that the app has now been installed, run in your terminal `vtex ls` and check the installed apps' list. 
4. Access the **Apps** section in your account's admin page and look for the Cookie Script box. Once you find it, click on it.
5. Fill in the **Cookie Script ID** field.
6. Click on **Save**.



After installing the app, you must create an account in [Cookie Script](https://cookie-script.com/create-an-account.html) to make the app work on your store. Follow the steps on the [Cookie Script Configuration](#cookie-script-configuration) section to create an account and configure the app.

## Cookie Script Configuration
Once you have installed the app, you need to create an account in [Cookie Script](https://cookie-script.com/create-an-account.html) to be able to configure the app.

>⚠️ *You must follow the steps described in this section to guarantee the cookies will work. Otherwise, they will break the purchases flow from your store.*

1. Go to the [Cookie Script](https://cookie-script.com/create-an-account.html) page and create your account.
2. After creating your account, go to the **Dashboard** tab and click on `Add website`.

![app-dashboard](https://user-images.githubusercontent.com/67270558/133613562-3248fadc-e6a0-4859-8b05-5167085e4242.gif)

3. Once you have added your website, go to the **Cookie scanner** tab and run a scan. 
2. After the scan is complete, go to **Cookies** tab and make sure the following cookies are categorized as **Stricly Necessary**: `ASPXAUTH`, `checkout.vtex.com`, `CookieConsent`, `device`, `vtex_segment`, `vtex_session`, `VtexFingerPrint`, `VtexRCMacIdv7`, `VtexRCRequestCounter`, `VtexRCSessionIdv7` and `VtexWorkspace`.


<!-- DOCS-IGNORE:start -->
## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!
<!-- DOCS-IGNORE:end -->
