
# api-flowtype-boilerplate

API boilerplate with [Flowtype](https://flowtype.org).

Boilerplate to build a simple API based on Node.js that use
Flowtype as static type analyser.

## Features

* Flowtype support
* Babel setup for ES7/Flowtype to target Node 5.0 in `--harmony`
* Simple MongoDB integration without ORM
* Request resolution with aggregated errors
* Async/await functions

## Installation

1. Clone this repo using `git clone https://github.com:njakob/api-flowtype-boilerplate.git`
1. Run `npm install` to install dependencies
1. Run `npm run flow` to check types with Flowtype
1. Run `npm run babel` to watch for changes within
the sources
1. Run `npm start` to interact with the example

More information about Flowtype can be found in the [official
documentation](https://flowtype.org/docs/getting-started.html).

```sh
$ curl -X GET http://localhost:3000/api/v1/users
```

```sh
$ curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{ "name": "John", "email": "john@example.org", "personal_url": "john.example.org" }' \
  http://localhost:3000/api/v1/users
```

## Known Issues

* Extra fields in the Koa context must be added to the
`koa$Context$Impl` in [`interfaces/koa.flow.js`](interfaces/koa.flow.js)
since Flowtype declaration cannot be extended [facebook/flow#396](https://github.com/facebook/flow/issues/396).

## Licences

[MIT](LICENSE)