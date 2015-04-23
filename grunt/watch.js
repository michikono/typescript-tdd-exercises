// Watches files for changes and runs tasks based on the changed files
module.exports = {
    ts: {
        options: {
            interrupt: true,
            reload: true
        },
        files: [
            'src/**/*.ts',
            'test/**/*.ts'
        ],
        tasks: ['clean:ts', 'ts:default', 'concat:build', 'concat:test', 'concat:coverage', 'buildCoverage']
    }
};