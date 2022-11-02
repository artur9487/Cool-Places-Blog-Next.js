/** @format */

import { Context } from '../ContextComp';
import { useContext } from 'react';
import LatestSingelPost from './SingleComPost';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const MostComPosts: React.FC = () => {
	const { mostCommentedOutput } = useContext(Context);

	return (
		<Card
			sx={{
				background: `linear-gradient(45deg, rgb(210, 210, 210), rgb(240, 240, 240),rgb(240, 240, 240), rgb(210, 210, 210))`,
				boxShadow: '7px 7px 10px rgba(191, 191, 191,1)',
				borderRadius: 4,
				p: 3
			}}>
			<Typography
				sx={{
					fontFamily: 'Playfair Display',
					fontStyle: 'italic',
					fontWeight: 1000
				}}
				textAlign='center'
				variant='h5'>
				Most Commented posts:
			</Typography>
			<CardContent sx={{ px: 0 }}>
				{mostCommentedOutput.map((item, indx) => {
					return <LatestSingelPost key={indx} {...item} />;
				})}
			</CardContent>
		</Card>
	);
};

export default MostComPosts;
