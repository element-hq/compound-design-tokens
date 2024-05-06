# 🤓 Development

The tokens are defined under the `tokens/` folder and follow the [tokens.studio specification](https://docs.tokens.studio/tokens/json-schema).
Normally, our designers will update this folder by [syncing it with Figma](https://compound.element.io/?path=/docs/design-get-started--docs).
But if you are maintaining a custom fork and wish to modify the tokens, you can also edit the JSON data in this folder directly.

The tokens are then transformed using [Style Dictionary](https://amzn.github.io/style-dictionary/) into formats which supported platforms can consume.
These generated files live in the `assets/` folder, and the code that generates them can be found in `src/`.
Generate them by running:

```
yarn build
```
