
const attachDefaultConfig = (test: unknown) => Object.assign(test, {
    parserOptions: {
        ecmaVersion: 2021,
    },
});

export default attachDefaultConfig;