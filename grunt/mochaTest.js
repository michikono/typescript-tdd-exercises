module.exports = {
    test: {
        options: {
            reporter: 'spec',
            quiet: false // Optionally suppress output to standard out (defaults to false)
            ,bail: false
        },
        src: [
            'out/test.js'
        ]
    },
    coverage: {
        options: {
            // alternate usable values: progress, spec, dot, nyan, landing
            reporter: 'landing',
            quiet: false, // Optionally suppress output to standard out (defaults to false)
            clearRequireCache: true,
            bail: false
        },
        src: [
            'out/coverage.js'
        ]
    }
};