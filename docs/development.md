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

If you change the code, make sure it is formatted correctly and free of lint errors.
You can do this by running:

```
yarn run check --write
```

This will format your code and automatically apply any lint fixes that are considered 'safe', all at once.
There's also `yarn format` and `yarn lint` if you want to do them individually.
