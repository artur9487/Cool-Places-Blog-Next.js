/** @format */

import { Stack } from '@mui/material';
import { useContext } from 'react';
import { Context } from '../ContextComp';
import CardElement from './CardElement';

const CardContent: React.FC = () => {
	const { data } = useContext(Context);

	return (
		<>
			<Stack sx={{ width: '100%' }} direction='column' spacing={4}>
				{data.map((item, indx) => {
					return (
						<CardElement
							key={indx}
							length={data.length}
							indx={indx}
							item={item.node}
						/>
					);
				})}
			</Stack>
		</>
	);
};
export default CardContent;
