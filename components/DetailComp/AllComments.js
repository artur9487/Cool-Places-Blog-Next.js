/** @format */

import { Typography, Card, Divider, Stack } from '@mui/material';
import moment from 'moment';

const AllComments = ({ result3 }) => {
	return (
		<Stack direction='column' spacing={4}>
			{result3.map((item, indx) => {
				const { author, comment, createdAt } = item.node;
				return (
					<Stack key={indx} spacing={2} direction='column'>
						<Stack spacing={2} direction='row' alignItems='center'>
							<Typography
								sx={{ fontFamily: 'Playfair Display', fontSize: 20 }}
								fontWeight='bold'>
								{author}
							</Typography>
							<Typography
								sx={{
									fontFamily: 'Playfair Display',
									fontSize: 17,
									color: 'gray',
									fontStyle: 'italic'
								}}>
								{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}
							</Typography>
						</Stack>
						<Typography sx={{ fontFamily: 'Playfair Display', fontSize: 17 }}>
							{comment}
						</Typography>
						<Divider light />
					</Stack>
				);
			})}
		</Stack>
	);
};

export default AllComments;
