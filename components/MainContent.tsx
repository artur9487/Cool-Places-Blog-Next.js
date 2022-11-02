/** @format */

import { Grid, Box } from '@mui/material';
import CardContent from './CardContent';
import CategoriesBar from './CategoriesBar';
import MostComPosts from './MostComPosts';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import FadeWrapper from './FadeWrapper';
import ViewMoreButton from './ViewMoreButton';
import { Context } from '../ContextComp';
import styles from '/styles/Home.module.scss';

const MainContent: React.FC = () => {
	const { type, maxWidth900, maxWidth600 } = useContext(Context);

	return (
		<Grid
			className={styles.fade1}
			justifyContent='center'
			rowSpacing={!maxWidth900 ? 0 : 3}
			container
			direction={!maxWidth900 ? 'row' : 'column-reverse'}
			sx={{ width: '100%', position: 'relative' }}>
			<Grid item xs={4} md={8} container justifyContent='center'>
				<CardContent />
				{type === 'all' ? (
					<FadeWrapper>
						<ViewMoreButton maxWidth900={maxWidth900} />
					</FadeWrapper>
				) : null}
			</Grid>
			<Grid
				sx={{
					position: 'relative',
					minHeight: !maxWidth900 ? '100vh' : '35vh'
				}}
				xs={4}
				md={4}
				item
				container>
				<Stack
					className={styles.fade600}
					direction={!maxWidth900 ? 'column' : 'row'}
					justifyContent={!maxWidth900 ? 'flex-start' : 'center'}
					alignItems={!maxWidth900 ? 'initial' : 'flex-start'}
					sx={{
						width: !maxWidth900 ? 'initial' : '100%',
						position: !maxWidth900 ? 'fixed' : 'relative'
					}}
					spacing={3}>
					<Stack
						spacing={3}
						direction={
							!maxWidth600 ? (!maxWidth900 ? 'column' : 'row') : 'column'
						}>
						<FadeWrapper>
							<MostComPosts />
						</FadeWrapper>
						<FadeWrapper>
							<CategoriesBar />
						</FadeWrapper>
					</Stack>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default MainContent;
