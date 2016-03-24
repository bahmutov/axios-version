# axios-version

> Validating service version from response headers for axios

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![js-standard-style][standard-image]][standard-url]

## Install

    npm install -S axios-version

## Use

Imagine that a server returns its name and version in response headers, for example using
[koa-version-header](https://github.com/bahmutov/koa-version-header). This package allows
you to validate that the server is running the version we expect and trust.

Set the allowed service versions in `package.json`, for example in this package for the demo
I use the following

```json
{
  "config": {
    "services": {
      "demo-server": "1.2.*"
    }
  }
}
```

I recommend preloading this package when running your module. For example, if you typically
run `node index.js` you should run like this instead

    node -r axios-version index.js

If you want to debug the interceptors and the version login, run with environment variable

    DEBUG=ver node -r axios-version index.js

## Demo

Start demo server in one tab

```sh
$ node demo/server.js
```

Run client from another tab

```sh
$ npm run demo-client

> axios-version@0.0.0-semantic-release demo-client /git/axios-version
> DEBUG=ver NODE_PATH=.. node -r axios-version demo/client.js

  ver installed axios interceptor for +0ms [ 'demo-server' ]
  ver validating response from +53ms http://localhost:3000
  ver got response from demo-server@1.2.0 +2ms
  ver demo-server@1.2.0 satisfies 1.2.*? true +3ms
service demo-server@1.2.0 says ok
```

The server `demo-server@1.2.0` is allowed in the response. Now change the `package.json` file
and require `demo-server@1.3.0` for example

```json
{
  "config": {
    "services": {
      "demo-server": "1.3.*"
    }
  }
}
```

```sh
$ npm run demo-client

> axios-version@0.0.0-semantic-release demo-client /git/axios-version
> DEBUG=ver NODE_PATH=.. node -r axios-version demo/client.js

  ver installed axios interceptor for +0ms [ 'demo-server' ]
  ver validating response from +46ms http://localhost:3000
  ver got response from demo-server@1.2.0 +1ms
  ver demo-server@1.2.0 satisfies 1.3.0? false +3ms
[Error: Service version mismatch]
```

The response no longer works because the run time service has "wrong" version that we do not
trust yet.

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2016


* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog)


License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/axios-version/issues) on Github

## MIT License

Copyright (c) 2016 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/axios-version.png?downloads=true
[npm-url]: https://npmjs.org/package/axios-version
[ci-image]: https://travis-ci.org/bahmutov/axios-version.png?branch=master
[ci-url]: https://travis-ci.org/bahmutov/axios-version
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
