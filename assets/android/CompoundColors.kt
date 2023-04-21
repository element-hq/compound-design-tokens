//
// Copyright 2020 Target Corporation. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License").
// You may not use this file except in compliance with the License.
// A copy of the License is located at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// or in the "license" file accompanying this file. This file is distributed
// on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
// express or implied. See the License for the specific language governing
// permissions and limitations under the License.

package io.element.android.compound

import androidx.compose.runtime.Stable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.graphics.Color

@Stable
class CompoundColors(
    colorTextPrimary: Color,
    colorTextSecondary: Color,
    colorTextPlaceholder: Color,
    colorTextDisabled: Color,
    colorTextActionPrimary: Color,
    colorTextActionAccent: Color,
    colorTextLinkExternal: Color,
    colorTextCriticalPrimary: Color,
    colorTextSuccessPrimary: Color,
    colorTextInfoPrimary: Color,
    colorTextOnSolidPrimary: Color,
    colorBgSubtlePrimary: Color,
    colorBgSubtleSecondary: Color,
    colorBgCanvasDefault: Color,
    colorBgCanvasDisabled: Color,
    colorBgActionPrimaryRest: Color,
    colorBgActionPrimaryHovered: Color,
    colorBgActionPrimaryPressed: Color,
    colorBgActionPrimaryDisabled: Color,
    colorBgActionSecondaryRest: Color,
    colorBgActionSecondaryHovered: Color,
    colorBgActionSecondaryPressed: Color,
    colorBgCriticalPrimary: Color,
    colorBgCriticalHovered: Color,
    colorBgCriticalSubtle: Color,
    colorBgCriticalSubtleHovered: Color,
    colorBgSuccessSubtle: Color,
    colorBgInfoSubtle: Color,
    colorBorderDisabled: Color,
    colorBorderFocused: Color,
    colorBorderInteractivePrimary: Color,
    colorBorderInteractiveSecondary: Color,
    colorBorderInteractiveHovered: Color,
    colorBorderCriticalPrimary: Color,
    colorBorderCriticalHovered: Color,
    colorBorderCriticalSubtle: Color,
    colorBorderSuccessSubtle: Color,
    colorBorderInfoSubtle: Color,
    colorIconPrimary: Color,
    colorIconSecondary: Color,
    colorIconTertiary: Color,
    colorIconQuaternary: Color,
    colorIconDisabled: Color,
    colorIconPrimaryAlpha: Color,
    colorIconSecondaryAlpha: Color,
    colorIconTertiaryAlpha: Color,
    colorIconQuaternaryAlpha: Color,
    colorIconAccentTertiary: Color,
    colorIconCriticalPrimary: Color,
    colorIconSuccessPrimary: Color,
    colorIconInfoPrimary: Color,
    colorIconOnSolidPrimary: Color,
    isLight: Boolean,
) {
    var isLight by mutableStateOf(isLight)
        private set
    /** Highest contrast text. */
    var colorTextPrimary by mutableStateOf(colorTextPrimary)
        private set
    /** Lowest contrast text. */
    var colorTextSecondary by mutableStateOf(colorTextSecondary)
        private set
    /** Use for placeholder text. Placeholder text should be non-essential. Do not rely exclusively on it. */
    var colorTextPlaceholder by mutableStateOf(colorTextPlaceholder)
        private set
    /** Use for regular text in disabled elements. There's no minimum contrast requirement. */
    var colorTextDisabled by mutableStateOf(colorTextDisabled)
        private set
    /** Default text colour for plain actions. */
    var colorTextActionPrimary by mutableStateOf(colorTextActionPrimary)
        private set
    /** Accent text colour for plain actions. */
    var colorTextActionAccent by mutableStateOf(colorTextActionAccent)
        private set
    /** Text colour for external links. */
    var colorTextLinkExternal by mutableStateOf(colorTextLinkExternal)
        private set
    /** Text colour for destructive plain actions. */
    var colorTextCriticalPrimary by mutableStateOf(colorTextCriticalPrimary)
        private set
    /** Accent text colour for success state elements. */
    var colorTextSuccessPrimary by mutableStateOf(colorTextSuccessPrimary)
        private set
    /** Accent text colour for informational elements. */
    var colorTextInfoPrimary by mutableStateOf(colorTextInfoPrimary)
        private set
    /** For use as text color on top of high-contrast solid backgrounds like primary, accent, or destructive actions. */
    var colorTextOnSolidPrimary by mutableStateOf(colorTextOnSolidPrimary)
        private set
    /** Medium contrast surfaces.
Elevation: Default (Level 2). */
    var colorBgSubtlePrimary by mutableStateOf(colorBgSubtlePrimary)
        private set
    /** Low contrast surfaces.
Elevation: Default (Level 1). */
    var colorBgSubtleSecondary by mutableStateOf(colorBgSubtleSecondary)
        private set
    /** Default global background for the user interface.
Elevation: Default (Level 0) */
    var colorBgCanvasDefault by mutableStateOf(colorBgCanvasDefault)
        private set
    /** Default background for disabled elements. There's no minimum contrast requirement. */
    var colorBgCanvasDisabled by mutableStateOf(colorBgCanvasDisabled)
        private set
    /** Background colour for primary actions. State: Rest. */
    var colorBgActionPrimaryRest by mutableStateOf(colorBgActionPrimaryRest)
        private set
    /** Background colour for primary actions. State: Hover. */
    var colorBgActionPrimaryHovered by mutableStateOf(colorBgActionPrimaryHovered)
        private set
    /** Background colour for primary actions. State: Pressed. */
    var colorBgActionPrimaryPressed by mutableStateOf(colorBgActionPrimaryPressed)
        private set
    /** Background colour for primary actions. State: Disabled. */
    var colorBgActionPrimaryDisabled by mutableStateOf(colorBgActionPrimaryDisabled)
        private set
    /** Background colour for secondary actions. State: Rest. */
    var colorBgActionSecondaryRest by mutableStateOf(colorBgActionSecondaryRest)
        private set
    /** Background colour for secondary actions. State: Hover. */
    var colorBgActionSecondaryHovered by mutableStateOf(colorBgActionSecondaryHovered)
        private set
    /** Background colour for secondary actions. State: Pressed. */
    var colorBgActionSecondaryPressed by mutableStateOf(colorBgActionSecondaryPressed)
        private set
    /** High-contrast background color for critical state. State: Rest. */
    var colorBgCriticalPrimary by mutableStateOf(colorBgCriticalPrimary)
        private set
    /** High-contrast background color for critical state. State: Hover. */
    var colorBgCriticalHovered by mutableStateOf(colorBgCriticalHovered)
        private set
    /** Default subtle critical surfaces. State: Rest. */
    var colorBgCriticalSubtle by mutableStateOf(colorBgCriticalSubtle)
        private set
    /** Default subtle critical surfaces. State: Hover. */
    var colorBgCriticalSubtleHovered by mutableStateOf(colorBgCriticalSubtleHovered)
        private set
    /** Subtle background colour for success state elements. State: Rest. */
    var colorBgSuccessSubtle by mutableStateOf(colorBgSuccessSubtle)
        private set
    /** Subtle background colour for informational elements. State: Rest. */
    var colorBgInfoSubtle by mutableStateOf(colorBgInfoSubtle)
        private set
    /** Used for borders of disabled elements. There's no minimum contrast requirement. */
    var colorBorderDisabled by mutableStateOf(colorBorderDisabled)
        private set
    /** Used for the focus state outline. */
    var colorBorderFocused by mutableStateOf(colorBorderFocused)
        private set
    /** Default contrast for accessible interactive element borders. State: Rest. */
    var colorBorderInteractivePrimary by mutableStateOf(colorBorderInteractivePrimary)
        private set
    /** ⚠️ Lowest contrast for non-accessible interactive element borders, <3:1. Only use for non-essential borders. Do not rely exclusively on them. State: Rest. */
    var colorBorderInteractiveSecondary by mutableStateOf(colorBorderInteractiveSecondary)
        private set
    /** Default contrast for accessible interactive element borders. State: Hover. */
    var colorBorderInteractiveHovered by mutableStateOf(colorBorderInteractiveHovered)
        private set
    /** High-contrast border for critical state. State: Rest. */
    var colorBorderCriticalPrimary by mutableStateOf(colorBorderCriticalPrimary)
        private set
    /** High-contrast border for critical state. State: Hover. */
    var colorBorderCriticalHovered by mutableStateOf(colorBorderCriticalHovered)
        private set
    /** Subtle border colour for critical state elements. */
    var colorBorderCriticalSubtle by mutableStateOf(colorBorderCriticalSubtle)
        private set
    /** Subtle border colour for success state elements. */
    var colorBorderSuccessSubtle by mutableStateOf(colorBorderSuccessSubtle)
        private set
    /** Subtle border colour for informational elements. */
    var colorBorderInfoSubtle by mutableStateOf(colorBorderInfoSubtle)
        private set
    /** Highest contrast icons. */
    var colorIconPrimary by mutableStateOf(colorIconPrimary)
        private set
    /** Lower contrast icons. */
    var colorIconSecondary by mutableStateOf(colorIconSecondary)
        private set
    /** Lowest contrast accessible icons. */
    var colorIconTertiary by mutableStateOf(colorIconTertiary)
        private set
    /** ⚠️ Lowest contrast non-accessible icons, <3:1. Only use for non-essential icons. Do not rely exclusively on them. */
    var colorIconQuaternary by mutableStateOf(colorIconQuaternary)
        private set
    /** Use for icons in disabled elements. There's no minimum contrast requirement. */
    var colorIconDisabled by mutableStateOf(colorIconDisabled)
        private set
    /** Translucent version of primary icon. Refer to it for intended use. */
    var colorIconPrimaryAlpha by mutableStateOf(colorIconPrimaryAlpha)
        private set
    /** Translucent version of secondary icon. Refer to it for intended use. */
    var colorIconSecondaryAlpha by mutableStateOf(colorIconSecondaryAlpha)
        private set
    /** Translucent version of tertiary icon. Refer to it for intended use. */
    var colorIconTertiaryAlpha by mutableStateOf(colorIconTertiaryAlpha)
        private set
    /** Translucent version of quaternary icon. Refer to it for intended use. */
    var colorIconQuaternaryAlpha by mutableStateOf(colorIconQuaternaryAlpha)
        private set
    /** Lowest contrast accessible accent icons. */
    var colorIconAccentTertiary by mutableStateOf(colorIconAccentTertiary)
        private set
    /** High-contrast icon for critical state. State: Rest. */
    var colorIconCriticalPrimary by mutableStateOf(colorIconCriticalPrimary)
        private set
    /** High-contrast icon for success state elements. */
    var colorIconSuccessPrimary by mutableStateOf(colorIconSuccessPrimary)
        private set
    /** High-contrast icon for informational elements. */
    var colorIconInfoPrimary by mutableStateOf(colorIconInfoPrimary)
        private set
    /** Highest contrast icon color on top of high-contrast solid backgrounds like primary, accent, or destructive actions. */
    var colorIconOnSolidPrimary by mutableStateOf(colorIconOnSolidPrimary)
        private set

    fun copy(
        colorTextPrimary: Color = this.colorTextPrimary,
        colorTextSecondary: Color = this.colorTextSecondary,
        colorTextPlaceholder: Color = this.colorTextPlaceholder,
        colorTextDisabled: Color = this.colorTextDisabled,
        colorTextActionPrimary: Color = this.colorTextActionPrimary,
        colorTextActionAccent: Color = this.colorTextActionAccent,
        colorTextLinkExternal: Color = this.colorTextLinkExternal,
        colorTextCriticalPrimary: Color = this.colorTextCriticalPrimary,
        colorTextSuccessPrimary: Color = this.colorTextSuccessPrimary,
        colorTextInfoPrimary: Color = this.colorTextInfoPrimary,
        colorTextOnSolidPrimary: Color = this.colorTextOnSolidPrimary,
        colorBgSubtlePrimary: Color = this.colorBgSubtlePrimary,
        colorBgSubtleSecondary: Color = this.colorBgSubtleSecondary,
        colorBgCanvasDefault: Color = this.colorBgCanvasDefault,
        colorBgCanvasDisabled: Color = this.colorBgCanvasDisabled,
        colorBgActionPrimaryRest: Color = this.colorBgActionPrimaryRest,
        colorBgActionPrimaryHovered: Color = this.colorBgActionPrimaryHovered,
        colorBgActionPrimaryPressed: Color = this.colorBgActionPrimaryPressed,
        colorBgActionPrimaryDisabled: Color = this.colorBgActionPrimaryDisabled,
        colorBgActionSecondaryRest: Color = this.colorBgActionSecondaryRest,
        colorBgActionSecondaryHovered: Color = this.colorBgActionSecondaryHovered,
        colorBgActionSecondaryPressed: Color = this.colorBgActionSecondaryPressed,
        colorBgCriticalPrimary: Color = this.colorBgCriticalPrimary,
        colorBgCriticalHovered: Color = this.colorBgCriticalHovered,
        colorBgCriticalSubtle: Color = this.colorBgCriticalSubtle,
        colorBgCriticalSubtleHovered: Color = this.colorBgCriticalSubtleHovered,
        colorBgSuccessSubtle: Color = this.colorBgSuccessSubtle,
        colorBgInfoSubtle: Color = this.colorBgInfoSubtle,
        colorBorderDisabled: Color = this.colorBorderDisabled,
        colorBorderFocused: Color = this.colorBorderFocused,
        colorBorderInteractivePrimary: Color = this.colorBorderInteractivePrimary,
        colorBorderInteractiveSecondary: Color = this.colorBorderInteractiveSecondary,
        colorBorderInteractiveHovered: Color = this.colorBorderInteractiveHovered,
        colorBorderCriticalPrimary: Color = this.colorBorderCriticalPrimary,
        colorBorderCriticalHovered: Color = this.colorBorderCriticalHovered,
        colorBorderCriticalSubtle: Color = this.colorBorderCriticalSubtle,
        colorBorderSuccessSubtle: Color = this.colorBorderSuccessSubtle,
        colorBorderInfoSubtle: Color = this.colorBorderInfoSubtle,
        colorIconPrimary: Color = this.colorIconPrimary,
        colorIconSecondary: Color = this.colorIconSecondary,
        colorIconTertiary: Color = this.colorIconTertiary,
        colorIconQuaternary: Color = this.colorIconQuaternary,
        colorIconDisabled: Color = this.colorIconDisabled,
        colorIconPrimaryAlpha: Color = this.colorIconPrimaryAlpha,
        colorIconSecondaryAlpha: Color = this.colorIconSecondaryAlpha,
        colorIconTertiaryAlpha: Color = this.colorIconTertiaryAlpha,
        colorIconQuaternaryAlpha: Color = this.colorIconQuaternaryAlpha,
        colorIconAccentTertiary: Color = this.colorIconAccentTertiary,
        colorIconCriticalPrimary: Color = this.colorIconCriticalPrimary,
        colorIconSuccessPrimary: Color = this.colorIconSuccessPrimary,
        colorIconInfoPrimary: Color = this.colorIconInfoPrimary,
        colorIconOnSolidPrimary: Color = this.colorIconOnSolidPrimary,
        isLight: Boolean = this.isLight,
    ) = CompoundColors(
        colorTextPrimary = colorTextPrimary,
        colorTextSecondary = colorTextSecondary,
        colorTextPlaceholder = colorTextPlaceholder,
        colorTextDisabled = colorTextDisabled,
        colorTextActionPrimary = colorTextActionPrimary,
        colorTextActionAccent = colorTextActionAccent,
        colorTextLinkExternal = colorTextLinkExternal,
        colorTextCriticalPrimary = colorTextCriticalPrimary,
        colorTextSuccessPrimary = colorTextSuccessPrimary,
        colorTextInfoPrimary = colorTextInfoPrimary,
        colorTextOnSolidPrimary = colorTextOnSolidPrimary,
        colorBgSubtlePrimary = colorBgSubtlePrimary,
        colorBgSubtleSecondary = colorBgSubtleSecondary,
        colorBgCanvasDefault = colorBgCanvasDefault,
        colorBgCanvasDisabled = colorBgCanvasDisabled,
        colorBgActionPrimaryRest = colorBgActionPrimaryRest,
        colorBgActionPrimaryHovered = colorBgActionPrimaryHovered,
        colorBgActionPrimaryPressed = colorBgActionPrimaryPressed,
        colorBgActionPrimaryDisabled = colorBgActionPrimaryDisabled,
        colorBgActionSecondaryRest = colorBgActionSecondaryRest,
        colorBgActionSecondaryHovered = colorBgActionSecondaryHovered,
        colorBgActionSecondaryPressed = colorBgActionSecondaryPressed,
        colorBgCriticalPrimary = colorBgCriticalPrimary,
        colorBgCriticalHovered = colorBgCriticalHovered,
        colorBgCriticalSubtle = colorBgCriticalSubtle,
        colorBgCriticalSubtleHovered = colorBgCriticalSubtleHovered,
        colorBgSuccessSubtle = colorBgSuccessSubtle,
        colorBgInfoSubtle = colorBgInfoSubtle,
        colorBorderDisabled = colorBorderDisabled,
        colorBorderFocused = colorBorderFocused,
        colorBorderInteractivePrimary = colorBorderInteractivePrimary,
        colorBorderInteractiveSecondary = colorBorderInteractiveSecondary,
        colorBorderInteractiveHovered = colorBorderInteractiveHovered,
        colorBorderCriticalPrimary = colorBorderCriticalPrimary,
        colorBorderCriticalHovered = colorBorderCriticalHovered,
        colorBorderCriticalSubtle = colorBorderCriticalSubtle,
        colorBorderSuccessSubtle = colorBorderSuccessSubtle,
        colorBorderInfoSubtle = colorBorderInfoSubtle,
        colorIconPrimary = colorIconPrimary,
        colorIconSecondary = colorIconSecondary,
        colorIconTertiary = colorIconTertiary,
        colorIconQuaternary = colorIconQuaternary,
        colorIconDisabled = colorIconDisabled,
        colorIconPrimaryAlpha = colorIconPrimaryAlpha,
        colorIconSecondaryAlpha = colorIconSecondaryAlpha,
        colorIconTertiaryAlpha = colorIconTertiaryAlpha,
        colorIconQuaternaryAlpha = colorIconQuaternaryAlpha,
        colorIconAccentTertiary = colorIconAccentTertiary,
        colorIconCriticalPrimary = colorIconCriticalPrimary,
        colorIconSuccessPrimary = colorIconSuccessPrimary,
        colorIconInfoPrimary = colorIconInfoPrimary,
        colorIconOnSolidPrimary = colorIconOnSolidPrimary,
        isLight = isLight,
    )

    fun updateColorsFrom(other: CompoundColors) {
        colorTextPrimary = other.colorTextPrimary,
        colorTextSecondary = other.colorTextSecondary,
        colorTextPlaceholder = other.colorTextPlaceholder,
        colorTextDisabled = other.colorTextDisabled,
        colorTextActionPrimary = other.colorTextActionPrimary,
        colorTextActionAccent = other.colorTextActionAccent,
        colorTextLinkExternal = other.colorTextLinkExternal,
        colorTextCriticalPrimary = other.colorTextCriticalPrimary,
        colorTextSuccessPrimary = other.colorTextSuccessPrimary,
        colorTextInfoPrimary = other.colorTextInfoPrimary,
        colorTextOnSolidPrimary = other.colorTextOnSolidPrimary,
        colorBgSubtlePrimary = other.colorBgSubtlePrimary,
        colorBgSubtleSecondary = other.colorBgSubtleSecondary,
        colorBgCanvasDefault = other.colorBgCanvasDefault,
        colorBgCanvasDisabled = other.colorBgCanvasDisabled,
        colorBgActionPrimaryRest = other.colorBgActionPrimaryRest,
        colorBgActionPrimaryHovered = other.colorBgActionPrimaryHovered,
        colorBgActionPrimaryPressed = other.colorBgActionPrimaryPressed,
        colorBgActionPrimaryDisabled = other.colorBgActionPrimaryDisabled,
        colorBgActionSecondaryRest = other.colorBgActionSecondaryRest,
        colorBgActionSecondaryHovered = other.colorBgActionSecondaryHovered,
        colorBgActionSecondaryPressed = other.colorBgActionSecondaryPressed,
        colorBgCriticalPrimary = other.colorBgCriticalPrimary,
        colorBgCriticalHovered = other.colorBgCriticalHovered,
        colorBgCriticalSubtle = other.colorBgCriticalSubtle,
        colorBgCriticalSubtleHovered = other.colorBgCriticalSubtleHovered,
        colorBgSuccessSubtle = other.colorBgSuccessSubtle,
        colorBgInfoSubtle = other.colorBgInfoSubtle,
        colorBorderDisabled = other.colorBorderDisabled,
        colorBorderFocused = other.colorBorderFocused,
        colorBorderInteractivePrimary = other.colorBorderInteractivePrimary,
        colorBorderInteractiveSecondary = other.colorBorderInteractiveSecondary,
        colorBorderInteractiveHovered = other.colorBorderInteractiveHovered,
        colorBorderCriticalPrimary = other.colorBorderCriticalPrimary,
        colorBorderCriticalHovered = other.colorBorderCriticalHovered,
        colorBorderCriticalSubtle = other.colorBorderCriticalSubtle,
        colorBorderSuccessSubtle = other.colorBorderSuccessSubtle,
        colorBorderInfoSubtle = other.colorBorderInfoSubtle,
        colorIconPrimary = other.colorIconPrimary,
        colorIconSecondary = other.colorIconSecondary,
        colorIconTertiary = other.colorIconTertiary,
        colorIconQuaternary = other.colorIconQuaternary,
        colorIconDisabled = other.colorIconDisabled,
        colorIconPrimaryAlpha = other.colorIconPrimaryAlpha,
        colorIconSecondaryAlpha = other.colorIconSecondaryAlpha,
        colorIconTertiaryAlpha = other.colorIconTertiaryAlpha,
        colorIconQuaternaryAlpha = other.colorIconQuaternaryAlpha,
        colorIconAccentTertiary = other.colorIconAccentTertiary,
        colorIconCriticalPrimary = other.colorIconCriticalPrimary,
        colorIconSuccessPrimary = other.colorIconSuccessPrimary,
        colorIconInfoPrimary = other.colorIconInfoPrimary,
        colorIconOnSolidPrimary = other.colorIconOnSolidPrimary,
        isLight = other.isLight
    }
}
