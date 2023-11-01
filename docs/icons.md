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

- Create the icon and add it to the [Figma icon library](https://www.figma.com/file/gkNXqPoiJhEv2wt0EJpew4/Compound-Icons?type=design&mode=design&t=lYEYAWjnNUSGFhV4-11)
  . Refer to [the guidelines for icon preparation](https://www.figma.com/file/gkNXqPoiJhEv2wt0EJpew4/Compound-Icons?type=design&node-id=280-6047&mode=design&t=wOCsc1FBoOz4YnJo-0).
- Use [SVG Export](https://www.figma.com/community/plugin/814345141907543603) on Figma. Making sure to use `currentColor` so the icon can be tintable
- Copy the icons to the `icons/` folder
- Run `yarn build` at the root of the project or ask a maintainer to do this for you
- Open a pull request against the `develop` branch

## Removing or changing icons

Removing an icon is a breaking change, and should be reflected in the changelog and a major change in package version.

Renaming an icon is functionally the same as deleting an icon and adding another. This should be marked as a breaking
change. The changelog should include migration instructions.

Visual changes to icons are considered a backwards compatible change (semver [patch](https://semver.org/)).
