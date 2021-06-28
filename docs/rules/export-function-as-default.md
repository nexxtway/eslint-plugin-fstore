# export-function-as-default

This rule is mainly applied to the `main.js` entrypoint of every cloud function to verify the implementation exports by default a function.

The following is considered valid:

```js
const foo = () => {
    // cloud function implementation
};

module.exports = foo;
```

```js
function foo () {
    // cloud function implementation
};

module.exports = foo;
```

```js
module.exports = () => {
    // cloud function implementation
};
```

```js
module.exports = function () {
    // cloud function implementation
};
```

...and the following cases are reported:

```js
module.exports = {} // whatever is not a function
```


```js
exports.foo = () => {
    // cloud function implementation
}
```

```js
exports.foo = function () {
    // cloud function implementation
}
```