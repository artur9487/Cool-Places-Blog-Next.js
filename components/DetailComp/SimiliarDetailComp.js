/** @format */

import {
	Card,
	Typography,
	Box,
	Stack,
	CardContent,
	CardMedia
} from '@mui/material';
import moment from 'moment';
import Image from 'next/image';
import styles from '/styles/Home.module.scss';
import Link from 'next/link';

const SimiliarDetailComp = ({ result2 }) => {
	console.log(result2);
	return (
		<Stack
			sx={{ width: '100%' }}
			spacing={3}
			direction='row'
			justifyContent='center'>
			{result2.map((item, indx) => {
				const { placeName, photo, createdAt, id } = item.node;
				return (
					<Link key={indx} href={`/details/${id}`}>
						<a>
							<Card
								className={styles.button2}
								sx={{
									cursor: 'pointer',
									height: 300,
									width: 200,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'column',
									p: 2
								}}>
								<CardContent
									sx={{
										display: 'flex',
										alignItems: 'center',
										flexDirection: 'column',
										justifyContent: 'space-evenly',
										height: '50%'
									}}>
									<Typography
										sx={{ fontFamily: 'Playfair Display' }}
										textAlign='center'
										variant='body1'
										color='text.secondary'>
										{moment({ createdAt }).format('MMMM Do YYYY')}
									</Typography>
									<Typography
										sx={{
											fontFamily: 'Playfair Display',
											fontStyle: 'italic',
											fontWeight: 1000
										}}
										textAlign='center'
										gutterBottom
										variant='h5'
										component='div'>
										{placeName}
									</Typography>
								</CardContent>
								<CardMedia
									sx={{
										width: '100%',
										height: '50%',
										position: 'relative',
										borderRadius: 5,
										overflow: 'hidden'
									}}>
									<Box
										sx={{
											position: 'relative',
											width: '100%',
											height: '100%'
										}}>
										<Image src={photo.url} objectFit='cover' layout='fill' />
									</Box>
								</CardMedia>
							</Card>
						</a>
					</Link>
				);
			})}
		</Stack>
	);
};
export default SimiliarDetailComp;
