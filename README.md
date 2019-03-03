[![NPM version](https://badge.fury.io/js/angular-spec-generator.svg)](http://badge.fury.io/js/angular-spec-generator)

# angular-spec-generator

> Angular spec generator, onec generate all spec file by sample cli.

## Description

Create All spec file by cli.

## Install
```npm install -g angular-spec-generator```

## Usage
```
angular-spec-generator 'C:\Users\Alan\Desktop\test'
```
choice directory which you want to generate spec, and then it will generate all Angular spec.

> only generate file when spec file not exit, and the component / directive / guard / pipe / service follow the angular-cli file generate name.

## Configuration

You can set type to configuration which types you want to generate.
### Type

```--type=guard,component,service ```

|type|alias|
|---|---|
|guard|`g` or `guard`|
|component|`c` or `component`|
|service|`s` or `service`|
|directive|`d` or `directive`|
|pipe|`p` or `pipe`|

### Force

It will force replace exist spec files

```--force ```

### Clear

It will clear select spec with type

```--clear```
