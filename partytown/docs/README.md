📢 Use this project, [contribute](https://github.com/vtex-apps/CHANGEME) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Partytown

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

Partytown is app to manage your third party scripts.

> ℹ️ **Partytown is currently in closed beta**. Which means it's still not a final version and may have flaws. We recommend always testing all scripts while implementing this guide.

> ℹ️  If you are using `experimentalLazyLoad` we recommend to disable it for `vtex.partytown` and any other pixel you want to run in partytown.

## Usage
### Installing partytown

Install the `vtex.partytown` on your new workspace by running `vtex install vtex.partytown@0.x`

### Migrating your pixel app to the partytown format

1. Open the `pixel/head.html` file

2. Add the `type="text/partytown"` attribute to each individual `<script>` tag
```diff
- <script>...</script>
+ <script type="text/partytown">...</script>
```

3. (Optional) If you want to access some global variables added to the `window` by the pixel apps, you need to declare it. Go to the `https://{{myworkspace}}--{{myaccount}}.myvtex.com/admin/apps` URL, select the `partytown` app and then add the name of the variables you want to access in the `Forward` field.

![image](https://user-images.githubusercontent.com/40380674/169821502-4148db94-4a1a-493f-95ee-aaf5e243ebec.png)


## Known Issues

### Uncaught TypeError: Cannot convert undefined or null to object

```
Uncaught TypeError: Cannot convert undefined or null to object
    at Function.getPrototypeOf (<anonymous>)
    at readOwnImplementation (partytown-sandbox-sw.js?v=0.7.4:492:38)
    at partytown-sandbox-sw.js?v=0.7.4:478:75
    at Array.map (<anonymous>)
    at readImplementations (partytown-sandbox-sw.js?v=0.7.4:478:19)
    at readMainPlatform (partytown-sandbox-sw.js?v=0.7.4:450:27)
    at partytown-sandbox-sw.js?v=0.7.4:542:56
    at worker.onmessage (partytown-sandbox-sw.js?v=0.7.4:552:69)
```

VTEX uses the [history npm lib](https://www.npmjs.com/package/history). Partytown doesn't have support for this lib, that's why this error is thrown.
Even with this error, partytown will work correctly as long as your script does not use the History API.

## Debug
To make sure that partytown is able to run scripts, install partytown in a development workspace and observe if the following message is printed in the browser console. 


```
Partytown was able to run this script. If you are having problems running your script, it is possible that there is a compatibility issue between your script and partytown.
```

## Development

Modify the `src/head.html` file and run the `yar run build` command.

<!-- TODO: Documentation -->
