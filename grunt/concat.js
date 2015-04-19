// Empties folders to start fresh
module.exports = {
    options: {
        separator: '\n;\n',
        sourceMap: true,
        sourceMapStyle: 'inline'
    },
    test: {
        src: [
            'out/src/**/*.js',
            '!out/src/exercise4/run.js',
            'out/test/index.js',
            'out/test/**/*.js'
        ],
        dest: 'out/test.js'
    },
    build: {
        src: [
            'out/src/**/*.js',
            // exclude it first, then re-include it
            '!out/src/exercise4/run.js',
            'out/src/exercise4/run.js'
        ],
        dest: 'out/build.js'
    },
    coverage: {
        src: [
            'out/instrument/**/*.js',
            '!out/instrument/out/src/exercise4/run.js',
            'out/test/**/*.js'
        ],
        dest: 'out/coverage.js'
    }
};