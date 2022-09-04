/** @format */

import { Typography, Divider, Stack } from '@mui/material';
import moment from 'moment';
import { Context } from '../../ContextComp';
import { useContext } from 'react';

const AllComments = ({ result3 }) => {
	const { matches3 } = useContext(Context);
	return (
		<Stack direction='column' spacing={4}>
			{result3.map((item, indx) => {
				const { author, comment, createdAt } = item.node;
				return (
					<Stack key={indx} spacing={2} direction='column'>
						<Stack spacing={2} direction='row' alignItems='center'>
							<Typography
								sx={{
									fontFamily: 'Playfair Display',
									fontSize: !matches3 ? 20 : 17
								}}
								fontWeight='bold'>
								{author}
							</Typography>
							<Typography
								sx={{
									fontFamily: 'Playfair Display',
									fontSize: !matches3 ? 17 : 14,
									color: 'gray',
									fontStyle: 'italic'
								}}>
								{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}
							</Typography>
						</Stack>
						<Typography
							sx={{
								fontFamily: 'Playfair Display',
								fontSize: !matches3 ? 17 : 15
							}}>
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