/** @format */

import { Grid } from '@mui/material';
import CardContent from './CardContent';
import CategoriesBar from './CategoriesBar';
import MostComPosts from './MostComPosts';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import FadeWrapper from './FadeWrapper';
import ViewMoreButton from './ViewMoreButton';
import { useMediaQuery } from '@mui/material';
import { Context } from '../ContextComp';
import styles from '/styles/Home.module.scss';

const MainContent = () => {
	const matches = useMediaQuery('(max-width:900px)');
	const { type } = useContext(Context);

	return (
		<Grid
			className={styles.fade1}
			justifyContent='center'
			spacing={!matches ? 0 : 3}
			container
			direction={!matches ? 'row' : 'column-reverse'}
			sx={{ width: '100%', position: 'relative' }}>
			{type === 'all' && matches && (
				<Grid
					mt={4}
					xs={4}
					item
					container
					justifyContent='center'
					alignItems='center'>
					<FadeWrapper>
						<ViewMoreButton matches={matches} />
					</FadeWrapper>
				</Grid>
			)}
			<Grid item xs={4} md={8} container justifyContent='center'>
				<CardContent />
			</Grid>
			<Grid
				sx={{
					position: 'relative',
					minHeight: !matches ? '100vh' : '35vh'
				}}
				xs={4}
				md={4}
				item
				container>
				<Stack
					direction={!matches ? 'column' : 'row'}
					justifyContent={!matches ? 'flex-start' : 'center'}
					alignItems={!matches ? 'initial' : 'flex-start'}
					sx={{
						width: !matches ? 'initial' : '100%',
						position: !matches ? 'fixed' : 'relative'
					}}
					spacing={3}>
					<FadeWrapper>
						<MostComPosts />
					</FadeWrapper>
					<FadeWrapper>
						<CategoriesBar />
					</FadeWrapper>
					{type === 'all' && !matches && (
						<FadeWrapper>
							<ViewMoreButton matches={matches} />
						</FadeWrapper>
					)}
				</Stack>
			</Grid>
		</Grid>
	);
};

export default MainContent;
