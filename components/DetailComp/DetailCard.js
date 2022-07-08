/** @format */
import { Card, Typography, Divider, Box } from '@mui/material';

const DetailCard = ({ children, title }) => {
	return (
		<Card
			sx={{
				p: 4,
				background:
					'linear-gradient(60deg, rgb(255, 255, 255) , rgb(235, 235, 235) )',
				boxShadow: '7px 7px 10px rgba(191, 191, 191,1)',
				borderRadius: 4,
				width: '100%',
				height: '100%'
			}}>
			<Box sx={{ width: '100%', mb: 3 }}>
				<Typography
					sx={{
						fontFamily: 'Playfair Display',
						fontWeight: 1000,
						fontStyle: 'italic'
					}}
					textAlign='center'
					gutterBottom
					variant='h4'
					component='div'>
					{title}
				</Typography>
				<Divider light />
			</Box>
			{children}
		</Card>
	);
};

export default DetailCard;
