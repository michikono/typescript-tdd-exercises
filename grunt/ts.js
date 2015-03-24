module.exports = {
    default: {
        files: [
            {src: ['src/**/*.ts'], dest: 'out/src'},
            {src: ['test/**/*.ts'], dest: 'out/test'}
        ],
        options: {
            fast: 'never',
            module: 'commonjs',
            target: 'es5'
        }
    }
};