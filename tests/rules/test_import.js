const rule = require('../../lib/rules/import');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();

ruleTester.run('import', rule, {
    valid: [
        'require()',
        'require(fn())',
        {
            code: 'import a from "Module"',
            parser: 'babel-eslint',
            options: ['Legacy'],
        },
        {
            code: 'const a = require("Module")',
            parser: 'babel-eslint',
            options: ['Legacy'],
        }
    ],
    invalid: [
        {
            code: 'import a from "Legacy"',
            parser: 'babel-eslint',
            options: ['Legacy'],
            errors: [{
                message: 'Module Legacy is deprecated.'
            }]
        },
        {
            code: 'import a from "Legacy"',
            parser: 'babel-eslint',
            options: [{ name: 'Legacy', use: 'New' }],
            errors: [{
                message: 'Module Legacy is deprecated. Use New instead'
            }]
        },
        {
            code: 'var a = require("Legacy")',
            options: ['Legacy'],
            errors: [{
                message: 'Module Legacy is deprecated.'
            }]
        },
        {
            code: 'var a = require("Legacy")',
            options: [{ name: 'Legacy', use: 'New' }],
            errors: [{
                message: 'Module Legacy is deprecated. Use New instead'
            }]
        },
    ]
});
