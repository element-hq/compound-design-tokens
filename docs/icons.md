# Icons

## Consuming icons

All icons are prepared for platform specific needs

### Web

Exposes a tintable SVG that can be loaded directly or used via a CSS custom property

### Android

Transforms the icon to a vector drawable asset

### iOS

Transforms the icon to an Xcode Image Set

## Synchronising icons

- Create the icon and add it to the [Figma icon library](https://www.figma.com/file/gkNXqPoiJhEv2wt0EJpew4/Compound-Icons?type=design&mode=design&t=lYEYAWjnNUSGFhV4-11). Refer to [the guidelines for icon preparation](https://www.figma.com/file/gkNXqPoiJhEv2wt0EJpew4/Compound-Icons?type=design&node-id=280-6047&mode=design&t=wOCsc1FBoOz4YnJo-0).
- Export the icons from Figma
    - We currently export the 24x24 icon variants only (optical scaling is yet to be adopted). The process is manual but fast to do.
    - First select all of the 24pt variants from the document above. This easiest way to do this is to search for `24` and select all the results except for the placeholder ones.
    - Copy & paste these (or Option/Alt drag) to a safe working area, leaving the originals alone.
    - Using the [SVG Export](https://www.figma.com/community/plugin/814345141907543603) plugin on Figma, apply the `Monochrome` preset to the selected icons. This preset exports using `currentColor` so the icon can be tintable.
    - Download the icons zip file and extract it locally.
- Tidy up the file names: lower case and replace spaces with hyphens
    **bash/zsh**
    ```bash
    for file in *; do mv -v -- "$file" "$(echo "$file" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')"; done
    ```
    **fish**
    ```
    for file in *; mv -v -- "$file" (echo "$file" | tr ' ' '-' | tr '[:upper:]' '[:lower:]'); end
    ```
- Copy the icons to the `icons/` folder
- Run `yarn build` at the root of the project or ask a maintainer to do this for you
- Open a pull request against the `develop` branch

## Requesting an icon
- Create an icon request in [vector-im/compound](https://github.com/vector-im/compound/issues/new/choose)

## Removing or changing icons

Removing an icon is a breaking change, and should be reflected in the changelog and a major change in package version.

Renaming an icon is functionally the same as deleting an icon and adding another. This should be marked as a breaking
change. The changelog should include migration instructions.

Visual changes to icons are considered a backwards compatible change (semver [patch](https://semver.org/)).
