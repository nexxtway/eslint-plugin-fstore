import { Rule } from 'eslint';
import get from 'lodash/get';

const rule: Rule.RuleModule = {
    meta: {
        type: 'problem',
        docs: {
            description: 'The main.js entrypoint must export a function as default.',
        }
    },
    create: (context: Rule.RuleContext) => {
        let foundExport: Boolean = false;
        let alreadyReported: Boolean = false;
        return {
            'Program:exit'(node: Rule.Node) {
                if (!foundExport && !alreadyReported) {
                    context.report({
                        node,
                        message: 'It must exports a function as default.',
                    });
                }
            },
            ExpressionStatement(node) {
                if (node.parent.type === 'Program' && node.expression.type === 'AssignmentExpression') {
                    const { left, right } = node.expression;
                    const isModuleExports = left.type === 'MemberExpression' 
                        && left.object.type === 'Identifier' 
                        && left.object.name === 'module'
                        && left.property.type === 'Identifier'
                        && left.property.name === 'exports';
                    if (isModuleExports) {
                        const isRightAFunction = right.type === 'FunctionExpression' 
                            || right.type === 'ArrowFunctionExpression';
                        if (isRightAFunction) {
                            foundExport = true;
                            return;
                        } else {
                            const scope = context.getScope();
                            const variableExists = (name: string) => scope.variables.find(variable => variable.name ===  name);
                            if (right.type === 'Identifier' && variableExists(right.name)) {
                                const variable = variableExists(right.name);
                                const isVariableArrowFunction = variable?.references[0].writeExpr?.type === 'ArrowFunctionExpression';
                                const isVariableFunctionExpression = variable?.references[0].writeExpr?.type === 'FunctionExpression';
                                const isVariableFunctionDeclaration = variable?.references[0].from.set.get(variable.name)?.defs[0].type === 'FunctionName';
                                const wasImported = get(variable, 'identifiers[0].parent.init.callee.name') === 'require';
                                if (isVariableArrowFunction || isVariableFunctionExpression || isVariableFunctionDeclaration || wasImported) {
                                    foundExport = true;
                                    return;
                                }
                            }
                            if (right.type === 'CallExpression') {
                                foundExport = true;
                                return;
                            }
                            context.report({
                                node: node.parent,
                                message: 'It must exports a function as default.',
                            });
                            alreadyReported = true;
                        }
                   }
                }
            }    
        }
    }
};

export default rule;