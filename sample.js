
const compress = require(".")
let query = `{
    Accounts {
        id
        realname
        username
    }
}`
query = compress(query)
console.log(query)

