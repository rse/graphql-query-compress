
GraphQL-Query-Compress
======================

Compress a GraphQL Query String

<p/>
<img src="https://nodei.co/npm/graphql-query-compress.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/graphql-query-compress.png" alt=""/>

About
-----

This is small utility function for compressing a
[GraphQL](http://graphql.org/) query string by removing unnecessary
whitespace characters and comments. It is intended to be used for
compressing a query before it is sent over the network.

Installation
------------

```shell
$ npm install graphql-query-compress
```

Usage
-----

```js
import compress from "graphql-query-compress"

let query = `{
    Accounts {
        id
        realname
        username
    }
}`

query = compress(query)

console.log(query)
```

License
-------

Copyright &copy; 2017-2019 Dr. Ralf S. Engelschall (http://engelschall.com/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

