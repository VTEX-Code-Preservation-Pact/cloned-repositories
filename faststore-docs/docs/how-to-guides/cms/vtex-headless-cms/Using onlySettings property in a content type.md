# Using the onlySettings property in a content type

The `onlySetting` property indicates that a [content type](https://www.faststore.dev/tutorials/cms-storecomponents/0#content-types) is meant for settings only.

You can use this attribute for content types that do not require storefront content, such as SEO pages.

| Image 1  | Image 2  |  
|---|---|
| ![with-property](https://user-images.githubusercontent.com/67270558/227936062-02e15860-c6d6-4525-9eed-19c37abfd626.png)  | ![without-property](https://user-images.githubusercontent.com/67270558/227936232-fa8dfab7-2f01-42d1-9f68-b2ab8623a3af.png)  | 
| Image 1 - Content type with `onlySettings` and with one tab for settings: **SEO**. | Image 2 - Content type without `onlySettings` and with two tabs: **Sections** and **SEO**. | 

This property ensures the content type page displays only the available settings without the **Sections** tab. Follow the steps below to use the `onlySettings` property for your desired content type.

## Step-by-step 
1. Go to the store repository and access  `CMS` > `content-types.json`.
2. Choose a content type and set the `onlySettings` property as `true`. For example:

```json
    {
        "id": "SEO",
        "name": "Global SEO Settings",
        "onlySettings": true,
        "configurationSchemaSets": [
            {
                "name": "SEO",
                "configurations": [
                    ...
                ]
            }
        ]
    }
```

3. Sync your changes in the `CMS` folder by running the following command:

```bash
vtex cms sync
```

After syncing your changes, go to your store Admin and select **Storefront > Headless CMS**. Then, navigate to the content type to which the property was added and check if the only tab displayed is the settings tab.