/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#92cde0ff";
const tintColorDark = "#fffdbdff";

export const Colors = {
	light: {
		text: "#11181C",
		background: "#fff",
		tint: tintColorLight,
		icon: "#687076",
		tabIconDefault: "#687076",
		tabIconSelected: tintColorLight,
	},
	dark: {
		text: "#bf5532ff",
		background: "#fd8458ff",
		tint: tintColorDark,
		icon: "#ff5900ff",
		tabIconDefault: "#fdde82ff",
		tabIconSelected: tintColorDark,
	},
};
