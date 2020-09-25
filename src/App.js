import React, { useContext, useState, useEffect } from 'react';
import { themes, createTheme } from './themes';
import ReactDOM from 'react-dom';
import { Switch, Route, Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const ThemeContext = React.createContext(themes.light);

// 01234567
// FEDCBA98

// const COLOR_A = '#3322ff'
// const COLOR_B = '#ccdd00'
// const COLOR_A = '#d4aaff'
// const COLOR_B = '#2b5500'
const COLOR_A = '#0000ff';
const COLOR_B = '#ffff00';

const styles = {
	flex: {
		column: {
			display: 'flex',
			flexDirection: 'column',
		},
		row: {
			display: 'flex',
			flexDirection: 'row',
		},
		js: {
			justifyContent: 'flex-start',
		},
		as: {
			alignItems: 'flex-start',
		},
	},
};

let dummyRoot = document.getElementById('dummy-root');

class Dummy extends React.Component {
	constructor(props) {
		super(props);
		this.el = document.createElement('div', { id: 'dummy' });
	}
	componentDidMount() {
		dummyRoot.appendChild(this.el);
	}
	render() {
		return ReactDOM.createPortal(
			<input id="dummy-input" readOnly />,
			this.el
		);
	}
}

const PopUpAlert = (props) => {
	const { show, reset } = props;

	useEffect(() => {
		if (show) {
			setTimeout(() => {
				reset();
			}, 3000);
		}
	}, [show, reset]);

	return (
		show && (
			<div
				style={{
					height: 80,
					width: 240,
					padding: 24,
					...styles.flex.column,
					...styles.flex.js,
					...styles.flex.as,
					background: 'white',
					border: '1px solid #aaa',
					borderRadius: 4,
					boxShadow: '2px 4px 8px 0px #222222cc',
					position: 'absolute',
					top: 16,
					right: 16,
				}}
			>
				<p>{props.message}</p>
			</div>
		)
	);
};

function App() {
	const [theme, setTheme] = useState(themes.dark);
	const [currentTheme, setCurrentTheme] = useState([]);
	const [themeColors, setThemeColors] = useState([]);
	const [showClipboardDummyInput, setShowClipboardDummyInput] = useState(
		false
	);

	useEffect(() => {
		setRandomTheme();
	}, []);

	const setRandomTheme = () => {
		let random = () => Math.floor(Math.random() * 16777215).toString(16);
		let a = `#${random()}`;
		let b = `#${random()}`;
		let c = `#${random()}`;
		let d = `#${random()}`;
		let e = `#${random()}`;
		let f = `#${random()}`;
		let newTheme = createTheme(a, b, c, d, e, f);
		setCurrentTheme(`${a}, ${b}, ${c}, ${d}, ${e}, ${f}`);
		setThemeColors([a, b, c, d, e, f]);
		console.log(a, b, c, d);
		setTheme(newTheme);
	};

	const [showPopup, setShowPopup] = useState(false);
	const [currentColor, setCurrentColor] = useState('');

	const handleSetCurrentColor = (e) => {
		setCurrentColor(e.target.value);
	};

	const copyTheme = () => {
		let theme = document.getElementById('currentTheme');
		theme.select();
		document.execCommand('copy', true);
		setShowPopup(true);
	};

	const copyColor = (color) => {
		setShowClipboardDummyInput(true);
		setCurrentColor(color);
		setTimeout(() => {
			let dummy = document.getElementById('dummy-input');
			dummy.value = color;
			dummy.select();
			document.execCommand('copy', true);
			setShowPopup(true);
			setShowClipboardDummyInput(false);
		}, 100);
	};

	return (
		<Router>
			<>
				<PopUpAlert
					show={showPopup}
					reset={() => setShowPopup(false)}
					message="Copied to clipboard!"
				/>
				<Route path={'/theme-garden'}>
					<>
						<div
							style={{
								margin: 8,
								borderRadius: '100%',
								height: 40,
								width: 40,
								background: COLOR_A,
								cursor: 'pointer',
							}}
							onClick={() => copyColor(COLOR_A)}
						></div>
						<div
							style={{
								margin: 8,
								borderRadius: '100%',
								height: 40,
								width: 40,
								background: COLOR_B,
								cursor: 'pointer',
							}}
							onClick={() => copyColor(COLOR_B)}
						></div>
						<button onClick={setRandomTheme}>Random Theme</button>
						{currentTheme.length > 0 && (
							<>
								<p>Current Theme: </p>
								<div>
									<input
										id="currentTheme"
										value={currentTheme}
										style={{ width: '50vw' }}
										readOnly
									/>
								</div>
								{showClipboardDummyInput && <Dummy />}
								<button onClick={copyTheme}>
									Copy Theme to Clipboard
								</button>
								{/* TODO add padded container style */}
								<div
									style={{
										padding: 16,
										...styles.flex.row,
										width: '100%',
									}}
								>
									{themeColors.map((color) => (
										<div
											style={{
												margin: 8,
												borderRadius: '100%',
												height: 40,
												width: 40,
												background: color,
												cursor: 'pointer',
											}}
											onClick={() => copyColor(color)}
										></div>
									))}
								</div>
							</>
						)}
						<ThemeContext.Provider value={theme}>
							<Toolbar />
						</ThemeContext.Provider>
					</>
				</Route>
				<Route exact path={'/color-balls'}>
					BALLS
				</Route>
			</>
		</Router>
	);
}

function Toolbar(props) {
	return (
		<div>
			<ThemedButton />
			<WrappedButton />
			<MoreWrapped />
		</div>
	);
}

const MoreWrapped = () => {
	const theme = useContext(ThemeContext);

	return (
		<div
			style={{
				...theme.wrappedButton,
				boxShadow: '1px 1px 4px 2px rgba(80, 80, 80, .2)',
				height: 200,
				width: 400,
				margin: 50,
				borderRadius: 8,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div style={{ ...theme.wrappedButton.moreWrapped }}>
				I am so fucking themed rn
			</div>
		</div>
	);
};

const WrappedButton = () => {
	const theme = useContext(ThemeContext);
	return (
		<div
			style={{
				...theme.base,
				boxShadow: '1px 1px 4px 2px rgba(80, 80, 80, .2)',
				height: 200,
				width: 400,
				margin: 50,
				borderRadius: 8,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<button style={{ ...theme.wrappedButton }}>
				I am deeply themed
			</button>
			<button style={{ margin: 20, ...theme.tripleWrap }}>
				I am deeply themed
			</button>
		</div>
	);
};

function ThemedButton() {
	const theme = useContext(ThemeContext);
	return (
		<button style={{ ...theme.base }}>I am styled by theme context!</button>
	);
}

export default App;
