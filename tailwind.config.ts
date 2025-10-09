import type { Config } from "tailwindcss";

export default <Partial<Config>>{
	theme: {
		extend: {
		},
	},
	mode: "jit",
	darkMode: "class",
	content: [
		"components/**/*.{vue,js,jsx,mjs,ts,tsx}",
		"layouts/**/*.{vue,js,jsx,mjs,ts,tsx}",
		"pages/**/*.{vue,js,jsx,mjs,ts,tsx}",
		"plugins/**/*.{js,ts,mjs}",
		"composables/**/*.{js,ts,mjs}",
		"utils/**/*.{js,ts,mjs}",
		"{A,a}pp.{vue,js,jsx,mjs,ts,tsx}",
		"{E,e}rror.{vue,js,jsx,mjs,ts,tsx}",
		"app.config.{js,ts,mjs}",
		'./node_modules/preline/dist/*.js',
	],
	plugins: [
		require('preline/plugin'),
	],
	safelist: [
		{
			pattern: /(bg|text|border)-(background|surface)-(darkGrey|offWhite|white|grey|dark|light|low|mid|high)/,
		},
	],
};
