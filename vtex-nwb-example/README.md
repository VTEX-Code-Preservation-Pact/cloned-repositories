# vtex-nwb-example

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

## Create your own nwb component and extend it with:

```sh
  nwb new react-component my-nwb-component
```
(press enter for all questions)

```sh
cd my-nwb-component
```
(enter your new project folder)

```sh
  git remote add other git@github.com:vtex/vtex-nwb-example.git &&\
  git fetch other &&\
  git cherry-pick c61a004 &&\
  git remote remove other
```
(copy patch for extra VTEX contexts)

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
