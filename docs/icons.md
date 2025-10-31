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

Updates to [Compound Icons](https://github.com/element-hq/compound-design-tokens/actions/workflows/sync-icons.yaml) are automatically synced to GitHub once per week, on Wednesday. But if you want to sync the icons outside of this schedule:

- Go to the [sync icons workflow](https://github.com/element-hq/compound-design-tokens/actions/workflows/sync-icons.yaml) on GitHub.
- Click 'Run workflow'.
- A pull request will be created containing the latest icon changes.

## Requesting an icon
- Create an icon request in [element-hq/compound](https://github.com/element-hq/compound/issues/new/choose)

## Removing or changing icons

Removing an icon is a breaking change, and should be reflected in the changelog and a major change in package version.

Renaming an icon is functionally the same as deleting an icon and adding another. This should be marked as a breaking
change. The changelog should include migration instructions.

Visual changes to icons are considered a backwards compatible change (semver [patch](https://semver.org/)).
