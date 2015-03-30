// Empties folders to start fresh
module.exports = {
    coverage: {
        src: ['out/src/**/*.js'],             // source files array (supports minimatch)
        overwrite: true,                 // overwrite matched source files
        replacements: [{
            // })(MechanicalThings || (MechanicalThings = {}));
            from: /}\)\((\w+) \|\| \(\1 = \{\}\)\);/g,
            to: '})($1 || /* istanbul ignore next */ ($1 = {}));'
        }]
    }
};