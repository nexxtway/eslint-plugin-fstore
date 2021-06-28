# eslint-plugin-fstore

This plugin intends to support linting of `fstore workspaces`

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-fstore`:

```
$ npm install eslint-plugin-fstore --save-dev
```


## Usage

Add `fstore` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "fstore"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "fstore/export-function-as-default": 2
    }
}
```

## Supported Rules

* export-function-as-default





