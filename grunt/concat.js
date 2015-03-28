// Empties folders to start fresh
module.exports = {
    options: {
        separator: '\n;\n',
        sourceMap: true,
        sourceMapStyle: 'inline'
    },
    test: {
        src: ['out/src/**/*.js', 'out/test/**/*.js'],
        dest: 'out/test.js'
    },
    coverage: {
        src: ['out/instrument/**/*.js', 'out/test/**/*.js'],
        dest: 'out/coverage.js'
    }
};