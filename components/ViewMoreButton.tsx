/** @format */

import { Context } from '../ContextComp';
import { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import styles from '/styles/Home.module.scss';

interface viewMoreButtonSchema {
	maxWidth900: string;
}

/*interface contextSchema {
	setNumberToLoad: React.Dispatch<number>;
	data: any;
}*/

const ViewMoreButton: React.FC<viewMoreButtonSchema> = ({ maxWidth900 }) => {
	const { setNumberToLoad, data } = useContext(Context);

	const handler = () => {
		setNumberToLoad(data.length + 2);
	};
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: 100,
				width: maxWidth900 ? 200 : '100%'
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
