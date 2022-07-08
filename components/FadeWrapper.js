/** @format */

import { Fade } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useEffect } from 'react';

const FadeWrapper = ({ children }) => {
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		setChecked(true);
	}, []);
	return (
		<Fade in={checked} timeout={4000}>
			<Box>{children}</Box>
		</Fade>
	);
};

export default FadeWrapper;
