<h1 align="center">
  Lever SDK for Typescript
</h1>
<h5 align="center">Collection of <i>ready-to-use</i> VTEX IO Clients to access Lever API</h5>

This exports **Clients**, and Typescript **typings** to help you connecting a VTEX IO application with Lever's API using Node.js

## Installing

```
yarn add @vtex/lever-sdk
```

## Client

Work in progress.

## API Reference

To discover and learn more about Lever APIs, read [Lever Documentation](https://hire.lever.co/developer/documentation).

## Contributing

Feel free to **add new methods** to our code.

## Releasing

We have a Github Action configured to **release the package on NPM for every Release tag** pushed into the repository. So, in order to have this project published:
1. Merge the Pull Request on the main branch, after having your changes approved.
2. Run `git checkout main && git pull` on your local repository.
3. Use the [releasy](https://www.npmjs.com/package/releasy) tool to push a new release (_e.g_: `releasy minor --stable`).
4. Check the result of the process on Github checking the status on the latest commit.
