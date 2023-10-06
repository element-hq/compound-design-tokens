# Icons

## Consuming icons

All icons are prepared for platform specific needs

### Web

Exposes a tintable SVG that can be loaded directly or used via a CSS custom property

### Android

Transforms the icon to a vector drawable asset

### iOS

Transforms the icon to an XCode Image Set

## Synchronising icons

- Create the icon and add it to the Figma icon library https://www.figma.com/file/gkNXqPoiJhEv2wt0EJpew4/Compound-Icons?type=design&mode=design&t=lYEYAWjnNUSGFhV4-11
- Use [SVG Export](https://www.figma.com/community/plugin/814345141907543603) on Figma. Making sure to use `currentColor` so the icon can be tintable
- Copy the icons to the `icons/` folder
- Run `yarn build` at the root of the project or ask a maintainer to do this for you
- Open a pull request against the `develop` branch
