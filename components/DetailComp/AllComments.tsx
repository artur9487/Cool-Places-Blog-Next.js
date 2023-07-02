/** @format */

import { Typography, Divider, Stack } from '@mui/material';
import moment from 'moment';
import { Context } from '../../ContextComp';
import { useContext } from 'react';
import { mostCommented_schema } from '../globalComponents/globalTypes';

const AllComments: React.FC<mostCommented_schema> = ({
	mostCommentedOutput,
}) => {
	const { maxWidth600 } = useContext(Context);
	return (
		<Stack direction='column' spacing={4}>
			{mostCommentedOutput.map((item, indx) => {
				const { author, comment, createdAt } = item.node;
				return (
					<Stack key={indx} spacing={2} direction='column'>
						<Stack spacing={2} direction='row' alignItems='center'>
							<Typography
								sx={{
									fontFamily: 'Playfair Display',
									fontSize: !maxWidth600 ? 20 : 17,
								}}
								fontWeight='bold'>
								{author}
							</Typography>
							<Typography
								sx={{
									fontFamily: 'Playfair Display',
									fontSize: !maxWidth600 ? 17 : 14,
									color: 'gray',
									fontStyle: 'italic',
								}}>
								{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}
							</Typography>
						</Stack>
						<Typography
							sx={{
								fontFamily: 'Playfair Display',
								fontSize: !maxWidth600 ? 17 : 15,
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
