---
title: "Implementing orderForm Sync"
sidebar_label: "Implementing orderForm Sync"
---

The `orderForm` Sync feature maintains the user's session and order information across different pages, such as My Account and Checkout, in the FastStore environment. 

Pages like My Account, Login, and Checkout are in the Legacy Portal (vtexcommercestable) by default. Since FastStore is the main domain and pages in the Legacy Portal are subdomains, the user's session cookies for these domains must be synchronized to maintain a seamless shopping experience without losing progress or data.

This synchronization is achieved by duplicating the session cookie for the main domain (FastStore) whenever the user navigates to the Portal (secure.{domain}), and a service is called to update the order information associated with that session. This ensures that the user's order data is synchronized across different pages.

:::caution 

This feature only works in the production environment, where the store is on the main domain, and the checkout is on the subdomain. If you want to test this feature in other scenarios, please refer to the [Creating Session Cookie in FastStore Store for Localhost or Internal URLs](#creating-session-cookie-in-faststore-store-for-localhost-or-internal-urls) section after completing all the necessary configuration steps.

:::

## Before you start

Before proceeding with the implementation, ensure that you have the following:

- Ensure that you have `@faststore/api`  package version 1.12.38 or later installed in `package.json` file of your FastStore starter code.

- Ensure that the `vtex.admin-faststore` app is installed on your account. The app is responsible for replicating session cookies and changing the `orderForm` of the session. If it's not installed, use the following command to install it:
```bash
vtex install vtex.admin-faststore@0.x

```
:::info

This app includes a pixel app on IO pages that calls a service to replicate the cookie and change the `orderForm` of the session when it receives a parameter in the URL.

:::

---

## Step by step

### Step 1: Add a script to the Checkout

Add the function below to the `checkout6-custom.js` file in the Admin Checkout to replicate the session cookies at the cart and call the endpoint of the service responsible for this replication:

1. In the VTEX Admin, access **Store Settings > STOREFRONT > Checkout**.
2. In **Checkout**, click on `Edit` in the **Default** Website.
3. Navigate to the tab **Code** and in **Files**, click on `checkout6-custom.js` and add the following function:

    ```js
        function callUrlWithRetry(url, maxRetries, retryInterval) {
        return fetch(url,{
            method: 'POST',
        })
            .then(response => {
            if (response.ok) {
                return 
            } else {
                throw new Error(`Without vtex_session cookie`);
            }
            })
            .catch(error => {
            if (maxRetries > 0) {
                return new Promise(resolve => {
                setTimeout(() => {
                    resolve(callUrlWithRetry(url, maxRetries - 1, retryInterval));
                }, retryInterval);
                });
            } else {
                throw error;
            }
            });
        }

        callUrlWithRetry(`/api/io/faststore/cookie`, 3, 500)
    ```
4. Click on `Save`.

:::caution 

It is important to perform a retry as the session cookie may not be immediately available in the request even after the script has run.

:::

### Step 2: Update the FastStore Starter
To send the `orderFormId` parameter, you must perform changes in the FastStore starter code. Navigate to following files:

#### `src/components/ui/Button/ButtonSignIn/ButtonSignIn.tsx`

Responsible for rendering the `Sign In` button on the Checkout page and provides the current cart information. Add the `orderFormId` parameter to allow subsequent pages to reference the order information associated with the cart for tracking and processing purposes:

```tsx
        import styles from 'src/components/ui/Button/button.module.scss'
        import Icon from 'src/components/ui/Icon'
        import { useSession } from 'src/sdk/session'
        import { useCart } from '../../../../sdk/cart/index'

        const ButtonSignIn = () => {
        const { id } = useCart()
        const { person } = useSession()

        return (
            <LinkButton
            data-fs-button-signin-link
            href={
                person?.id ? `/account?orderFormId=${id}` : `/login?orderFormId=${id}`
            }
            className={`${styles.fsButton} text__title-mini`}
            variant="tertiary"
            icon={<Icon name="User" width={18} height={18} weight="bold" />}
```
#### `src/pages/account.tsx` 
Responsible for rendering the My Account page. Add the following to allow subsequent pages to reference the user’s session cookie on this page:

```tsx
        function Page() {
            useEffect(() => {
              window.location.href = `${storeConfig.accountUrl}${window.location.search}`
            }, [])

            return (
```

#### `src/pages/login.tsx` 
Responsible for rendering the Login page. Add the following to allow subsequent pages to reference the user’s session cookie on this page:

```tsx
        function Page() {
        useEffect(() => {
            window.location.href = +`${storeConfig.loginUrl}${window.location.search}`
        }, [])

        return (
```
### Step 3: Update other portal environments (Optional)
If your store uses other environments on the Portal that do not have the `/api/io` route in the url, you must also pass the `orderForm` parameter to these pages when the user navigates from the store in FastStore to these links and add this script at those pages:

```js
        <script>
            let params = new URLSearchParams(document.location.search);
            let orderId = params.get("orderFormId");
        
            function callUrlWithRetry(url, maxRetries, retryInterval) {
            return fetch(url, {
                method: "POST",
            })
                .then((response) => {
                if (response.ok) {
                    return;
                } else {
                    throw new Error(`Without vtex_session cookie`);
                }
                })
                .catch((error) => {
                if (maxRetries > 0) {
                    return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(callUrlWithRetry(url, maxRetries - 1, retryInterval));
                    }, retryInterval);
                    });
                } else {
                    throw error;
                }
                });
            }
        
            callUrlWithRetry(`/api/io/faststore/cookie`, 3, 5000);
            if (orderId) {
            callUrlWithRetry(
                `/api/checkout/pub/orderForm/${orderId}?refreshOutdatedData=true`,
                3,
                5000
            );
            }
        </script>
```
## Creating Session Cookie in FastStore for Localhost or Internal URLs
The service app generates the session cookie on the main domain. However, if the store is using localhost or an internal URL at the checkout, it is necessary to create the cookie manually in the FastStore store. To do so, navigate to the checkout URL and copy the cookie value. For example:

![session-cookie-example](https://user-images.githubusercontent.com/67270558/232832503-e1426219-caa2-487d-a220-1c26a8226bbf.png)

Go back to the FastStore store, open your browser's Developer Console and run the following command to generate the cookie that will be used to sync the `orderForm`:

```javascript
        document.cookie = "vtex_session={{value of session cookie}}";
```
After that, you should see the cookie created and the `orderForm` synced.

