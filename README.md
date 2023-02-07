<p align="center"><img src="https://element.io/images/logo-ele-secondary.svg" width="300" /></p>

# Compound design tokens

[![](https://img.shields.io/github/license/vector-im/compound)](https://github.com/vector-im/compound/blob/main/LICENSE)

Home to the design tokens.

## Supported platforms

Design tokens support light and dark themes, as well as a mode with higher contrast.
Tokens are exported to three platforms

- Web
  - CSS properties
  - JavaScript
- iOS
  - Swift
- Android
  - Kotlin

## Development

The tokens are defined under the `tokens/` folder and follow the [tokens.studio specification](https://docs.tokens.studio/tokens/json-schema).
They are then transformed to the supported platforms using [Style Dictionary](https://amzn.github.io/style-dictionary/).

All consumable tokens are generated under `assets/`. Generate them by running

```
yarn build
```

## Synchronise tokens with tokens.studio

Prequisite

- [Read tokens.studio documentation about GitHub sync](https://docs.tokens.studio/sync/github)
- [Create a personal access token on GitHub](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

| Property     | Value                                |
| ------------ | ------------------------------------ |
| Name         | Compound design tokens               |
| Access token | [Creating a personal access token]() |
| Repository   | vector-im/compound-design-tokens     |
| Branch       | main                                 |
| File path    | tokens/                              |
| baseUrl      | N/A                                  |
