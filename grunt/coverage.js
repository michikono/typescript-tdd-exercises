module.exports = {
    default: {
        options: {
            thresholds: {
                statements: 95,
                branches: 95,
                lines: 95,
                functions: 95
            },
            dir: 'coverage/reports',
            root: '.'
        }
    }
};