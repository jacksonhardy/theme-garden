const moreWrapped = {
	padding: 8,
};

export const themes = {
	light: {
		base: {
			color: '#222222',
			background: '#eeeeee',
			border: '1px solid #222222',
		},
		wrappedButton: {
			color: '#7755dd',
			background: '#cccdef',
			border: '1px solid #7755dd',
			moreWrapped: {
				...moreWrapped,
				color: 'maroon',
				background: 'lavender',
			},
		},
	},
	dark: {
		base: {
			color: '#ffffff',
			background: '#222222',
			border: '1px solid #222222',
		},
		wrappedButton: {
			color: '#efefff',
			background: '#7755dd',
			border: '1px solid #efefff',
			moreWrapped: {
				...moreWrapped,
				color: 'coral',
				background: 'maroon',
			},
		},
	},
};

export const createTheme = (
	primary,
	secondary,
	tertiary,
	accent,
	alternate,
	another
) => {
	return {
		base: {
			color: primary,
			background: secondary,
			border: `1px solid ${primary}`,
		},
		wrappedButton: {
			color: tertiary,
			background: accent,
			border: `1px solid ${tertiary}`,
			moreWrapped: {
				...moreWrapped,
				color: accent,
				background: primary,
			},
		},
		tripleWrap: {
			color: alternate,
			background: another,
			border: `1px solid ${primary}`,
			moreWrapped: {
				...moreWrapped,
				color: another,
				background: alternate,
			},
		},
	};
};
