// Empties folders to start fresh
module.exports = {
    coverage: [
        'out/instrument/*',
        'coverage/*'
    ],
    ts: [
        'out/*.js*',
        'out/src/*',
        'out/test/*'
    ],
    default: [
        'out/*',
        'coverage/*'
    ]
};