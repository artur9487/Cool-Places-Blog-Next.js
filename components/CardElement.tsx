/** @format */

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActions } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import { useRef } from 'react';
import { useEffect, useContext } from 'react';
import AnimationComp from './AnimationComp';
import { Context } from '../ContextComp';
import styles from '/styles/Home.module.scss';

interface CardElement_schema {
	item: {
		description: string;
		photo: {
			url: string;
		};
		placeName: string;
		id: string;
		createdAt: Date;
	};
	indx: number;
	length: number;
}

const CardElement: React.FC<CardElement_schema> = (props) => {
	const { photo, placeName, id, createdAt } = props.item;
	const { length, indx } = props;
	const myRef = useRef(null);
	const { type, maxWidth600 } = useContext(Context);

	useEffect(() => {
		if (type === 'all') {
			if (length <= 2) {
				return;
			} else {
				if (length - 1 === indx + 1) {
					myRef.current.scrollIntoView({ behavior: 'smooth' });
				}
			}
		}
	}, [length, type, indx]);

	return (
		<AnimationComp>
			<Card
				sx={{
					margin: 'auto',
					minWidth: !maxWidth600 ? 400 : 300,
					maxWidth: '70%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					p: 3,
					background: `linear-gradient(45deg, rgb(210, 210, 210), rgb(240, 240, 240),rgb(240, 240, 240), rgb(210, 210, 210))`,
					boxShadow: '7px 7px 10px rgba(191, 191, 191,1)',
					borderRadius: 4,
				}}
				ref={myRef}>
				<CardMedia
					sx={{
						width: '90%',
						height: 200,
						position: 'relative',
						borderRadius: 5,
						overflow: 'hidden',
					}}>
					<Image
						src={photo.url}
						objectFit='cover'
						layout='fill'
						alt='card'
					/>
				</CardMedia>
				<CardContent
					sx={{
						height: 100,
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
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
						}}
						gutterBottom
						variant={!maxWidth600 ? 'h4' : 'h5'}
						component='div'>
						{placeName}
					</Typography>
				</CardContent>
				<CardActions>
					<Link href={`/details/${id}`}>
						<a>
							<button className={styles.button}>
								<Typography
									sx={{
										fontFamily: 'Playfair Display',
										fontSize: !maxWidth600 ? 15 : 13,
									}}>
									Show Details
								</Typography>
							</button>
						</a>
					</Link>
				</CardActions>
			</Card>
		</AnimationComp>
	);
};

export default CardElement;
