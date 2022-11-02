/** @format */

import {
	Card,
	Typography,
	Box,
	Stack,
	CardContent,
	CardMedia,
	Grid
} from '@mui/material';
import moment from 'moment';
import Image from 'next/image';
import styles from '/styles/Home.module.scss';
import Link from 'next/link';

interface categoriesOutputSchema {
	categoriesOutput: {
		node: {
			placeName: string;
			photo: { url: string };
			createdAt: Date;
			id: string;
		};
	}[];
}

const SimiliarDetailComp: React.FC<categoriesOutputSchema> = ({
	categoriesOutput
}) => {
	return (
		<Grid
			className={styles.fade1}
			container
			sx={{ width: '100%', margin: 'auto' }}
			spacing={3}
			direction='row'
			alignItems='center'
			justifyContent='center'>
			{categoriesOutput.map((item, indx) => {
				const { placeName, photo, createdAt, id } = item.node;
				return (
					<Grid
						key={indx}
						container
						item
						justifyContent='center'
						xs={12}
						sm={6}
						md={4}>
						<Link href={`/details/${id}`}>
							<a>
								<Card
									sx={{
										background: `linear-gradient(45deg, rgb(225, 225, 225), rgb(240, 240, 240),rgb(240, 240, 240))`,
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
											height: '40%'
										}}>
										<Typography
											sx={{ fontFamily: 'Playfair Display' }}
											textAlign='center'
											variant='body1'
											color='text.secondary'>
											{moment(createdAt).format('MMMM Do YYYY')}
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
											height: '60%',
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
											<Image
												src={photo.url}
												objectFit='cover'
												layout='fill'
												alt='silimiar detail'
											/>
										</Box>
									</CardMedia>
								</Card>
							</a>
						</Link>
					</Grid>
				);
			})}
		</Grid>
	);
};
export default SimiliarDetailComp;
