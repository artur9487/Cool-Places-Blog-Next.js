/** @format */

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Context } from '../ContextComp';
import { useContext } from 'react';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/system';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CategoriesBar = () => {
	const { result2 } = useContext(Context);
	const router = useRouter();
	const slug = router.asPath.slice(10);

	return (
		<Card
			sx={{
				background:
					'linear-gradient(60deg, rgb(255, 255, 255) , rgb(235, 235, 235) )',
				boxShadow: '7px 7px 10px rgba(191, 191, 191,1)',
				borderRadius: 4,
				width: '100%',
				minHeight: 150,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				flexDirection: 'column',
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
				Categories:
			</Typography>
			<CardContent
				sx={{
					width: '100%',
					display: 'flex',
					alignItems: 'flex-start',
					flexDirection: 'column'
				}}>
				<Box sx={{ width: '100%', mb: 2 }}>
					<Typography
						sx={{
							color: slug === '' ? 'orange' : 'black',
							fontFamily: 'Playfair Display',
							fontStyle: 'italic'
						}}
						gutterBottom
						fontSize={17}
						component='div'>
						<Link href='/'>All categories</Link>
					</Typography>
					<Divider light />
				</Box>
				{result2.map((item, indx) => {
					console.log(item);
					return (
						<Box key={indx} sx={{ width: '100%', mb: 2 }}>
							<Typography
								sx={{
									color: slug === item ? 'orange' : 'black',
									fontFamily: 'Playfair Display',
									fontStyle: 'italic'
								}}
								gutterBottom
								fontSize={17}
								component='div'>
								<Link href={`/category/${item}`}>{item}</Link>
							</Typography>
							<Divider light />
						</Box>
					);
				})}
			</CardContent>
		</Card>
	);
};

export default CategoriesBar;
