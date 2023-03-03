# Icons

## Consuming icons

All icons are prepared for platform specific needs

### Web

Exposes a tintable SVG that can be loaded directly or used via a CSS custom property

### Android

Transforms the icon to a vector drawable asset

### iOS

Transforms the icon to an XCode Image Set

## Contributing a new icon

- Create an icon and fit it in a 32x32 view box and adjust its size to have optical coherency in the entire icon set
- Use [SVG Export](https://www.figma.com/community/plugin/814345141907543603) on Figma. Making sure to use `currentColor` so the icon can be tintable
- Copy the icon to the `icons/` folder
- Run `yarn build` at the root of the project or ask a maintainer to do this for you
- Open a pull request against the `develop` branch
