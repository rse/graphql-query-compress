/*
**  graphql-query-compress -- Compress a GraphQL Query String
**  Copyright (c) 2017-2019 Dr. Ralf S. Engelschall <rse@engelschall.com>
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
import Tokenizr from "tokenizr"

/*  the API function: compress a GraphQL query string  */
function compactGraphQLQuery (query) {
    const lexer = new Tokenizr()

    /*  configure lexical analysis  */
    lexer.rule(/#[^\r\n]*(?=\r?\n)/,                       (ctx, match) => { ctx.accept("comment") })
    lexer.rule(/"(?:\\"|[^"])*"/,                          (ctx, match) => { ctx.accept("string") })
    lexer.rule(/$[a-zA-Z_][a-zA-Z0-9_]*/,                  (ctx, match) => { ctx.accept("var") })
    lexer.rule(/[a-zA-Z_][a-zA-Z0-9_]*/,                   (ctx, match) => { ctx.accept("id") })
    lexer.rule(/[+-]?[0-9]*\.?[0-9]+(?:[eE][+-]?[0-9]+)?/, (ctx, match) => { ctx.accept("number") })
    lexer.rule(/[ \t\r\n]+/,                               (ctx, match) => { ctx.accept("ws", " ") })
    lexer.rule(/[{}]/,                                     (ctx, match) => { ctx.accept("brace") })
    lexer.rule(/[[\]]/,                                    (ctx, match) => { ctx.accept("bracket") })
    lexer.rule(/[()]/,                                     (ctx, match) => { ctx.accept("parenthesis") })
    lexer.rule(/,/,                                        (ctx, match) => { ctx.accept("comma") })
    lexer.rule(/!/,                                        (ctx, match) => { ctx.accept("not") })
    lexer.rule(/\.\.\./,                                   (ctx, match) => { ctx.accept("ellipsis") })
    lexer.rule(/@/,                                        (ctx, match) => { ctx.accept("at") })
    lexer.rule(/:/,                                        (ctx, match) => { ctx.accept("colon") })
    lexer.rule(/./,                                        (ctx, match) => { ctx.accept("any") })
    lexer.input(query)
    lexer.debug(false)

    /*  fetch all parsed tokens  */
    const tokens = lexer.tokens()

    /*  remove whitespace tokens at harmless positions  */
    let output = ""
    const re = /^(?:brace|bracket|parenthesis|comma|colon)$/
    for (let i = 0; i < tokens.length; i++) {
        if (   tokens[i].type === "comment"
            || (   tokens[i].type === "ws"
                && (   (   i < tokens.length - 1
                        && tokens[i + 1].type.match(re))
                    || (    i > 0
                        && tokens[i - 1].type.match(re))))) {
            tokens.splice(i, 1)
            i--
        }
    }

    /*  assembly and return new query string  */
    tokens.forEach((token) => {
        output += token.value
    })
    return output
}

/*  export the API function  */
module.exports = compactGraphQLQuery

