/** @format */

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import moment from 'moment';
import styles from '/styles/Home.module.scss';
import Link from 'next/link';

interface SingleComPost_schema {
	node: {
		placeName: string;
		createdAt: Date;
		photo: {
			url: string;
		};
		id: string;
	};
	count: number;
}

const SingleComPost: React.FC<SingleComPost_schema> = (item) => {
	const { placeName, createdAt, photo, id } = item[0].node;
	const { count } = item;

	return (
		<Link href={`/details/${id}`}>
			<a>
				<Card
					className={styles.button2}
					sx={{
						cursor: 'pointer',
						background: `linear-gradient(45deg, rgb(225, 225, 225), rgb(240, 240, 240),rgb(240, 240, 240))`,
						minWidth: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						flexDirection: 'row',
						p: 0,
						mb: 2,
					}}>
					<CardMedia
						sx={{
							width: '30%',
							height: '100%',
						}}>
						<Stack
							sx={{ width: '100%', height: '100%' }}
							direction='column'
							justifyContent='center'
							alignItems='center'>
							<Box
								sx={{
									width: 50,
									height: 50,
									position: 'relative',
									borderRadius: '100%',
									overflow: 'hidden',
								}}>
								<Image
									src={photo.url}
									objectFit='cover'
									layout='fill'
									alt='com post'
								/>
							</Box>
						</Stack>
					</CardMedia>
					<CardContent
						sx={{
							width: '70%',
							display: 'flex',
							alignItems: 'flex-start',
							flexDirection: 'column',
						}}>
						<Typography
							sx={{
								fontFamily: 'Playfair Display',
							}}
							variant='body2'
							color='text.secondary'>
							{moment(createdAt).format('MMM Do YY')}
						</Typography>
						<Typography
							sx={{
								fontFamily: 'Playfair Display',
								fontStyle: 'italic',
								fontSize: 17,
								fontWeight: 1000,
							}}
							fontSize={15}
							component='div'>
							{placeName}
						</Typography>
						<Typography
							sx={{
								fontFamily: 'Playfair Display',
								color: 'orange',
							}}
							fontSize={13}
							component='div'>
							{count} {count === 1 ? ' Comment' : ' Comments'}
						</Typography>
					</CardContent>
				</Card>
			</a>
		</Link>
	);
};

export default SingleComPost;
