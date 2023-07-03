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
					const singleItem: any = item.node;
					return (
						<CardElement
							key={indx}
							length={data.length}
							indx={indx}
							item={singleItem}
						/>
					);
				})}
			</Stack>
		</>
	);
};
export default CardContent;
