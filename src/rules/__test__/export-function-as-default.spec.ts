import { RuleTester } from 'eslint';
import rule from '../export-function-as-default';
import attachDefaultConfig from './attachDefaultConfig';

const ruleTester = new RuleTester();


describe('export-function-as-default rule', () => {
    ruleTester.run('export-function-as-default', rule, {
        valid: [].concat([
            { code: 'module.exports = function () {};' },
            { code: 'module.exports = () => {};',  },
            { code: 'const foo = () => {}; module.exports = foo;'},
            { code: 'function foo () {}; module.exports = foo;'},
            { code: `const foo = require('foo'); module.exports = foo;` },
            { code: `const foo = require('foo'); module.exports = foo({ name: 'bar' });` },
            { code: `module.exports = foo({ name: 'bar' });` },
            { code: `module.exports = composeMiddlewares(isAuth())(createStripeSetupIntent);` },
        ].map(attachDefaultConfig)),
        invalid: [].concat([
            { code: 'module.exports = 5;', errors: ['It must exports a function as default.'] },
            { code: `module.exports =  'foo';`, errors: ['It must exports a function as default.'] },
            { code: 'const foo = () => {};', errors: ['It must exports a function as default.'] },
            { code: 'exports.foo = function foo() {};', errors: ['It must exports a function as default.'] },
            { code: 'exports.foo = () => {};', errors: ['It must exports a function as default.'] },
        ].map(attachDefaultConfig)),
    })
});