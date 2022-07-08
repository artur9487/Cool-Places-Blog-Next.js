/** @format */

import { Context } from '../ContextComp';
import { useContext } from 'react';
import { Box, Typography } from '@mui/material';

import styles from '/styles/Home.module.scss';

const ViewMoreButton = ({ matches }) => {
	const { setLoadMore, data } = useContext(Context);

	const handler = async () => {
		await setLoadMore(data.length + 2);
	};
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: 100,
				width: matches ? 200 : '100%'
			}}>
			<Box>
				<button className={styles.button} onClick={() => handler()}>
					<Typography sx={{ fontFamily: 'Playfair Display' }}>
						View More
					</Typography>
				</button>
			</Box>
		</Box>
	);
};

export default ViewMoreButton;
