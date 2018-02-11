const compress = require('../graphql-query-compress')

describe('Compress', () => {
    it('Should return compressed query', () => {
        const query = `{
            Accounts {
                id
                realname
                username
            }
        }`
        const result = compress(query)
        const expected = '{Accounts{id realname username}}';
        expect(result).toEqual(expected)
    })
})
