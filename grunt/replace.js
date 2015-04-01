// Empties folders to start fresh
module.exports = {
    coverage: {
        src: ['out/src/**/*.js'],        // source files array (supports minimatch)
        overwrite: true,                 // overwrite matched source files
        replacements: [
            {
                // })(MechanicalThings || (MechanicalThings = {}));
                from: /^(\s*)}\)\((\w+) \|\| \(\2 = \{\}\)\);$/gm,
                to: '})($2 || /* istanbul ignore next */ ($2 = {}));'
            },
            {
                // })(MechanicalThings = Example.MechanicalThings || (Example.MechanicalThings = {}));
                from: /^(\s*)}\)\((\w+) = (\w+\.\2) \|\| \(\3 = \{\}\)\);$/gm,
                to: '})($2 = $3 || /* istanbul ignore next */ ($3 = {}));'
            }
        ]
    }
};