module.exports = {
    test: {
        options: {
            reporter: 'spec',
            quiet: false // Optionally suppress output to standard out (defaults to false)
        },
        src: [
            'out/test.js'
        ]
    },
    coverage: {
        options: {
            quiet: false, // Optionally suppress output to standard out (defaults to false)
            clearRequireCache: true
        },
        src: [
            'out/coverage.js'
        ]
    }
};