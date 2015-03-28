// Watches files for changes and runs tasks based on the changed files
module.exports = {
    ts: {
        files: [
            'src/**/*.ts',
            'test/**/*.ts'
        ],
        tasks: ['clean:ts', 'ts:default', 'concat:test']
    },
    test: {
        files: [
            'out/**/test.js'
        ],
        tasks: ['mochaTest:test', 'buildCoverage', 'coverage']
    }
};