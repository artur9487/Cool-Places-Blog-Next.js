/** @format */

import { Card, Typography, Divider } from '@mui/material';

const GoogleDetailComp = ({ coords }) => {
	return (
		<>
			<iframe src={coords} width='100%' height={400} loading='lazy'></iframe>
		</>
	);
};

export default GoogleDetailComp;
