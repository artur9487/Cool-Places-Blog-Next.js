/** @format */

import Navbar from '../components/Navbar';
import '../styles/globals.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import FadeWrapper from '../components/FadeWrapper';

function MyApp({ Component, pageProps }) {
	const theme = createTheme({
		typography: {
			fontFamily: [
				'Satisfy',
				'Courgette',
				'Playfair Display',
				'Beau Rivage',
				'Dancing Script',
				'Helvetica Neue',
				'Arial',
				'sans-serif'
			].join(',')
		}
	});
	return (
		<>
			<ThemeProvider theme={theme}>
				<FadeWrapper>
					<Navbar />
				</FadeWrapper>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

export default MyApp;
