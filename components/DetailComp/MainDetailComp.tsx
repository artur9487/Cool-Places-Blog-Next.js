/** @format */
import {
	Card,
	Typography,
	CardMedia,
	CardContent,
	CardActions,
	Stack
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import styles from '/styles/Home.module.scss';
import Chip from '@mui/material/Chip';
import { useContext } from 'react';
import { Context } from '../../ContextComp';

interface mainDetailCompSchema {
	photo: {
		url: string;
	};
	createdAt: Date;
	description: string;
	placeName: string;
	chips: string;
}

const MainDetailComp: React.FC<mainDetailCompSchema> = ({
	photo,
	createdAt,
	description,
	placeName,
	chips
}) => {
	const { maxWidth600 } = useContext(Context);
	return (
		<Card
			sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				p: 3,

				background: `linear-gradient(45deg, rgb(200, 200, 200), rgb(240, 240, 240),rgb(240, 240, 240), rgb(200, 200, 200))`,
				boxShadow: '7px 7px 10px rgba(191, 191, 191,1)',
				borderRadius: 4
			}}>
			<CardMedia
				sx={{
					mt: 3,
					width: '100%',
					height: !maxWidth600 ? 500 : 300,
					position: 'relative',
					borderRadius: 5,
					overflow: 'hidden'
				}}>
				<Image src={photo.url} objectFit='cover' layout='fill' alt='detail' />
			</CardMedia>
			<CardContent
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column'
				}}>
				<Typography
					sx={{ fontFamily: 'Playfair Display' }}
					variant='body1'
					color='text.secondary'>
					{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}
				</Typography>
				<Typography
					sx={{
						fontFamily: 'Playfair Display',
						fontStyle: 'italic',
						fontSize: 40,
						fontWeight: 1000
					}}
					gutterBottom
					variant='h5'
					component='div'>
					{placeName}
				</Typography>
				<Stack direction='row' justifyContent='center' spacing={1}>
					{chips.split(',').map((item, indx) => {
						return (
							<Chip
								key={indx}
								color='warning'
								label={item}
								variant='outlined'
							/>
						);
					})}
				</Stack>

				<Typography
					sx={{
						fontFamily: 'Playfair Display',
						py: 3
					}}
					variant='body1'
					color='black'
					fontSize={!maxWidth600 ? 15 : 14}>
					{description}
				</Typography>
			</CardContent>
			<CardActions>
				<Link href='/'>
					<a className={styles.button}>
						<Typography sx={{ fontFamily: 'Playfair Display' }}>
							Go back
						</Typography>
					</a>
				</Link>
			</CardActions>
		</Card>
	);
};

export default MainDetailComp;
