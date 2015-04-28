// Empties folders to start fresh
module.exports = {
    coverage: [
        'coverage/*'
    ],
    instrument: [
        'out/instrument/*'
    ],
    ts: [
        'out/instrument/*',
        'out/*.js*',
        'out/src/*',
        'out/test/*'
    ],
    build: [
        'out/build.js*'
    ],
    default: [
        'out/*'
    ]
};