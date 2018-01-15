/*
**  graphql-query-compress -- Compress a GraphQL Query String
**  Copyright (c) 2017-2018 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GraphQLQueryCompress = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

var _tokenizr = _dereq_("tokenizr");

var _tokenizr2 = _interopRequireDefault(_tokenizr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*  the API function: compress a GraphQL query string  */
function compactGraphQLQuery(query) {
    var lexer = new _tokenizr2.default();

    /*  configure lexical analysis  */
    lexer.rule(/#[^\r\n]*(?=\r?\n)/, function (ctx, match) {
        ctx.accept("comment");
    });
    lexer.rule(/"(?:\\"|[^\r\n]+)*"/, function (ctx, match) {
        ctx.accept("string");
    });
    lexer.rule(/$[a-zA-Z_][a-zA-Z0-9_]*/, function (ctx, match) {
        ctx.accept("var");
    });
    lexer.rule(/[a-zA-Z_][a-zA-Z0-9_]*/, function (ctx, match) {
        ctx.accept("id");
    });
    lexer.rule(/[+-]?[0-9]*\.?[0-9]+(?:[eE][+-]?[0-9]+)?/, function (ctx, match) {
        ctx.accept("number");
    });
    lexer.rule(/[ \t\r\n]+/, function (ctx, match) {
        ctx.accept("ws", " ");
    });
    lexer.rule(/[{}]/, function (ctx, match) {
        ctx.accept("brace");
    });
    lexer.rule(/[[\]]/, function (ctx, match) {
        ctx.accept("bracket");
    });
    lexer.rule(/[()]/, function (ctx, match) {
        ctx.accept("parenthesis");
    });
    lexer.rule(/,/, function (ctx, match) {
        ctx.accept("comma");
    });
    lexer.rule(/!/, function (ctx, match) {
        ctx.accept("not");
    });
    lexer.rule(/\.\.\./, function (ctx, match) {
        ctx.accept("ellipsis");
    });
    lexer.rule(/@/, function (ctx, match) {
        ctx.accept("at");
    });
    lexer.rule(/:/, function (ctx, match) {
        ctx.accept("colon");
    });
    lexer.rule(/./, function (ctx, match) {
        ctx.accept("any");
    });
    lexer.input(query);

    /*  fetch all parsed tokens  */
    var tokens = lexer.tokens();

    /*  remove whitespace tokens at harmless positions  */
    var output = "";
    var re = /^(?:brace|bracket|parenthesis|comma|colon)$/;
    for (var i = 0; i < tokens.length; i++) {
        if (tokens[i].type === "comment" || tokens[i].type === "ws" && (i < tokens.length - 1 && tokens[i + 1].type.match(re) || i > 0 && tokens[i - 1].type.match(re))) {
            tokens.splice(i, 1);
            i--;
        }
    }

    /*  assembly and return new query string  */
    tokens.forEach(function (token) {
        output += token.value;
    });
    return output;
}

/*  export the API function  */
/*
**  graphql-query-compress -- Compress a GraphQL Query String
**  Copyright (c) 2017-2018 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*  external dependency  */
module.exports = compactGraphQLQuery;

},{"tokenizr":"tokenizr"}]},{},[1])(1)
});